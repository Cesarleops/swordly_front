"use client";
import { FormEvent, useState } from "react";
import { Icons } from "../components/ui/icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUp() {
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    const res = await fetch("http://localhost:3031/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formJson),
    });
    const data = await res.json();
    console.log("reg", data);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    router.push("/dashboard");
  };
  return (
    <section className="h-screen flex flex-col items-center sm:items-start sm:flex-row gap-10 sm:justify-center px-10">
      <div className="h-fit flex flex-col gap-6 mt-40 border-2 border-slate-200 p-10 rounded-xl ">
        <header className="flex flex-col items-center gap-2">
          <div className="flex flex-col  gap-4 items-center ">
            {Icons.sword()}
            <p className="text-center font-semibold text-3xl">Sign up</p>
          </div>

          <p className="text-left text-xl font-medium max-w-3xl text-pretty">
            Sign up with email and password or your favorite prodiver
          </p>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <fieldset className="w-full">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <div className="flex items-center p-2 border border-slate-200 rounded-xl ">
              <input
                id="email"
                type="email"
                className="w-full bg-none"
                name="email"
                required
              />
              {Icons.email()}
            </div>
          </fieldset>
          <fieldset className="w-full">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <div className="flex items-center p-2 border border-slate-200 rounded-xl   ">
              <input
                type="password"
                id="password"
                className="w-full mr-auto"
                required
                name="password"
                aria-describedby="password-error"
              />
              {Icons.password()}
            </div>
            {errors.password ? (
              <p className="text-red-500 text-sm text-pretty ">
                {errors.password._errors[0]}
              </p>
            ) : null}
          </fieldset>
          <button className="bg-black rounded-lg text-white  w-full p-4 font-mono">
            Sign up
          </button>
        </form>

        <div className="flex flex-col gap-4  ">
          <Link
            href="http://localhost:3031/api/login/github"
            className="p-2 border border-slate-200 rounded-md flex gap-2 justify-center items-center"
          >
            {Icons.github()}
            <p className="font-semibold text-pretty  hidden sm:block">
              Continue with Github
            </p>
          </Link>
          <Link
            href="http://localhost:3031/api/login/google"
            className="p-2  border border-slate-200 rounded-md flex gap-2 items-center justify-center"
          >
            {Icons.google()}
            <p className="font-semibold text-pretty text-center hidden sm:block">
              Continue with Google
            </p>
          </Link>
        </div>
        <Link href={"/login"} className="text-center font-bold text-green-400">
          Already have an account ?
        </Link>
      </div>
    </section>
  );
}
