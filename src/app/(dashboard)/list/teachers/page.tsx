"use client";

import { useEffect, useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

interface Professeur {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  date_naissance: string;
  sexe: string;
  nationalite: string;
  specialite: string;
}

const columns = [
  {
    header: "Nom",
    dataIndex: "nom",
    key: "nom",
  },
  {
    header: "Prénom",
    dataIndex: "prenom",
    key: "prenom",
  },
  {
    header: "Téléphone",
    dataIndex: "telephone",
    key: "telephone",
  },
  {
    header: "Adresse",
    dataIndex: "adresse",
    key: "adresse",
  },
  {
    header: "Date de Naissance",
    dataIndex: "date_naissance",
    key: "date_naissance",
  },
  {
    header: "Sexe",
    dataIndex: "sexe",
    key: "sexe",
  },
  {
    header: "Nationalité",
    dataIndex: "nationalite",
    key: "nationalite",
  },
  {
    header: "Spécialité",
    dataIndex: "specialite",
    key: "specialite",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

// const columns = [
//   {
//     header: "Info",
//     accessor: "info",
//   },
//   {
//     header: "Teacher ID",
//     accessor: "teacherId",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Subjects",
//     accessor: "subjects",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Classes",
//     accessor: "classes",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Phone",
//     accessor: "phone",
//     className: "hidden lg:table-cell",
//   },
//   {
//     header: "Address",
//     accessor: "address",
//     className: "hidden lg:table-cell",
//   },
//   {
//     header: "Actions",
//     accessor: "action",
//   },
// ];

const TeacherListPage = () => {
  const [teachers, setTeachers] = useState<Professeur[]>([]);

  useEffect(() => {
    const fetchEtudiants = async () => {
      const response = await fetch("http://167.114.0.177:81/professeur_list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTeachers(data);
    };

    fetchEtudiants();
  }, []);

  const renderRow = (item: Professeur) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td> */}
      <td className="hidden md:table-cell py-5">{item.prenom}</td>
      <td className="hidden md:table-cell">{item.nom}</td>
      <td className="hidden md:table-cell">{item.telephone}</td>
      <td className="hidden md:table-cell">{item.adresse}</td>
      <td className="hidden md:table-cell">{item.date_naissance}</td>
      <td className="hidden md:table-cell">{item.sexe}</td>
      <td className="hidden md:table-cell">{item.nationalite}</td>
      <td className="hidden md:table-cell">{item.specialite}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button
              onClick={async () => {
                await axios.delete(
                  `http://167.114.0.177:81/professeurs/delete/${item?.id}/`,
                  {
                    headers: {
                      "Content-Type": "application/json", // Define content type as JSON
                    },
                  }
                );
              }}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"
            >
              <Image src="/delete.png" alt="" width={16} height={16} />
            </button>
            // <FormModal table="teacher" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Professeur
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="teacher" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={teachers} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default TeacherListPage;
