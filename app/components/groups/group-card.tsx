import { getSingleGroup } from "@/utils/actions";

export const GroupCard = async ({
  id,
  name,
  created_at,
}: {
  id: string;
  name: string;
  created_at: string;
}) => {
  console.log(id, name, created_at);
  const group = await getSingleGroup(id);
  console.log("sss", group);

  return (
    <div className="flex p-10 border-2 border-slate-200 w-fit">
      <p>{name}</p>
      <p>{created_at}</p>
      <ul>
        {group.group_links.map((li: any) => (
          <li key={li.id}>{li.short}</li>
        ))}
      </ul>
    </div>
  );
};
