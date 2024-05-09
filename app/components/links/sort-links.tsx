"use client";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export const SortLinks = () => {
  const [open, setOpen] = useState(false);

  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  return (
    <div className="relative">
      <div
        className="border bg-[#ecf6ff] rounded-xl p-2 flex gap-3 transition-colors duration-500 hover:border-[#379afc]"
        onClick={() => setOpen(true)}
      >
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
          className="stroke-[#379afc]"
        >
          <path d="m3 16 4 4 4-4" />
          <path d="M7 20V4" />
          <path d="m21 8-4-4-4 4" />
          <path d="M17 4v16" />
        </svg>
        <p className="text-[#379afc] hidden lg:block">Sort</p>
      </div>
      <Dialog
        open={open}
        setOpen={setOpen}
        className="absolute bg-[#ecf6ff] z-50  top-14 right-3 sm:right-0 w-[200px] sm:w-[300px] px-5 py-10 shadow-sm"
        blurBack={false}
        blockClicksBehind={true}
      >
        <p className="text-[#379afc] text-2xl font-bold">Sort</p>
        <p className="text-gray-400 text-pretty">
          Change the way you want to order your links
        </p>
        <ul className="flex flex-col gap-4">
          <li>
            <button
              onClick={() => {
                const p = new URLSearchParams(params);
                console.log(p.get("order"));
                if (p.get("order") === "name_asc") {
                  p.delete("order");
                  router.replace(`${path}`);
                  router.refresh();

                  return;
                }
                p.set("order", "name_asc");
                router.replace(`${path}?${p.toString()}`);
                router.refresh();
              }}
              className="bg-[#ecf6ff] p-2 rounded-xl text-[#379afc]"
            >
              Name A-Z
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                const p = new URLSearchParams(params);

                if (p.get("order") === "name_desc") {
                  p.delete("order");
                  router.replace(`${path}`);
                  router.refresh();
                  return;
                }
                p.set("order", "name_desc");
                router.replace(`${path}?${p.toString()}`);
                router.refresh();
              }}
              className="bg-[#ecf6ff] p-2 rounded-xl text-[#379afc]"
            >
              Name Z-A
            </button>
          </li>
        </ul>
      </Dialog>
    </div>
  );
};
