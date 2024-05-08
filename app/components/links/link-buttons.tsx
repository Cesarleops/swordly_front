"use client";

import { FormEvent, useState } from "react";
import { Dialog } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { CopyClipboard } from "../user/copy-clipboard";
import { GenerateQR } from "./generate-qr";

export const LinkButtons = ({ id, link }: { id: number; link: any }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const del = await fetch("http://localhost:3031/api/links", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    });
    console.log(del);
    router.refresh();
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    console.log("json", formJson);
    const updatedLink = await fetch("http://localhost:3031/api/links", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ id, ...formJson }),
    });
    console.log(updatedLink);
    router.refresh();
  };

  return (
    <>
      <nav className="absolute top-2 right-2 flex items-center gap-3">
        <GenerateQR short={link.short} />
        <CopyClipboard short={link.short} />
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
          className="stroke-red-400"
          onClick={() => setOpenDelete(true)}
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </nav>

      <Dialog
        open={openEdit}
        blurBack={true}
        setOpen={setOpenEdit}
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        blockClicksBehind={false}
      >
        <form onSubmit={handleEdit}>
          <label htmlFor="original" className="flex flex-col gap-2">
            Long Link
          </label>
          <input
            className="border-2 border-slate-200 rounded-lg "
            type="text"
            name="original"
            id="original"
            defaultValue={link.original}
          />
          <label htmlFor="short" className="flex flex-col gap-2">
            Short Link
          </label>
          <input
            type="text"
            className="border-2 border-slate-200 rounded-lg"
            name="short"
            defaultValue={link.short}
            id="short"
          />
          <label htmlFor="description" className="flex flex-col gap-2">
            description
          </label>
          <textarea
            className="border-2 border-slate-200 rounded-lg"
            name="description"
            defaultValue={link.description}
            id="description"
          ></textarea>
          <button type="submit" className="bg-blue-500 p-5 rounded-lg">
            Send
          </button>
        </form>
      </Dialog>
      <Dialog
        open={openDelete}
        setOpen={setOpenDelete}
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        blurBack={true}
        blockClicksBehind={false}
      >
        <div className="flex flex-col gap-5">
          <p className="text-gray-500 text-pretty max-w-lg">
            Please confirm you want to delete this link.
          </p>
          <div className="flex gap-10">
            <button
              onClick={() => setOpenDelete(false)}
              className="border border-slate-200 p-2 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete();
                setOpenDelete(false);
              }}
              className="flex gap-2 rounded-xl p-2 bg-[#fff5f5] text-[#f93863] font-normal "
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
