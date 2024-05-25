"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icons } from "../ui/icon";
import { DropdownMenu } from "../ui/dropdown-menu";

export function Settings() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname !== "/dashboard") {
    return null;
  }
  console.log(open);
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
          className="border-2 border-slate-100 rounded-xl p-2 w-[45px] h-[45px] "
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      <DropdownMenu
        open={open}
        className="absolute flex flex-col top-14 right-6 w-[200px] px-5 py-10 z-50"
        setOpen={setOpen}
      >
        <ul>
          <li>
            <Link
              href="/edit"
              className="flex gap-2 rounded-xl p-2  font-normal hover:bg-slate-100 "
            >
              {Icons.user()}
              Edit profile
            </Link>
          </li>
          <li>
            <Link
              href="http://localhost:3031/api/logout"
              className="flex gap-2 rounded-xl p-2 hover:bg-[#fff5f5] text-[#f93863] font-normal "
            >
              {Icons.logOut()}
              Log out
            </Link>
          </li>
        </ul>
      </DropdownMenu>
    </div>
  );
}
