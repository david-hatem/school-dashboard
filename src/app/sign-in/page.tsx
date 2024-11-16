"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const LoginPage = () => {
  const cookies = new Cookies();

  // const { isLoaded, isSignedIn, user } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await fetch("http://167.114.0.177:81/token", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in. Check your credentials.");
      }

      const data = await response.json();
      const token = data["access"];
      cookies.set("authToken", token, {
        maxAge: 5 * 60,
        secure: true,
      });

      // Save token to local storage (or handle as needed)
      // localStorage.setItem("authToken", token);

      // Redirect to the desired page
      console.log(`cookies.get("authToken")`, cookies.get("authToken"));
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
        <h2 className="text-gray-400">Sign in to your account</h2>
        {/* <Clerk.GlobalError className="text-sm text-red-400" /> */}
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
