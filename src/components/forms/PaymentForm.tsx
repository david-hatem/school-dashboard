"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import axios from "axios";
import {
  Filiere,
  Groupe,
  Matiere,
  Professeur,
} from "@/app/(dashboard)/list/groupe/page";
import { group } from "console";
import { Niveau } from "@/app/(dashboard)/list/niveau/page";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { Theme, useTheme } from "@mui/material/styles";
import { Etudiant } from "@/app/(dashboard)/list/students/page";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const schema = z.object({
  montant: z.string().min(1, { message: "Montant is required!" }),
  statut_paiement: z
    .string()
    .min(1, { message: "Statut Paiement is required!" }),
  commission_percentage: z
    .string()
    .min(1, { message: "Commission Percentage is required!" }),
  groupe_id: z.string().min(1, { message: "Groupe is required!" }),
  etudiant_id: z.string().min(1, { message: "Etudiant is required!" }),
});

type Inputs = z.infer<typeof schema>;

const PaymentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const theme = useTheme();
  const [selectedMatieres, setSelectedMatieres] = useState<{ id: number }[]>(
    []
  );

  const onSubmit = handleSubmit(async (data) => {
    const response = await axios.post(
      "http://167.114.0.177:81/paiements/create/",
      {
        montant: data?.montant,
        statut_paiement: data?.statut_paiement,
        commission_percentage: data?.commission_percentage,
        groupe_id: data?.groupe_id,
        etudiant_id: data?.etudiant_id,
      },
      {
        headers: {
          "Content-Type": "application/json", // Define content type as JSON
        },
      }
    );
    // );
    console.log(data);
  });

  const [etudiant, setEtudiant] = useState<Etudiant[]>([]);
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
    fetchGroupe();
    fetchEtudiant();
  }, []);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new payment" : "Update payment"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Montant"
          name="montant"
          defaultValue={data?.montant}
          register={register}
          error={errors.montant}
        />
        <InputField
          label="Statut Paiement"
          name="statut_paiement"
          defaultValue={data?.statut_paiement}
          register={register}
          error={errors.statut_paiement}
        />
        <InputField
          label="Commission Percentage"
          name="commission_percentage"
          defaultValue={data?.commission_percentage}
          register={register}
          error={errors.commission_percentage}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Groupe</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("groupe_id")}
            defaultValue={data?.groupe_id}
          >
            {groupe.map((g) => {
              return <option value={g?.id}>{g?.nom_groupe}</option>;
            })}
          </select>
          {errors.groupe_id?.message && (
            <p className="text-xs text-red-400">
              {errors.groupe_id.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Etudiant</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("etudiant_id")}
            defaultValue={data?.professeur}
          >
            {etudiant.map((p) => {
              return (
                <option value={p?.id}>
                  {p?.prenom} {p?.nom}
                </option>
              );
            })}
          </select>
          {errors.etudiant_id?.message && (
            <p className="text-xs text-red-400">
              {errors.etudiant_id.message.toString()}
            </p>
          )}
        </div>

        {/* <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Matiere</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("matiere")}
            defaultValue={data?.matiere}
          >
            {matiere.map((m) => {
              return <option value={m?.id}>{m?.nom_matiere}</option>;
            })}
          </select>
          {errors.matiere?.message && (
            <p className="text-xs text-red-400">
              {errors.matiere.message.toString()}
            </p>
          )}
        </div> */}
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default PaymentForm;
