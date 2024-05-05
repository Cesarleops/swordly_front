"use client";

import { useState } from "react";
import { Dialog } from "../ui/dialog";

export const LinkButtons = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <nav className="absolute top-2 right-2 flex items-center gap-3">
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
          className="lucide lucide-pencil"
          onClick={() => setOpenEdit(true)}
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
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
          className="stroke-red-400"
          onClick={() => setOpenDelete(true)}
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </nav>

      <Dialog
        open={openEdit}
        blurBack={true}
        setOpen={setOpenEdit}
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <form>
          <label className="flex flex-col gap-2">
            Long Link
            <input
              className="border-2 border-slate-200 rounded-lg "
              type="text"
            />
          </label>
          <label className="flex flex-col gap-2">
            Short Link
            <input
              type="text"
              className="border-2 border-slate-200 rounded-lg"
            />
          </label>
          <label className="flex flex-col gap-2">
            description
            <textarea
              placeholder="Optional"
              className="border-2 border-slate-200 rounded-lg"
            ></textarea>
          </label>
          <button className="bg-blue-500 p-5 rounded-lg">Send</button>
        </form>
      </Dialog>
      <Dialog
        open={openDelete}
        setOpen={setOpenDelete}
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        blurBack={true}
      >
        <div className="flex flex-col gap-5">
          <p className="text-gray-500 text-pretty max-w-lg">
            Please confirm you want to delete this link.
          </p>
          <div className="flex gap-10">
            <button className="border border-slate-200 p-2 rounded-xl">
              Cancel
            </button>
            <button className="flex gap-2 rounded-xl p-2 bg-[#fff5f5] text-[#f93863] font-normal ">
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
