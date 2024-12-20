"use client";

import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import { redirect } from "next/navigation";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Matiere",
        href: "/list/matiere",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Filiere",
        href: "/list/filiere",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Niveau",
        href: "/list/niveau",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Groupe",
        href: "/list/groupe",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Paiement",
        href: "/list/paiement",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "comissions",
        href: "/list/comissions",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const cookies = new Cookies();

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  onClick={() => {
                    if (item.href === "/logout") {
                      cookies.set("authToken", null);
                      redirect("/sign-in");
                    }
                  }}
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
