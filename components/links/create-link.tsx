"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Dialog } from "../ui/dialog";
import { toast } from "sonner";
import { createNewLink } from "@/utils/services";
import { LinkSchema } from "@/utils/schemas";
import { InputError } from "../ui/error";
import { Icons } from "../ui/icon";

export function CreateLink() {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({
    original: undefined,
    short: undefined,
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    const validateNewLink = LinkSchema.safeParse(formJson);

    if (!validateNewLink.success) {
      toast.error("Something went wrong creating your link");
      console.log(validateNewLink.error?.format());
      setErrors(validateNewLink.error?.format());
      return;
    }

    if (formJson.original === formJson.short) {
      toast.error("Can't use the same link in the shortened version");
      return;
    }

    try {
      setLoading(true);
      const newLink = await createNewLink(formJson);
      console.log("resultado de crear", newLink);
      setLoading(false);
      if (newLink.message === "The short link already exists") {
        toast.info(newLink.message);
        return;
      }
      toast.success("Your was link created");
      form.reset();
      setErrors({});
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
        {loading && Icons.loading()}
      </button>
      <Dialog
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  p-10"
        open={clicked}
        setOpen={setClicked}
        blurBack={true}
        blockClicksBehind={true}
      >
        <p className="text-gray-500 text-2xl font-bold">Create a new link</p>
        <form onSubmit={handleSubmit} className="flex flex-col  gap-4">
          <label className="flex flex-col gap-2 font-bold">
            Your URL
            <input
              className="border-2 border-slate-200 rounded-lg p-2"
              type="text"
              required
              name="original"
              placeholder="https://verylongurl.com"
              aria-describedby="original"
            />
          </label>
          {errors && errors.original?._errors.length > 0 ? (
            <InputError id="original" errors={errors.original?._errors} />
          ) : (
            ""
          )}
          <label className="flex flex-col gap-2 font-bold">
            Shortened URL
            <input
              type="text"
              className="border-2 border-slate-200 rounded-lg p-2"
              required
              placeholder="url"
              name="short"
              aria-describedby="short"
            />
          </label>
          {errors.short?._errors.length > 0 ? (
            <InputError id="short" errors={errors.short._errors} />
          ) : (
            ""
          )}
          <label className="flex flex-col gap-2 font-bold">
            Description
            <textarea
              placeholder="Optional"
              name="description"
              className="border-2 border-slate-200 rounded-lg p-2"
            ></textarea>
          </label>
          <button className="bg-black text-white font-mono p-5 rounded-lg">
            Create
          </button>
        </form>
      </Dialog>
    </>
  );
}
