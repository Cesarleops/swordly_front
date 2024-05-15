import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Dialog } from "../ui/dialog";

export const EditGroup = ({ id, name, description }: any) => {
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    console.log("json", formJson);
    const updatedLink = await fetch("http://localhost:3031/api/groups", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ id, ...formJson }),
      credentials: "include",
    });
    console.log(updatedLink);
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
        <form onSubmit={handleEdit}>
          <label htmlFor="name" className="flex flex-col gap-2">
            Group Name
          </label>
          <input
            className="border-2 border-slate-200 rounded-lg "
            type="text"
            name="name"
            id="name"
            defaultValue={name}
          />

          <label htmlFor="description" className="flex flex-col gap-2">
            Description
          </label>
          <textarea
            className="border-2 border-slate-200 rounded-lg"
            name="description"
            defaultValue={description}
            id="description"
          ></textarea>
          <button type="submit" className="bg-blue-500 p-5 rounded-lg">
            Send
          </button>
        </form>
      </Dialog>
    </>
  );
};
