import Link from "next/link";

export default function Login() {
  return (
    <section className="min-h-screen bg-backgrounds flex justify-center items-centers">
      <form className="h-1/2 p-10 flex flex-col gap-4 rounded-xl mt-40 bg-[#7743DB]">
        <label className="flex gap-2">
          Username
          <input className="rounded-md" />
        </label>
        <label className="flex gap-2">
          Password
          <input className="rounded-md" />
        </label>
        <Link href="/dashboard" className="p-2 bg-white rounded-md text-center">
          Continue
        </Link>
      </form>
    </section>
  );
}
