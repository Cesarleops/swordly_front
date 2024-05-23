"use client";

import { debounce } from "@/utils/helpers";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export const SearchLink = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const improvedSearch = debounce((value: string) => {
    const params = new URLSearchParams(searchParams);
    //This way makes deleting the query param easier than doing raw replaces in the route.
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    improvedSearch(e.target.value);
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
