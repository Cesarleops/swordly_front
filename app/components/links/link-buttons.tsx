"use client";

import { FormEvent, useState } from "react";
import { CopyClipboard } from "../user/copy-clipboard";
import { GenerateQR } from "./generate-qr";
import { DeleteLink } from "./delete-link";
import { EditLink } from "./edit-link";
import { Dialog } from "../ui/dialog";

export const LinkButtons = ({ id, link }: { id: number; link: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="absolute top-2 right-2 flex items-center gap-3">
        <GenerateQR short={link.short} />
        <CopyClipboard short={link.short} />
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
          className="lucide lucide-ellipsis"
          onClick={() => setOpen(true)}
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </nav>
      <Dialog
        open={open}
        className="absolute flex flex-col items-center gap-4 right-1 top-0 w-[200px] px-5 py-12 z-50"
        setOpen={setOpen}
        blurBack={false}
        blockClicksBehind={true}
      >
        <p className="text-left self-start font-bold">/{link.short}</p>
        <button className="flex gap-4 items-center justify-start  bg-slate-100 p-4 pr-7 rounded-lg">
          Edit
          <EditLink id={id} link={link} />
        </button>
        <button className="flex items-center gap-4 bg-red-100 p-3 rounded-lg text-red-500">
          Delete
          <DeleteLink id={id} />
        </button>
      </Dialog>
    </>
  );
};
