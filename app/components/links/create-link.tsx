"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Dialog } from "../ui/dialog";
import { toast } from "sonner";
import { createNewLink } from "@/utils/services";
import { LinkSchema } from "@/utils/schemas";
import { InputError } from "../ui/error";

export function CreateLink() {
  const [clicked, setClicked] = useState(false);
  const [errors, setErrors] = useState<any>(false);
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
    const validateNewLink = LinkSchema.safeParse(input);

    if (!validateNewLink.success) {
      toast.error("Something went wrong creating your link");
      setErrors(validateNewLink.error?.format());
      return;
    }

    if (input.original === input.short) {
      toast.error("Can't use the same link in the shortened version");
      return;
    }

    try {
      const newLink = await createNewLink(input);
      console.log("resultado de crear", newLink);
      if (newLink.message === "The short link already exists") {
        toast.info(newLink.message);
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
        <form onSubmit={handleSubmit} className="flex flex-col  gap-4">
          <label className="flex flex-col gap-2">
            Long Link
            <input
              className="border-2 border-slate-200 rounded-lg p-2"
              type="text"
              value={input.original}
              required
              onChange={handleChange}
              name="original"
              aria-describedby="original"
            />
          </label>
          {errors.original?._errors.length > 0 ? (
            <InputError id="original" errors={errors.original._errors} />
          ) : (
            ""
          )}
          <label className="flex flex-col gap-2">
            Short Link
            <input
              type="text"
              className="border-2 border-slate-200 rounded-lg p-2"
              value={input.short}
              required
              onChange={handleChange}
              name="short"
              aria-describedby="short"
            />
          </label>
          {errors.short?._errors.length > 0 ? (
            <InputError id="short" errors={errors.short._errors} />
          ) : (
            ""
          )}
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
