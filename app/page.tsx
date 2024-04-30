import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen bg-backgrounds">
      <div className="flex flex-col justify-center items-center pt-40 gap-8">
        <h1 className="text-5xl font-bold text-[#7743DB]">
          Create and manage your links.
        </h1>
        <p className="text-pretty text-xl max-w-xl text-slate-300 font-mono">
          Organization and link management tool
        </p>
        <Link
          className="bg-[#7743DB] p-3 rounded-lg font-bold text-slate-300 "
          href="/login"
        >
          Create a Link
        </Link>
      </div>
    </section>
  );
}
