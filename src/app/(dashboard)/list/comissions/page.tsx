"use client";

import { useEffect, useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { assignmentsData, role } from "@/lib/data";
import Image from "next/image";
import Cookies from "universal-cookie";
import { redirect } from "next/navigation";

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

interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  date_naissance: string;
  telephone: string;
  adresse: string;
  sexe: string;
  nationalite: string;
  contact_urgence: string;
}

interface Groupe {
  id: number;
  nom_groupe: string;
  professeur: number;
  niveau: number;
  max_etudiants: number;
  filiere: number;
  matiere: number;
}

interface Comission {
  id: number;
  montant: number;
  date_comission: string;
  statut_comission: string;
  professeur: Professeur;
  etudiant: Etudiant;
  groupe: Groupe;
}

const columns = [
  {
    header: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    header: "Montant",
    dataIndex: "montant",
    key: "montant",
    render: (montant: number) => `${montant} MAD`,
  },
  {
    header: "Date de Comission",
    dataIndex: "date_comission",
    key: "date_comission",
  },
  {
    header: "Statut de Comission",
    dataIndex: "statut_comission",
    key: "statut_comission",
  },
  {
    header: "Etudiant",
    dataIndex: "etudiant",
    key: "etudiant",
  },
  {
    header: "Groupe",
    dataIndex: "groupe",
    key: "groupe",
  },
  {
    header: "Professeur",
    dataIndex: "professeur",
    key: "professeur",
  },
  // {
  //   header: "Professeur",
  //   dataIndex: ["professeur", "nom"],
  //   key: "professeur",
  //   render: (_, record) =>
  //     `${record.professeur.prenom} ${record.professeur.nom}`,
  // },
  // {
  //   header: "Etudiant",
  //   dataIndex: ["etudiant", "nom"],
  //   key: "etudiant",
  //   render: (_, record) => `${record.etudiant.prenom} ${record.etudiant.nom}`,
  // },
  // {
  //   header: "Groupe",
  //   dataIndex: ["groupe", "nom_groupe"],
  //   key: "groupe",
  // },
];

const AssignmentListPage = () => {
  const cookies = new Cookies();

  useEffect(() => {
    let token = cookies.get("authToken");
    if (!token) {
      redirect("/sign-in");
    }
    console.log("token", token);
  }, []);
  const [comissions, setComissions] = useState<Comission[]>([]);

  useEffect(() => {
    const fetchComission = async () => {
      const response = await fetch("http://167.114.0.177:81/commissions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setComissions(data?.results);
    };

    fetchComission();
  }, []);
  const renderRow = (item: Comission) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.id}</td>
      <td className="hidden md:table-cell py-5">{item.montant}</td>
      <td className="hidden md:table-cell">{item.date_comission}</td>
      <td className="hidden md:table-cell">{item.statut_comission}</td>
      <td className="hidden md:table-cell">
        {item.etudiant.prenom} {item.etudiant.nom}
      </td>
      <td className="hidden md:table-cell">{item.groupe.nom_groupe}</td>
      <td className="hidden md:table-cell">
        {item.professeur.prenom} {item.professeur.nom}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" ||
            (role === "teacher" && (
              <>
                <FormModal table="assignment" type="update" data={item} />
                <FormModal table="assignment" type="delete" id={item.id} />
              </>
            ))}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Commissions
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
            {role === "admin" ||
              (role === "teacher" && (
                <FormModal table="assignment" type="create" />
              ))}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={comissions} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default AssignmentListPage;
