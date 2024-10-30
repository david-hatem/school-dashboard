"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import axios from "axios";
import { Groupe } from "@/app/(dashboard)/list/groupe/page";
import { group } from "console";

const schema = z.object({
  nom_niveau: z.string().min(1, { message: "Nom Filiere is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
});

type Inputs = z.infer<typeof schema>;

const NiveauxForm = ({
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
      "http://167.114.0.177:81/niveaux/create/",
      {
        nom_niveau: data?.nom_niveau,
        description: data?.description,
      },
      {
        headers: {
          "Content-Type": "application/json", // Define content type as JSON
        },
      }
    );
    // );
    console.log(response);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new niveaux" : "Update niveaux"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nom Niveau"
          name="nom_niveau"
          defaultValue={data?.nom_niveau}
          register={register}
          error={errors.nom_niveau}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default NiveauxForm;
