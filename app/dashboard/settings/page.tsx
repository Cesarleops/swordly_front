import { getUser } from "@/utils/actions";
import Link from "next/link";
export default async function UserSettings() {
  const user = await getUser();
  console.log(user.id);
  return (
    <section className="flex flex-col gap-3 p-10">
      <Link href={"/dashboard"}>Go back</Link>
      <p className="font-bold text-xl">User Configuration</p>
      <Link
        href={`http://localhost:3031/api/user/delete/${user.id}`}
        className="p-5 rounded-md text-white bg-red-500 w-fit"
      >
        Delete Account
      </Link>
      {JSON.stringify(user)}
    </section>
  );
}
