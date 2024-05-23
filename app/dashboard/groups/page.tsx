import { GroupCard } from "@/app/components/groups/group-card";
import { getGroups } from "@/utils/actions";
import Link from "next/link";
export default async function Groups({ params }: any) {
  const groups = await getGroups();

  return (
    <section>
      <header className="flex gap-3 items-center px-10 pt-5">
        <Link href={"/dashboard"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-arrow-left"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12H8" />
            <path d="m12 8-4 4 4 4" />
          </svg>
        </Link>
        <h3 className="text-xl font-bold">Groups</h3>
      </header>
      <p className="pl-10 mt-4 text-xl">
        Those are the groups you have created for your links
      </p>

      <div className="flex p-10 gap-4 flex-wrap">
        {groups.length === 0 && <p>You haven&apos;t created any group. </p>}
        {groups.map(
          (g: {
            id: string;
            name: string;
            created_at: string;
            description: string;
          }) => (
            <GroupCard
              key={g.id}
              name={g.name}
              id={g.id}
              created_at={g.created_at}
              description={g.description}
              params={params}
            />
          )
        )}
      </div>
    </section>
  );
}
