"use client";
import Link from "next/link";
import { Dialog } from "../ui/dialog";
import { useState } from "react";
import { EditGroup } from "./edit-group";
import { DeleteGroup } from "./delete-group";

export const GroupOptions = ({ name, description, id }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="border-2 border-slate-100 rounded-xl p-1 w-10 h-10"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
      <Dialog
        open={open}
        className="absolute flex flex-col right-2 w-[200px] px-5 py-10 z-50"
        setOpen={setOpen}
        blurBack={false}
        blockClicksBehind={true}
      >
        <ul className="flex flex-col gap-3 mt-2">
          <li>
            <EditGroup id={id} name={name} description={description} />
          </li>
          <li>
            <DeleteGroup id={id} />
          </li>
        </ul>
      </Dialog>
    </div>
  );
};
