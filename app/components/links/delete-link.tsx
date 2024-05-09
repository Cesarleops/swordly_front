import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog } from "../ui/dialog";

export const DeleteLink = ({ id }: { id: number }) => {
  const [openDelete, setOpenDelete] = useState(false);
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
        className="stroke-red-400"
        onClick={() => setOpenDelete(true)}
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
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
