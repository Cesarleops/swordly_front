"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export const SearchLink = ({ searchParams }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      router.replace(`${pathname}`);
      return;
    }
    router.replace(`${pathname}?search=${e.target.value}`);
    router.refresh();
  };
  return (
    <input
      type="text"
      placeholder="Search a link!"
      onChange={handleChange}
      className="h-8 p-6 border border-slate-200 text-left font-normal rounded-xl w-[150px] sm:w-auto"
    />
  );
};
