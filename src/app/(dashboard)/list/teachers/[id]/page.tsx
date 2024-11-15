"use client";

import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDateToMonthYear } from "./../../../../../lib/utils";
import Cookies from "universal-cookie";
import { redirect } from "next/navigation";
import EventCalendar from "@/components/EventCalendar";

export interface Matiere {
  id: number;
  nom_matiere: string;
}

export interface Niveau {
  id: number;
  nom_niveau: string;
}

export interface Filiere {
  id: number;
  nom_filiere: string;
}

export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
}

export interface Groupe {
  id: number;
  nom_groupe: string;
  commission_fixe: number;
  filiere: Filiere;
  niveau: Niveau;
  max_etudiants: number;
  matieres: Matiere[];
  etudiants: Etudiant[];
  total_etudiants: number;
}

export interface Commission {
  id: number;
  montant: number;
  date_comission: string; // ISO date string
  statut_comission: string;
  etudiant: Etudiant;
  groupe: {
    id: number;
    nom_groupe: string;
  };
}

export interface Professor {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  date_naissance: string; // ISO date string
  sexe: string;
  nationalite: string;
  specialite: string;
  created_at: string; // ISO date string
  groupes: Groupe[];
  commissions: Commission[];
  total_commissions: number;
  total_groupes: number;
}

const SingleTeacherPage = ({ params }) => {
  const cookies = new Cookies();

  useEffect(() => {
    let token;
    token = cookies.get("authToken");
    if (!token) {
      redirect("/sign-in");
    }
    console.log("token", token);
  }, []);
  useEffect(() => {
    console.log("params.id : ", params.id);
  }, []);

  const [teacher, setTeacher] = useState<Professor>({});

  useEffect(() => {
    const fetchTeacher = async () => {
      const response = await fetch(
        `http://167.114.0.177:81/professeurs/${params.id}/details/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setTeacher(data);
    };

    fetchTeacher();
  }, []);

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="/avatar.png"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {teacher?.prenom} {teacher?.nom}
                </h1>
                {role === "admin" && (
                  <FormModal
                    table="teacher"
                    type="update"
                    data={teacher}
                    id={params.id}
                  />
                )}
              </div>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{teacher?.nationalite}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{formatDateToMonthYear(teacher?.date_naissance)}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{teacher?.adresse}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{teacher?.telephone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher?.total_commissions}
                </h1>
                <span className="text-sm text-gray-400">Total Commissions</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher?.total_groupes}
                </h1>
                <span className="text-sm text-gray-400">Groupes</span>
              </div>
            </div>
            {/* CARD */}
            {/* <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div> */}
            {/* CARD */}
            {/* <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div> */}
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <EventCalendar id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default SingleTeacherPage;
