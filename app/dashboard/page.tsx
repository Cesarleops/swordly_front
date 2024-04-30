import { links } from "../../utils/data";

export default async function Dashboard() {
  return (
    <section>
      <header className="flex items-center justify-between px-5 mt-2">
        <div className="flex items-center gap-10">
          <span className="font-bold">/Links</span>
          <input
            type="text"
            placeholder="Search a link!"
            className="h-8 p-2 border border-slate-100 text-left font-mono rounded-xl"
          />
          <p className="border border-slate-100 rounded-xl p-2">3/20</p>
          <p className="border border-slate-100 rounded-xl p-2">Sort</p>
          <p className="border border-slate-100 rounded-xl p-2">Group</p>
        </div>
        <div>
          <button className="flex justify-center items-center border p-2 rounded-xl">
            Create Link
          </button>
        </div>
      </header>
      <main className="px-10 pt-10">
        <section className="flex gap-8">
          {links.map((li) => (
            <div
              className="border border-slate-300 p-5 rounded-lg relative"
              key={li.originalUrl}
            >
              <p>Original URL: {li.originalUrl}</p>
              <p>Short UR: {li.shortUrl}</p>
              <p className="absolute right-2 bottom-1">clicks {li.clicks}</p>
            </div>
          ))}
        </section>
      </main>
    </section>
  );
}
