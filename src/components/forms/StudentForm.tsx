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
  // username: z
  //   .string()
  //   .min(3, { message: "Username must be at least 3 characters long!" })
  //   .max(20, { message: "Username must be at most 20 characters long!" }),
  // email: z.string().email({ message: "Invalid email address!" }),
  // password: z
  //   .string()
  //   .min(8, { message: "Password must be at least 8 characters long!" }),

  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  contact_urgence: z
    .string()
    .min(1, { message: "Contact Urgence is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  nationalite: z.string().min(1, { message: "Nationalite is required!" }),
  sex: z.enum(["M", "F"], { message: "Sex is required!" }),
  group: z.string().min(1, { message: "Group is required!" }),
  // bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  // birthday: z.date({ message: "Birthday is required!" }),
  // img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
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
      "http://167.114.0.177:81/etudiants/create/",
      {
        prenom: data?.firstName,
        nom: data?.lastName,
        date_naissance: "2003-01-01",
        telephone: data?.phone,
        adresse: data?.address,
        sexe: data?.sex,
        nationalite: data?.nationalite,
        contact_urgence: data?.contact_urgence,
        groupe_id: data?.group,
      },
      {
        headers: {
          "Content-Type": "application/json", // Define content type as JSON
        },
      }
    );
    // const response = await fetch(
    //   "http://167.114.0.177:81/list_create_etudiant",
    //   {
    //     method: "POST", // Specify POST request
    //     headers: {
    //       "Content-Type": "application/json", // Define content type
    //     },
    //     body: JSON.stringify({
    //       nom: data?.firstName,
    //       prenom: data?.lastName,
    //       // date_naissance: "2003-01-01",
    //       telephone: data?.phone,
    //       adresse: data?.address,
    //       sexe: data?.sex,
    //       nationalite: data?.nationalite,
    //       contact_urgence: data?.contact_urgence,
    //       // groupe_id: 1,
    //     }),
    //   }
    // );
    console.log(response);
  });

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

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new student" : "Update student"}</h1>
      {/* <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div> */}
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Contact Urgence"
          name="contact_urgence"
          defaultValue={data?.contact_urgence}
          register={register}
          error={errors.contact_urgence}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Nationalite"
          name="nationalite"
          defaultValue={data?.nationalite}
          register={register}
          error={errors.nationalite}
        />
        {/* <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        /> */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
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
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
