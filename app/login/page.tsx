"use client";
import Link from "next/link";
import { Icons } from "../components/ui/icon";
import { userSchema } from "@/utils/schemas";
import { FormEvent, useState } from "react";

export default function Login() {
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userData = Object.fromEntries(formData.entries());
    const validateUser = userSchema.safeParse(userData);
    if (!validateUser.success) {
      const errors = validateUser.error.format();
      console.log(errors);
      setErrors(errors);
    }
    if ((userData.password as string).trim().length === 0) {
      console.log("la contraseña esta llena de espacios");
    }
  };
  return (
    <section className="h-screen flex flex-col items-center sm:items-start sm:flex-row gap-10 sm:justify-center px-10">
      <div className="h-fit flex flex-col gap-6 mt-40 border-2 border-slate-200 p-10 rounded-xl">
        <header className="flex flex-col items-start gap-2">
          <div className="flex gap-4 items-center">
            {Icons.sword()}
            <p className="text-center font-semibold text-3xl">Welcome</p>
          </div>

          <p className="text-left text-xl font-normal max-w-2xl text-pretty">
            Log in with email and password or select your favorite prodiver!
          </p>
        </header>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-start w-full pl-0 md:pl-10"
        >
          <fieldset className="w-full">
            <label htmlFor="email">Email</label>
            <div className="flex items-center p-2 border border-slate-200 rounded-xl max-w-xl">
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
            <label htmlFor="password">Password</label>
            <div className="flex items-center p-2 border border-slate-200 rounded-xl  max-w-xl ">
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
          <button className="bg-black rounded-lg text-white self-center p-4 font-mono">
            Continue
          </button>
        </form>

        <div className="flex gap-10  justify-center items-center">
          <Link
            href="http://localhost:3031/api/login/github"
            className="p-2 border border-slate-200 rounded-md flex gap-2 items-center"
          >
            {Icons.github()}
            <p className="font-semibold text-pretty max-w-xl hidden sm:block">
              Continue with Github
            </p>
          </Link>
          <Link
            href="http://localhost:3031/api/login/google"
            className="p-2  border border-slate-200 rounded-md flex gap-4 items-center"
          >
            {Icons.google()}
            <p className="font-semibold text-pretty max-w-xl hidden sm:block">
              Continue with Google
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
