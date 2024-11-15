"use client";

import Image from "next/image";
import axios from "axios";
import Cookies from "universal-cookie";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/app/(dashboard)/profile/page";

const Navbar = () => {
  const cookies = new Cookies();

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
  return (
    <div className="flex items-center justify-between p-4">
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">
            {profile.first_name} {profile.last_name}
          </span>
          <span className="text-[10px] text-gray-500 text-right">
            {profile.username}
          </span>
        </div>
        <Image
          src="/avatar.png"
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
