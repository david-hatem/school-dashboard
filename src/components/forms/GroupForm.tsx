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

const schema = z.object({
  nom_groupe: z.string().min(1, { message: "Nom Group is required!" }),
  max_etudiants: z.string().min(1, { message: "Max Etudiants is required!" }),
  professeur: z.string().min(1, { message: "Professeur is required!" }),
  niveau: z.string().min(1, { message: "Niveau is required!" }),
  filiere: z.string().min(1, { message: "Filiere is required!" }),
  matiere: z.string().min(1, { message: "Matiere is required!" }),
  // start_time: z.date({ message: "Start Time is required!" }),
  // end_time: z.date({ message: "End Time is required!" }),
  // start_time: z.preprocess(
  //   (arg) => (typeof arg === "string" ? new Date(arg) : arg),
  //   z.date()
  // ),
  // end_time: z.preprocess(
  //   (arg) => (typeof arg === "string" ? new Date(arg) : arg),
  //   z.date().optional()
  // ),
  // group: z.string().min(1, { message: "Group is required!" }),
  // professeur: z.string().min(1, { message: "Professeur is required!" }),
});

type Inputs = z.infer<typeof schema>;

const GroupForm = ({
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

  const onSubmit = handleSubmit(async (data) => {
    const response = await axios.post(
      "http://167.114.0.177:81/groupes/create/",
      {
        nom_groupe: data?.nom_groupe,
        max_etudiants: data?.max_etudiants,
        professeur: data?.professeur,
        niveau: data?.niveau,
        filiere: data?.filiere,
        matiere: data?.matiere,
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

  const [niveau, setNiveau] = useState<Niveau[]>([]);
  const [filiere, setFiliere] = useState<Filiere[]>([]);
  const [matiere, setMatiere] = useState<Matiere[]>([]);
  const [professeur, setProfesseur] = useState<Professeur[]>([]);

  useEffect(() => {
    const fetchNiveau = async () => {
      const response = await fetch("http://167.114.0.177:81/niveau_list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setNiveau(data);
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
    const fetchFiliere = async () => {
      const response = await fetch("http://167.114.0.177:81/filiere_list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFiliere(data);
    };
    fetchNiveau();
    fetchProfesseur();
    fetchMatiere();
    fetchFiliere();
  }, []);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new group" : "Update group"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nom Groupe"
          name="nom_groupe"
          defaultValue={data?.nom_groupe}
          register={register}
          error={errors.nom_groupe}
        />
        <InputField
          label="Max Etudiants"
          name="max_etudiants"
          defaultValue={data?.max_etudiants}
          register={register}
          error={errors.max_etudiants}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Niveau</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("niveau")}
            defaultValue={data?.niveau}
          >
            {niveau.map((n) => {
              return <option value={n?.id}>{n?.nom_niveau}</option>;
            })}
          </select>
          {errors.niveau?.message && (
            <p className="text-xs text-red-400">
              {errors.niveau.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Professeur</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("professeur")}
            defaultValue={data?.professeur}
          >
            {professeur.map((p) => {
              return (
                <option value={p?.id}>
                  {p?.prenom} {p?.nom}
                </option>
              );
            })}
          </select>
          {errors.professeur?.message && (
            <p className="text-xs text-red-400">
              {errors.professeur.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Filiere</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("filiere")}
            defaultValue={data?.filiere}
          >
            {filiere.map((f) => {
              return <option value={f?.id}>{f?.nom_filiere}</option>;
            })}
          </select>
          {errors.filiere?.message && (
            <p className="text-xs text-red-400">
              {errors.filiere.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
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
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default GroupForm;
