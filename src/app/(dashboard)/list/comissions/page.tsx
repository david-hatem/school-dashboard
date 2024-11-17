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
  const [etudiant, setEtudiant] = useState<Etudiant[]>([]);
  const [groupe, setGroupe] = useState<Groupe[]>([]);
  const [professeur, setProfesseur] = useState<Professeur[]>([]);
  const [filters, setFilters] = useState({
    montant: "",
    statut_comission: "",
    professeur: "",
    etudiant: "",
    groupe: "",
    start_date: "",
    end_date: "",
  });
  const cookies = new Cookies();

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
    const fetchEtudiant = async () => {
      const response = await fetch("http://167.114.0.177:81/etudiant_list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEtudiant(data);
    };
    const fetchProfesseur = async () => {
      const response = await fetch("http://167.114.0.177:81/professeur_list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProfesseur(data);
    };
    fetchGroupe();
    fetchEtudiant();
    fetchProfesseur();
  }, []);

  useEffect(() => {
    let token = cookies.get("authToken");
    if (!token) {
      redirect("/sign-in");
    }
    console.log("token", token);
  }, []);
  const [comissions, setComissions] = useState<Comission[]>([]);
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  useEffect(() => {
    const query = new URLSearchParams(filters).toString();

    const fetchComission = async () => {
      const response = await fetch(
        `http://167.114.0.177:81/commissions/?${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setComissions(data?.results);
    };

    fetchComission();
  }, [filters]);
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
      <div className="flex gap-3 my-4">
        {/* <label className="text-xs text-gray-500">Montant</label> */}
        <input
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
          type="number"
          name="montant"
          placeholder="Montant"
          value={filters.montant}
          onChange={handleChange}
        />
        <input
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
          type="text"
          name="statut_comission"
          placeholder="Statut Comission"
          value={filters.statut_comission}
          onChange={handleChange}
        />
        <input
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
          type="date"
          name="start_date"
          value={filters.start_date}
          onChange={handleChange}
        />
        <input
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
          type="date"
          name="end_date"
          value={filters.end_date}
          onChange={handleChange}
        />
        <select
          name="groupe"
          value={filters.groupe}
          onChange={handleChange}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        >
          <option value="" disabled="disabled">
            Select Groupe
          </option>
          {groupe.map((g) => {
            return <option value={g?.id}>{g?.nom_groupe}</option>;
          })}
        </select>
        <select
          name="etudiant"
          value={filters.etudiant}
          onChange={handleChange}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        >
          <option value="" disabled="disabled">
            Select Etudiant
          </option>
          {etudiant.map((e) => {
            return (
              <option value={e?.id}>
                {e?.prenom} {e?.nom}
              </option>
            );
          })}
        </select>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          name="professeur"
          value={filters.professeur}
          onChange={handleChange}
        >
          <option value="" disabled="disabled">
            Select Professeur
          </option>
          {professeur.map((p) => {
            return (
              <option value={p?.id}>
                {p?.prenom} {p?.nom}
              </option>
            );
          })}
        </select>
      </div>
      <Table columns={columns} renderRow={renderRow} data={comissions} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default AssignmentListPage;
