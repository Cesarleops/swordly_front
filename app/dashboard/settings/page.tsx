import { getUser } from "@/utils/actions";
import envConfig from "@/utils/constants";
import Link from "next/link";
export default async function UserSettings() {
  const user = await getUser();
  return (
    <section className="flex flex-col gap-3 p-10">
      <Link href={"/dashboard"}>Go back</Link>
      <p className="font-bold text-xl">User Configuration</p>
      <Link
        href={`${envConfig.apiUrl}/user/delete/${user.id}`}
        className="p-5 rounded-md text-white bg-red-500 w-fit"
      >
        Delete Account
      </Link>
      {JSON.stringify(user)}
    </section>
  );
}
