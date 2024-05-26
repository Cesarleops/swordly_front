import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Dialog } from "../ui/dialog";

export const EditGroup = ({ id, name, description, available_links }: any) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState<any[]>([]);
  const router = useRouter();

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    const updatedLink = await fetch("http://localhost:3031/api/groups", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ id, new_links: selectedLinks, ...formJson }),
      credentials: "include",
    });
    console.log(updatedLink);
    router.refresh();
  };

  return (
    <>
      <div className="flex gap-2 items-center bg-slate-100 p-2 rounded-md font-bold">
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
      </div>

      <Dialog
        open={openEdit}
        blurBack={true}
        setOpen={setOpenEdit}
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        blockClicksBehind={false}
      >
        <form onSubmit={handleEdit} className="flex flex-col  gap-2">
          <label htmlFor="name" className="font-bold">
            Group Name
          </label>
          <input
            className="border-2 border-slate-200 rounded-lg p-2"
            type="text"
            name="name"
            id="name"
            defaultValue={name}
          />

          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <textarea
            className="border-2 border-slate-200 rounded-lg p-2"
            name="description"
            defaultValue={description}
            id="description"
          ></textarea>

          <div>
            <p className="font-bold">Add more links</p>
            <div className="flex gap-2 flex-wrap">
              {available_links.length === 0 && (
                <p className="text-slate-400 mt-2">
                  There are not available links.
                </p>
              )}
              {available_links.map((li: any) => (
                <div
                  className={`flex gap-2 border-2 border-slate-200 w-fit p-2 rounded-lg ${
                    selectedLinks.map((li) => li.short).includes(li.short)
                      ? "bg-black text-white"
                      : ""
                  }`}
                  onClick={() => {
                    if (
                      selectedLinks.map((li) => li.short).includes(li.short)
                    ) {
                      setSelectedLinks(
                        selectedLinks.filter((l) => l !== li.short)
                      );
                      return;
                    }
                    setSelectedLinks((prev) => [...prev, li]);
                  }}
                  key={li.id}
                >
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
                    className="stroke-purple-500"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <p className="text-gray-500">/{li.short}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="p-5 rounded-lg bg-black text-white w-full font-bold"
          >
            Send
          </button>
        </form>
      </Dialog>
    </>
  );
};
