"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  // const { isLoaded, isSignedIn, user } = useUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCon, setPasswordCon] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const role = user?.publicMetadata.role;

  //   if (role) {
  //     router.push(`/${role}`);
  //   }
  // }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://167.114.0.177:81/staff/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password :password,
          password2: passwordCon,
          email: email,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register.");
      }

      const data = await response.json();
      const token = data["access"];

      // Save token to local storage (or handle as needed)
      localStorage.setItem("authToken", token);

      // Redirect to the desired page
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
      >
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Image src="/logo.png" alt="" width={24} height={24} />
          School
        </h1>
        <h2 className="text-gray-400">Register new staff</h2>
        {/* <Clerk.GlobalError className="text-sm text-red-400" /> */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">First Name</label>
          <input
            type="text"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="p-2 rounded-md ring-1 ring-gray-300"
          />
          {/* <Clerk.FieldError className="text-xs text-red-400" /> */}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Last Name</label>
          <input
            type="text"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="p-2 rounded-md ring-1 ring-gray-300"
          />
          {/* <Clerk.FieldError className="text-xs text-red-400" /> */}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-2 rounded-md ring-1 ring-gray-300"
          />
          {/* <Clerk.FieldError className="text-xs text-red-400" /> */}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded-md ring-1 ring-gray-300"
          />
          {/* <Clerk.FieldError className="text-xs text-red-400" /> */}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 rounded-md ring-1 ring-gray-300"
          />
          {/* <Clerk.FieldError className="text-xs text-red-400" /> */}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Password Confirmation</label>
          <input
            type="password"
            id="password-con"
            value={passwordCon}
            onChange={(e) => setPasswordCon(e.target.value)}
            required
            className="p-2 rounded-md ring-1 ring-gray-300"
          />
          {/* <Clerk.FieldError className="text-xs text-red-400" /> */}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
