import { CreateLink } from "../components/links/create-link";
import { LinkButtons } from "../components/links/link-buttons";
import { GroupLinks } from "../components/links/group-links";
import { SortLinks } from "../components/links/sort-links";
import { getUser, getLinks } from "@/utils/actions";

type Link = {
  id: number;
  original: string;
  short: string;
  clicks: number;
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: {
    order: string;
  };
}) {
  const user = await getUser();
  const { links } = await getLinks(searchParams);
  return (
    <section>
      <header className="flex  px-2 sm:px-10 mt-2 border-b-2 border-b-slate-100  items-center h-20">
        <div className="flex items-center gap-3 lg:gap-10  justify-between w-screen">
          <span className="font-bold hidden sm:block">/{user.username}</span>
          <input
            type="text"
            placeholder="Search a link!"
            className="h-8 p-6 border border-slate-200 text-left font-normal rounded-xl w-[150px] sm:w-auto"
          />

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
            <span>{user.links_amount}/20</span>
          </div>
          <SortLinks />
          <GroupLinks />
          <div className="ml-auto">
            <CreateLink links_amount={user.links_amount} />
          </div>
        </div>
      </header>

      <main className="px-10 pt-10">
        <section className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-start gap-8 ">
          {links.length > 0 &&
            links.map((li: Link) => (
              <div
                className="flex flex-col border border-slate-300 p-5 rounded-lg relative w-[100%]  md:w-[30%] animate-fade-in"
                key={li.id}
              >
                <LinkButtons id={li.id} link={li} />
                <a
                  href={`http://localhost:3031/api/links/${li.short}`}
                  target="_blank"
                >
                  /{li.short}
                </a>
                <a href={li.original} className="text-slate-400">
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
