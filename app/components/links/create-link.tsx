"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Dialog } from "../ui/dialog";
import { toast } from "sonner";
import { checkIfShortLinkExists } from "@/utils/services";

export function CreateLink() {
  const [clicked, setClicked] = useState(false);
  const [errors, setErrors] = useState<{ message: string; errors: any[] }>({
    message: "",
    errors: [],
  });
  const [input, setInput] = useState({
    original: "",
    short: "",
    description: "",
  });
  const router = useRouter();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const linkExists = await checkIfShortLinkExists(input.short);
      if (linkExists.message === "founded") {
        setErrors({
          message: "Failed create link",
          errors: ["link already exists"],
        });
        return;
      }
      const res = await fetch("http://localhost:3031/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.ok === "false") {
        toast.info(data.message);
        return;
      }
      toast.success("Your was link created");
      setInput({
        original: "",
        short: "",
        description: "",
      });

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
        <p className="hidden lg:block">Create Link</p>
        <span className="block lg:hidden">+</span>
      </button>
      <Dialog
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  p-10"
        open={clicked}
        setOpen={setClicked}
        blurBack={true}
        blockClicksBehind={true}
      >
        <p className="text-gray-500 text-2xl">Create a new link</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <label className="flex flex-col gap-2">
            Long Link
            <input
              className="border-2 border-slate-200 rounded-lg p-2"
              type="text"
              value={input.original}
              required
              onChange={handleChange}
              name="original"
            />
          </label>
          <label className="flex flex-col gap-2">
            Short Link
            <input
              type="text"
              className="border-2 border-slate-200 rounded-lg p-2"
              value={input.short}
              required
              onChange={handleChange}
              name="short"
            />
            {errors.errors.length > 0 ? (
              <p className="text-red-500">{errors.errors[0]}</p>
            ) : (
              ""
            )}
          </label>
          <label className="flex flex-col gap-2">
            Description
            <textarea
              value={input.description}
              onChange={handleChange}
              placeholder="Optional"
              name="description"
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
