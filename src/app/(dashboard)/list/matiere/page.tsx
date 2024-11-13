"use client";

import { useEffect, useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { parentsData, role } from "@/lib/data";
import Image from "next/image";
import axios from "axios";
import Cookies from "universal-cookie";
import { redirect } from "next/navigation";

export interface Matiere {
  id: number;
  nom_matiere: string;
  description: string;
  created_at: string;
}

const columns = [
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Nom_matiere",
    accessor: "nom_matiere",
    className: "hidden md:table-cell",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden lg:table-cell",
  },
  {
    header: "Created At",
    accessor: "created_at",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const MatiereListPage = () => {
  const cookies = new Cookies();

  // let token = cookies.get("authToken");
  useEffect(() => {
    if (!cookies.get("authToken")) {
      redirect("/sign-in");
    }
    console.log(cookies.get("authToken"));
  }, []);
  useEffect(() => {
    console.log("params.id : ", params.id);
  }, []);
  const [matiere, setMatiere] = useState<Matiere[]>([]);

  useEffect(() => {
    const fetchMatiere = async () => {
      const response = await fetch("http://167.114.0.177:81/matiere_list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMatiere(data);
    };

    fetchMatiere();
  }, []);

  const renderRow = (item: Matiere) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="hidden md:table-cell py-5">{item.id}</td>
      <td className="hidden md:table-cell">{item.nom_matiere}</td>
      <td className="hidden md:table-cell">{item.description}</td>
      <td className="hidden md:table-cell">{item.created_at}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="parent" type="update" data={item} />
              {/* <FormModal table="parent" type="delete" id={item.id} /> */}
              <button
                onClick={async () => {
                  await axios.delete(
                    `http://167.114.0.177:81/matieres/delete/${item?.id}/`,
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
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Matiere</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="matiere" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={matiere} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default MatiereListPage;
