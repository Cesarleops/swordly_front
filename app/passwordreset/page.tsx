import Link from "next/link";

export default function PasswordReset() {
  return (
    <section className=" relative h-screen w-screen flex items-center justify-center">
      <Link
        className="absolute left-5 top-5 bg-black text-white p-2 rounded-md"
        href={"/login"}
      >
        Go Back
      </Link>
      <div className="p-10 border-2 border-slate-200 rounded-md">
        <form className="flex flex-col gap-4 ">
          <label className="font-bold text-xl">
            Please enter your account email
          </label>
          <input
            type="email"
            className="p-3 border border-slate-200 rounded-md"
          />
          <button className="bg-black p-4 rounded-md text-white">Send</button>
        </form>
      </div>
    </section>
  );
}
