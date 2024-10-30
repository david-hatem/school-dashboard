"use client";

import { useEffect, useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// type Student = {
//   id: number;
//   studentId: string;
//   name: string;
//   email?: string;
//   photo: string;
//   phone?: string;
//   grade: number;
//   class: string;
//   address: string;
// };

interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  date_naissance: string;
  telephone: string | null;
  adresse: string | null;
  sexe: string | null;
  nationalite: string;
  contact_urgence: string | null;
}

// const columns = [
//   {
//     header: "Info",
//     accessor: "info",
//   },
//   {
//     header: "Student ID",
//     accessor: "studentId",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Grade",
//     accessor: "grade",
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

const columns = [
  {
    header: "Prénom",
    accessor: "prenom",
  },
  {
    header: "Nom",
    accessor: "nom",
  },
  {
    header: "Date de Naissance",
    accessor: "date_naissance",
  },
  {
    header: "Téléphone",
    accessor: "telephone",
  },
  {
    header: "Adresse",
    accessor: "adresse",
  },
  {
    header: "Sexe",
    accessor: "sexe",
  },
  {
    header: "Nationalité",
    accessor: "nationalite",
  },
  {
    header: "Contact Urgence",
    accessor: "contact_urgence",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const StudentListPage = () => {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);

  useEffect(() => {
    const fetchEtudiants = async () => {
      const response = await fetch("http://167.114.0.177:81/etudiant_list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEtudiants(data);
    };

    fetchEtudiants();
  }, []);
  const renderRow = (item: Etudiant) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* <td className="flex items-center gap-4 p-4">
        <Image
          src={""}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.prenom}</h3>
          <p className="text-xs text-gray-500">{item.nom}</p>
        </div>
      </td> */}
      <td className="hidden md:table-cell py-5">{item.prenom}</td>
      <td className="hidden md:table-cell py-5">{item.nom}</td>
      <td className="hidden md:table-cell py-5">{item.date_naissance}</td>
      <td className="hidden md:table-cell">{item.telephone}</td>
      <td className="hidden md:table-cell">{item.adresse}</td>
      <td className="hidden md:table-cell">{item.sexe}</td>
      <td className="hidden md:table-cell">{item.nationalite}</td>
      <td className="hidden md:table-cell">{item.contact_urgence}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            // <FormModal table="student" type="delete" id={item.id} />
            <button
              onClick={async () => {
                await axios.delete(
                  `http://167.114.0.177:81/etudiants/delete/${item?.id}/`,
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
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Etudiants</h1>
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
              <FormModal table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={etudiants} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;
