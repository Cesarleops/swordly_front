import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Dialog } from "../ui/dialog";
import { checkIfShortLinkExists, updateLink } from "@/utils/services";

export const EditLink = ({ id, link }: { id: number; link: any }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [errors, setErrors] = useState<{ message: string; errors: any[] }>({
    message: "",
    errors: [],
  });
  const router = useRouter();

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    const linkExists = await checkIfShortLinkExists(formJson.short as string);
    if (linkExists.message === "founded") {
      setErrors({
        message: "Failed create link",
        errors: ["link already exists"],
      });
      return;
    }
    await updateLink(id, formJson);
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
        <p className="text-left text-gray-500 text-2xl">
          Editing <span className="text-green-400">/{link.short}</span>
        </p>
        <form onSubmit={handleEdit} className="flex flex-col items-start gap-4">
          <label className="flex flex-col gap-2">Long Link</label>
          <input
            className="border-2 border-slate-200 rounded-lg p-2"
            type="text"
            id="original"
            name="original"
            defaultValue={link.original}
          />
          <label htmlFor="short" className="flex flex-col gap-2">
            Short Link
          </label>
          <input
            type="text"
            className="border-2 border-slate-200 rounded-lg p-2"
            name="short"
            defaultValue={link.short}
            id="short"
          />
          <label htmlFor="description" className="flex flex-col gap-2">
            description
          </label>
          <textarea
            className="border-2 border-slate-200 rounded-lg p-2"
            name="description"
            defaultValue={link.description}
            id="description"
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white p-4 w-1/2 rounded-lg self-center "
          >
            Save changes
          </button>
        </form>
      </Dialog>
    </>
  );
};
