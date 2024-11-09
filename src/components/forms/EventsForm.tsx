"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import axios from "axios";
import { Groupe, Professeur } from "@/app/(dashboard)/list/groupe/page";
import { group } from "console";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  // start_time: z.date({ message: "Start Time is required!" }),
  // end_time: z.date({ message: "End Time is required!" }),
  start_time: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  end_time: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date().optional()
  ),
  group: z.string().min(1, { message: "Group is required!" }),
  professeur: z.string().min(1, { message: "Professeur is required!" }),
});

type Inputs = z.infer<typeof schema>;

const EventsForm = ({
  type,
  data,
  id,
}: {
  type: "create" | "update";
  data?: any;
  id?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (type === "create") {
      const response = await axios.post(
        "http://167.114.0.177:81/events/create/",
        {
          title: data?.title,
          description: data?.description,
          start_time: data?.start_time,
          end_time: data?.end_time,
          groupe: data?.group,
          professeur: data?.professeur,
        },
        {
          headers: {
            "Content-Type": "application/json", // Define content type as JSON
          },
        }
      );
    } else if (type == "update") {
      const response = await axios.put(
        `http://167.114.0.177:81/events/update/${id}`,
        {
          title: data?.title,
          description: data?.description,
          start_time: data?.start_time,
          end_time: data?.end_time,
          groupe: data?.group,
          professeur: data?.professeur,
        },
        {
          headers: {
            "Content-Type": "application/json", // Define content type as JSON
          },
        }
      );
    }
    // );
    console.log(data);
  });

  const [groupe, setGroupe] = useState<Groupe[]>([]);
  const [professeur, setProfesseur] = useState<Professeur[]>([]);

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
    fetchProfesseur();
  }, []);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new event" : "Update event"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors.title}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
        <InputField
          label="Start Time"
          name="start_time"
          defaultValue={data?.start_time}
          register={register}
          error={errors.start_time}
          type="datetime-local"
        />
        <InputField
          label="End Time"
          name="end_time"
          defaultValue={data?.end_time}
          register={register}
          error={errors.end_time}
          type="datetime-local"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Group</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("group")}
            defaultValue={data?.group}
          >
            {groupe.map((g) => {
              return <option value={g?.id}>{g?.nom_groupe}</option>;
            })}
          </select>
          {errors.group?.message && (
            <p className="text-xs text-red-400">
              {errors.group.message.toString()}
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
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default EventsForm;
