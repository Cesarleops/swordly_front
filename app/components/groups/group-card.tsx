import { getLinks, getSingleGroup } from "@/utils/actions";

import { GroupOptions } from "./group-options";

export const GroupCard = async ({
  id,
  name,
  created_at,
  description,
  params,
}: {
  id: string;
  name: string;
  created_at: string;
  description: string;
  params: { order: string; search: string };
}) => {
  const group = await getSingleGroup(id);
  const { links } = await getLinks(params);

  const date = created_at.slice(0, 10);
  const linkIds = new Set(
    group.group_links.map((li: { link_id: string }) => li.link_id)
  );
  const availableLinks = links.filter(
    (li: { id: string }) => !linkIds.has(li.id)
  );
  return (
    <div className="relative flex flex-col  px-6 py-6  border-2 border-slate-200 w-[100%] sm:w-[35%] rounded-lg">
      <header className="flex gap-3 items-center">
        <p className="text-2xl font-bold mr-auto">{name}</p>
        <GroupOptions
          id={id}
          description={description}
          name={name}
          available_links={availableLinks}
        />
      </header>
      <p className="font-semibold text-lg">{description}</p>

      <div>
        <p className="text-green-400 text-lg font-semibold">Associated links</p>
        <ul className="flex gap-4">
          {group.group_links.map((li: any) => (
            <li key={li.id} className="flex gap-2 items-center text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-purple-500"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <p className="text-gray-500">/{li.short}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-orange-400 bottom-1 right-3 absolute">
          {date}
        </p>
      </div>
    </div>
  );
};
