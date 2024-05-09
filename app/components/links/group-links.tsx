"use client";
import { useState } from "react";
import { Dialog } from "../ui/dialog";

export const GroupLinks = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative ">
      <div
        className="border bg-[#f2ebfa] rounded-xl p-2 flex gap-3 transition-colors duration-500 hover:border-[#8f5cd4]"
        onClick={() => {
          setOpen(true);
        }}
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
          className="stroke-[#8f5cd4]"
        >
          <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
          <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
          <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
          <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
        </svg>
        <p className="text-[#8f5cd4] hidden lg:block">Group</p>
      </div>
      <Dialog
        open={open}
        setOpen={setOpen}
        className="absolute bg-[#f2ebfa] z-50  top-14 right-2 w-[200px]  sm:w-[300px] px-5 py-10 shadow-sm"
        blurBack={false}
        blockClicksBehind={true}
      >
        <p className="text-[#8f5cd4] text-2xl font-bold">Groups</p>
        <p className="text-gray-400 text-pretty">
          Group your links by project, business and more.
        </p>
        <ul className="flex flex-col gap-4">
          <li>
            <button className="bg-[#f2ebfa] p-2 rounded-xl text-purple-600">
              Create Group
            </button>
          </li>
        </ul>
      </Dialog>
    </div>
  );
};
