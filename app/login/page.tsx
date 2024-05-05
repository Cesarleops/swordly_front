import Link from "next/link";
import { Icons } from "../components/ui/icon";

export default function Login() {
  return (
    <section className="h-screen flex gap-10 justify-center px-10">
      <div className="h-fit flex flex-col gap-6 mt-40 border-2 border-slate-200 p-10 rounded-xl">
        <header className="flex flex-col items-start gap-2">
          <div className="flex gap-4 items-center">
            {Icons.sword()}
            <p className="text-center font-semibold text-3xl">Welcome back</p>
          </div>

          <p className="text-left text-xl font-normal max-w-2xl text-pretty">
            Log in with email and password or select your favorite prodiver!
          </p>
        </header>
        <form className="flex flex-col gap-4 items-start w-full pl-0 md:pl-10">
          <fieldset className="w-full">
            <label htmlFor="email">Email</label>
            <div className="flex items-center p-2 border border-slate-200 rounded-xl max-w-xl">
              <input id="email" type="email" className="w-full" />
              {Icons.email()}
            </div>
          </fieldset>
          <fieldset className="w-full">
            <label htmlFor="password">Password</label>
            <div className="flex items-center p-2 border border-slate-200 rounded-xl  max-w-xl ">
              <input type="password" id="password" className="w-full mr-auto" />
              {Icons.password()}
            </div>
          </fieldset>
        </form>

        <div className="flex gap-10  justify-center items-center">
          <Link
            href="http://localhost:3031/api/login/github"
            className="p-2 border border-slate-200 rounded-md flex gap-2 items-center"
          >
            {Icons.github()}
            <p className="font-semibold text-pretty max-w-xl">
              Continue with Github
            </p>
          </Link>
          <Link
            href="http://localhost:3031/api/login/google"
            className="p-2  border border-slate-200 rounded-md flex gap-4 items-center"
          >
            {Icons.google()}
            <p className="font-semibold text-pretty max-w-xl">
              Continue with Google
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
