"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import { toast } from "sonner";

export function CreateLink() {
  const [clicked, setClicked] = useState(false);
  const [input, setInput] = useState({
    original: "",
    short: "",
    description: "",
  });
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3031/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
      });
      toast.success("Your was link created");

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong creating your link");
    }
  };
  return (
    <>
      <button
        className="border bg-black text-white rounded-xl font-semibold p-2 px-5"
        onClick={() => setClicked(true)}
      >
        Create Link
      </button>
      <Dialog
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  p-10"
        open={clicked}
        setOpen={setClicked}
        blurBack={true}
        blockClicksBehind={true}
      >
        <form onSubmit={handleSubmit}>
          <p className="text-xl text-gray-500">Create a link</p>
          <label className="flex flex-col gap-2">
            Long Link
            <input
              className="border-2 border-slate-200 rounded-lg p-2"
              type="text"
              onChange={(e) => {
                setInput((prev) => {
                  return {
                    ...prev,
                    original: e.target.value,
                  };
                });
              }}
            />
          </label>
          <label className="flex flex-col gap-2">
            Short Link
            <input
              type="text"
              className="border-2 border-slate-200 rounded-lg p-2"
              onChange={(e) => {
                setInput((prev) => {
                  return {
                    ...prev,
                    short: e.target.value,
                  };
                });
              }}
            />
          </label>
          <label className="flex flex-col gap-2">
            Description
            <textarea
              placeholder="Optional"
              className="border-2 border-slate-200 rounded-lg p-2"
            ></textarea>
          </label>
          <button className="bg-orange-200 text-orange-600 font-bold p-5 rounded-lg">
            Create
          </button>
        </form>
      </Dialog>
    </>
  );
}
