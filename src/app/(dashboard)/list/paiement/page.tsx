"use client";

import { useEffect, useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { examsData, role } from "@/lib/data";
import Image from "next/image";

type Exam = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
};

interface Paiement {
  id: number;
  montant: number;
  date_paiement: string;
  statut_paiement: string;
  commission_percentage: number;
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
    header: "Date de Paiement",
    dataIndex: "date_paiement",
    key: "date_paiement",
  },
  {
    header: "Statut de Paiement",
    dataIndex: "statut_paiement",
    key: "statut_paiement",
  },
  {
    header: "Commission Percentage",
    dataIndex: "commission_percentage",
    key: "commission_percentage",
    render: (commission_percentage: number) => `${commission_percentage}%`,
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
];

const ExamListPage = () => {
  const [paiement, setPaiement] = useState<Paiement[]>([]);

  useEffect(() => {
    const fetchPaiement = async () => {
      const response = await fetch("http://167.114.0.177:81/paiements", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPaiement(data?.results);
    };

    fetchPaiement();
  }, []);
  const renderRow = (item: Paiement) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.id}</td>
      <td className="hidden md:table-cell py-5">{item.montant}</td>
      <td className="hidden md:table-cell">{item.date_paiement}</td>
      <td className="hidden md:table-cell">{item.statut_paiement}</td>
      <td className="hidden md:table-cell">{item.commission_percentage}</td>
      <td className="hidden md:table-cell">
        {item.etudiant.prenom} {item.etudiant.nom}
      </td>
      <td className="hidden md:table-cell">{item.groupe.nom_groupe}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" ||
            (role === "teacher" && (
              <>
                <FormModal table="exam" type="update" data={item} />
                <FormModal table="exam" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Paiement</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="payment" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={paiement} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ExamListPage;
