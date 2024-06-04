import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Dialog } from "../ui/dialog";
import { updateLink } from "@/utils/services";
import { EditedLinkSchema, LinkSchema } from "@/utils/schemas";
import { InputError } from "../ui/error";

export const EditLink = ({ id, link }: { id: string; link: any }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [errors, setErrors] = useState<{
    original: string[];
    description: string[];
  }>({
    original: [],
    description: [],
  });
  const router = useRouter();

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    const validateEditedLink = EditedLinkSchema.safeParse(formJson);
    console.log("el link es valido", validateEditedLink);
    if (!validateEditedLink.success) {
      const format = validateEditedLink.error.flatten();
      setErrors({
        original: format.fieldErrors.original || [],
        description: format.fieldErrors.description || [],
      });
      return;
    }
    const updatedLink = await updateLink(id, formJson);
    console.log("res", updatedLink);
    router.refresh();
  };

  return (
    <>
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
      <Dialog
        open={openEdit}
        blurBack={true}
        setOpen={setOpenEdit}
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        blockClicksBehind={false}
      >
        <p className="text-left text-gray-500 text-2xl font-bold">
          Editing <span className="text-green-400">/{link.short}</span>
        </p>
        <form onSubmit={handleEdit} className="flex flex-col items-start gap-2">
          <label className="flex flex-col gap-2 font-bold">Your URL</label>
          <input
            className="border-2 border-slate-200 rounded-lg p-2"
            type="text"
            id="original"
            name="original"
            defaultValue={link.original}
          />
          {errors.original.length > 0 ? (
            <InputError id="original" errors={errors.original} />
          ) : (
            ""
          )}
          <label htmlFor="short" className="flex flex-col gap-2 font-bold">
            Shortened URL
          </label>
          <input
            type="text"
            className="border-2 border-slate-200 rounded-lg p-2 bg-gray-200"
            name="short"
            defaultValue={link.short}
            disabled={true}
            id="short"
          />
          <label
            htmlFor="description"
            className="flex flex-col gap-2 font-bold"
          >
            Description
          </label>
          <textarea
            className="border-2 border-slate-200 rounded-lg p-2"
            name="description"
            defaultValue={link.description}
            id="description"
          ></textarea>
          {errors.description.length > 0 ? (
            <InputError id="description-error" errors={errors.description} />
          ) : (
            ""
          )}
          <button
            type="submit"
            className="bg-black text-white p-4 rounded-lg w-full mt-2"
          >
            Save changes
          </button>
        </form>
      </Dialog>
    </>
  );
};
