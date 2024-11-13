"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const Logout = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight flex-col">
      <div>You are logged out.</div>
      <div className="flex gap-4">
        <Link
          href={"/sign-in"}
          className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
        >
          Sign in
        </Link>
        <Link
          href={"/register"}
          className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Logout;
