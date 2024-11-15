"use client";

import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/InputField";
import axios from "axios";
import Cookies from "universal-cookie";
import { redirect } from "next/navigation";

const schema = z.object({
  old_password: z.string().min(1, { message: "Old password is required!" }),
  new_password: z.string().min(1, { message: "New password is required!" }),
});

type Inputs = z.infer<typeof schema>;

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

const Profile = () => {
  const cookies = new Cookies();

  useEffect(() => {
    let token = cookies.get("authToken");
    if (!token) {
      redirect("/sign-in");
    }
    console.log("token", token);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [profile, setProfile] = useState<User>({});
  useEffect(() => {
    let accessToken;
    accessToken = cookies.get("authToken");
    const fetchProfile = async () => {
      const response = await fetch(`http://167.114.0.177:81/staff/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProfile(data);
    };

    fetchProfile();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const response = await axios.put(
      "http://167.114.0.177:81/staff/change-password/",
      {
        old_password: data?.old_password,
        new_password: data?.new_password,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.get("authToken")}`,
          "Content-Type": "application/json", // Define content type as JSON
        },
      }
    );
    console.log(data);
  });

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {profile?.first_name} {profile?.last_name}
                </h1>
                {/* {role === "admin" && (
                  <FormModal
                    table="teacher"
                    type="update"
                    data={teacher}
                    id={params.id}
                    // {{
                    //   id: 1,
                    //   username: "deanguerrero",
                    //   email: "deanguerrero@gmail.com",
                    //   password: "password",
                    //   firstName: "Dean",
                    //   lastName: "Guerrero",
                    //   phone: "+1 234 567 89",
                    //   address: "1234 Main St, Anytown, USA",
                    //   bloodType: "A+",
                    //   dateOfBirth: "2000-01-01",
                    //   sex: "male",
                    //   img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                    // }}
                  />
                )} */}
              </div>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{profile?.username}</span>
                </div>

                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{profile?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">Change Password</h1>
            <div className="flex flex-col flex-wrap gap-4">
              <InputField
                label="Old Password"
                name="old_password"
                // defaultValue={old_password}
                register={register}
                error={errors.old_password}
                type="password"
              />
              <InputField
                label="New Password"
                name="new_password"
                // defaultValue={new_password}
                register={register}
                error={errors.new_password}
                type="password"
              />
              <button className="bg-blue-400 text-white p-2 rounded-md">
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
