import { GroupCard } from "@/app/components/groups/group-card";
import { getGroups } from "@/utils/actions";
import Link from "next/link";

export default async function Groups(params: any) {
  const groups = await getGroups();
  console.log("gg", groups);

  return (
    <section>
      <header className="flex gap-3 items-center px-10 pt-5">
        <Link href={"/dashboard"}>back</Link>
        <h3>Groups</h3>
      </header>
      <div className="flex p-10">
        {groups.map((g: { id: string; name: string; created_at: string }) => (
          <GroupCard
            key={g.id}
            name={g.name}
            id={g.id}
            created_at={g.created_at}
          />
        ))}
      </div>
    </section>
  );
}
