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

export default async function Dashboard() {
  const user = await getUser();
  const { links } = await getLinks(user.id);
  console.log("user", user);
  console.log("links", links);
  return (
    <section>
      <header className="flex items-center justify-between px-10 mt-2 border-b-2 border-b-slate-100 pb-4">
        <div className="flex items-center gap-10 w-screen">
          <span className="font-bold">/Links/{user.username}</span>
          <input
            type="text"
            placeholder="Search a link!"
            className="h-8 p-6 border border-slate-200 text-left font-normal rounded-xl"
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
              className="lucide lucide-bar-chart-2"
            >
              <line x1="18" x2="18" y1="20" y2="10" />
              <line x1="12" x2="12" y1="20" y2="4" />
              <line x1="6" x2="6" y1="20" y2="14" />
            </svg>
            <p>3/20</p>
          </div>
          <SortLinks />
          <GroupLinks />
          <div className="ml-auto">
            <CreateLink />
          </div>
        </div>
      </header>

      <main className="px-10 pt-10">
        <section className="flex gap-8 flex-wrap max-w-8xl">
          {links.length > 0 &&
            links.map((li: Link) => (
              <div
                className="flex flex-col border border-slate-300 p-5 rounded-lg relative w-[25%] animate-fade-in"
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
