"use client";

import { useEffect, useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { lessonsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export interface Professeur {
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

export interface Niveau {
  id: number;
  nom_niveau: string;
  description: string;
  created_at: string;
}

export interface Filiere {
  id: number;
  nom_filiere: string;
  description: string;
  created_at: string;
}

export interface Matiere {
  id: number;
  nom_matiere: string;
  description: string;
  created_at: string;
}

export interface Groupe {
  id: number;
  nom_groupe: string;
  professeur: Professeur;
  commission_fixe: number;
  niveau: Niveau;
  max_etudiants: number;
  filiere: Filiere;
  matiere: Matiere;
}

interface GroupesPageProps {
  groupes: Groupe[];
}

// Define table columns
const columns = [
  {
    header: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    header: "Nom Groupe",
    dataIndex: "nom_groupe",
    key: "nom_groupe",
  },
  // {
  //   header: "Professeur",
  //   dataIndex: ["professeur", "nom"],
  //   key: "professeur",
  //   render: (_, record) =>
  //     `${record.professeur.prenom} ${record.professeur.nom}`,
  // },
  {
    header: "Commission Fixe",
    dataIndex: "commission_fixe",
    key: "commission_fixe",
    render: (commission_fixe: number) => `${commission_fixe} MAD`,
  },
  // {
  //   header: "Niveau",
  //   dataIndex: ["niveau", "nom_niveau"],
  //   key: "niveau",
  // },
  // {
  //   header: "Filiere",
  //   dataIndex: ["filiere", "nom_filiere"],
  //   key: "filiere",
  // },
  // {
  //   header: "Matière",
  //   dataIndex: ["matiere", "nom_matiere"],
  //   key: "matiere",
  // },
  {
    header: "Max Étudiants",
    dataIndex: "max_etudiants",
    key: "max_etudiants",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

// type Lesson = {
//   id: number;
//   subject: string;
//   class: string;
//   teacher: string;
// };

// const columns = [
//   {
//     header: "Subject Name",
//     accessor: "name",
//   },
//   {
//     header: "Class",
//     accessor: "class",
//   },
//   {
//     header: "Teacher",
//     accessor: "teacher",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Actions",
//     accessor: "action",
//   },
// ];

const GroupeListPage = () => {
  const [groupe, setGroupe] = useState<Groupe[]>([]);

  useEffect(() => {
    const fetchGroupe = async () => {
      const response = await fetch("http://167.114.0.177:81/groupe_list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setGroupe(data);
    };

    fetchGroupe();
  }, []);
  const renderRow = (item: Groupe) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="hidden md:table-cell py-5">{item.id}</td>
      <td className="hidden md:table-cell py-5">{item.nom_groupe}</td>
      <td className="hidden md:table-cell py-5">{item.commission_fixe}</td>
      <td className="hidden md:table-cell">{item.max_etudiants}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormModal table="teacher" type="delete" id={item.id} />
          )}
        </div>
      </td>
      {/* <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="lesson" type="update" data={item} />
              <FormModal table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td> */}
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Groupe</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="group" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={groupe} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default GroupeListPage;
