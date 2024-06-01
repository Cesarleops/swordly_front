import { CreateLink } from "../components/links/create-link";
import { LinkButtons } from "../components/links/link-buttons";
import { CreateGroup } from "../components/groups/create-group";
import { SortLinks } from "../components/links/sort-links";
import { getUser, getLinks } from "@/utils/actions";
import { SearchLink } from "../components/links/search-link";

type Link = {
  id: string;
  original: string;
  short: string;
  clicks: number;
  description: string;
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: {
    order: string;
    search: string;
  };
}) {
  const user = await getUser();
  const { links } = await getLinks(searchParams);
  return (
    <section>
      <header className="flex  px-2 sm:px-10 mt-2 border-b-2 border-b-slate-100  items-center h-20">
        <div className="flex items-center gap-3   justify-between w-screen">
          <span className="font-bold hidden sm:block">/{user.username}</span>
          <SearchLink />
          <div className="border bg-[#edfee6] text-[#27cd0e] rounded-xl p-2 flex items-center gap-3">
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
              className="hidden sm:block"
            >
              <line x1="18" x2="18" y1="20" y2="10" />
              <line x1="12" x2="12" y1="20" y2="4" />
              <line x1="6" x2="6" y1="20" y2="14" />
            </svg>
            <span className="font-bold">{user.links_amount}/20</span>
          </div>
          <SortLinks />
          <CreateGroup links={links} />
          <div className="ml-auto">
            <CreateLink />
          </div>
        </div>
      </header>

      <main className="px-10 pt-10">
        <section className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-start gap-8 ">
          {links.length === 0 && (
            <div className="mx-auto flex flex-col gap-4">
              <p className=" text-xl font-bold text-slate-400 ">
                Looks like you don&apos;t have any links yet. Go create one!
              </p>
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
                className="self-center stroke-slate-400"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="9" x2="9.01" y1="9" y2="9" />
                <line x1="15" x2="15.01" y1="9" y2="9" />
              </svg>
            </div>
          )}
          {links.length > 0 &&
            links.map((li: Link) => (
              <div
                className="flex flex-col gap-2 border h-[150px] max-h-[150px] border-slate-300 p-5 rounded-lg relative w-[100%]  md:w-[30%] animate-fade-in"
                key={li.id}
              >
                <LinkButtons id={li.id} link={li} />
                <a
                  href={`http://localhost:3031/api/links/${li.short}`}
                  target="_blank"
                  className="w-fit text-blue-500 text-xl font-bold"
                >
                  /{li.short}
                </a>
                <p className="text-pretty text-ellipsis overflow-hidden">
                  {li.description}
                </p>
                <a
                  href={li.original}
                  className="text-slate-400  text-ellipsis overflow-hidden max-w-sm"
                >
                  {li.original}
                </a>
                <p className="absolute flex items-center right-2 bottom-1">
                  {li.clicks} clicks
                </p>
              </div>
            ))}
        </section>
      </main>
    </section>
  );
}
