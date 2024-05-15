import Link from "next/link";

export default function Home() {
  return (
    <section className="w-screen h-screen flex flex-col  gap-10 items-center pt-40 ">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-5xl font-bold text-center">SW0RDLY</h1>
        <p className="font-semibold text-xl">Links management tool</p>
      </div>

      <Link
        href="/login"
        className="text-center p-4 bg-black rounded-full text-white"
      >
        Start creating
      </Link>
    </section>
  );
}
