"use client";
import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { redirect } from "next/navigation";

export interface StudentMetrics {
  total_students: number;
  total_male_students: number;
  total_female_students: number;
  students_by_nationality: { nationalite: string; count: number }[];
  new_students_this_month: number;
}

export interface TeacherMetrics {
  total_teachers: number;
  teachers_by_gender: { male: number; female: number };
  teachers_by_nationality: { nationalite: string; count: number }[];
  teachers_by_specialite: { specialite: string; count: number }[];
}

export interface GroupMetrics {
  total_groups: number;
  students_per_group: { groupe: number; count: number }[];
}

export interface PaymentMetrics {
  total_payments: number;
  total_amount: number;
  payments_this_month: { count: number; amount: number };
  payment_status: { statut_paiement: string; count: number }[];
}

export interface CommissionMetrics {
  total_commissions: number;
  total_commission_amount: number;
  commissions_this_month: { count: number; amount: number };
  commission_status: { statut_comission: string; count: number }[];
}

export interface MetricsResponse {
  student_metrics: StudentMetrics;
  teacher_metrics: TeacherMetrics;
  group_metrics: GroupMetrics;
  payment_metrics: PaymentMetrics;
  commission_metrics: CommissionMetrics;
  last_updated: string;
}

export async function fetchMetrics(): Promise<MetricsResponse> {
  try {
    const response = await axios.get<MetricsResponse>(
      "http://167.114.0.177:81/dashboard/metrics/",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching metrics:", error);
    throw error;
  }
}

const AdminPage = () => {
  const cookies = new Cookies(null, { path: '/' });

  let token = cookies.get("authToken");
  useEffect(() => {
    if (!token) {
      redirect("/sign-in");
    }
    console.log("token", token);
  }, []);
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      const data = await fetchMetrics();
      setMetrics(data);
    };

    loadMetrics();
  }, []);
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" metrics={metrics} />
          <UserCard type="teacher" metrics={metrics} />
          <UserCard type="group" metrics={metrics} />
          <UserCard type="payment" metrics={metrics} />
          <UserCard type="commission" metrics={metrics} />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart metrics={metrics} />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        {/* <Announcements /> */}
      </div>
    </div>
  );
};

export default AdminPage;
