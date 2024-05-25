"use client";
import { FormEvent, useState } from "react";
import { Dialog } from "../ui/dialog";
import Link from "next/link";
import { GroupSchema } from "@/utils/schemas";
import { toast } from "sonner";
import { InputError } from "../ui/error";
import { useRouter } from "next/navigation";
import { DropdownMenu } from "../ui/dropdown-menu";

export const CreateGroup = ({
  links,
}: {
  links: { short: string; id: number }[];
}) => {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>(false);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    const validateNewGroup = GroupSchema.safeParse(formJson);
    console.log(validateNewGroup);
    if (!validateNewGroup.success) {
      toast.error("Something went wrong creating your group");
      setErrors(validateNewGroup.error?.format());
      return;
    }

    const res = await fetch("http://localhost:3031/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: formJson.name,
        description: formJson.description,
        links: selectedLinks,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (!data.success) {
      setErrors(data.message);
      return;
    }

    toast(
      <div className="flex flex-col gap-2">
        <p>Your group was succesfully created</p>
        <button
          onClick={() => {
            router.replace("/dashboard/groups");
            router.refresh();
          }}
          className="text-green-500 p-0 self-start"
        >
          Click here to view group
        </button>
      </div>
    );
  };

  return (
    <div className="relative ">
      <div
        className="border bg-[#f2ebfa] rounded-xl p-2 flex gap-3 transition-colors duration-500 hover:border-[#8f5cd4]"
        onClick={() => {
          setOpen(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-[#8f5cd4]"
        >
          <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
          <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
          <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
          <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
        </svg>
        <p className="text-[#8f5cd4] font-bold hidden lg:block">Group</p>
      </div>
      <DropdownMenu
        open={open}
        setOpen={setOpen}
        className="absolute bg-[#f2ebfa] z-50  top-14 right-2 w-[200px]  sm:w-[300px] px-5 py-10 shadow-sm"
      >
        <p className="text-[#8f5cd4] text-2xl font-bold">Groups</p>
        <p className="text-gray-400 text-pretty">
          Group your links by project, business and more.
        </p>
        <ul className="flex flex-col gap-4">
          <li>
            <button
              onClick={() => setOpenGroup(true)}
              className="bg-[#f2ebfa] p-2 rounded-xl text-purple-600"
            >
              Create Group
            </button>
          </li>
          <li>
            <button
              className="bg-[#f2ebfa] p-2 rounded-xl text-purple-600"
              onClick={() => {
                router.replace("/dashboard/groups");
                router.refresh();
              }}
            >
              View Groups
            </button>
          </li>
        </ul>
      </DropdownMenu>

      <Dialog
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] "
        blurBack={true}
        blockClicksBehind={true}
        open={openGroup}
        setOpen={setOpenGroup}
      >
        <p className="text-2xl text-gray-500 font-bold">Create a new group</p>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-bold">
            Group name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Business"
            aria-describedby="name"
            className="border-2 border-slate-200 rounded-lg p-2"
          />
          {errors.name?._errors.length > 0 ? (
            <InputError id="name" errors={errors.name._errors} />
          ) : (
            ""
          )}
          <label htmlFor="describe" className="font-bold">
            Group Description
          </label>
          <textarea
            id="describe"
            name="description"
            placeholder="Track business urls."
            className="border-2 border-slate-200 rounded-lg p-2"
          />
          <div className="flex flex-col gap-4">
            <p className="mt-2 w-fit font-bold text-blue-500">
              Select the links you want to add to this group
            </p>
            <ul className="flex flex-wrap gap-4 max-w-xl">
              {links.length === 0 && (
                <p className="text-slate-400">
                  You haven&apos;t created links yet.
                </p>
              )}
              {links.map((li) => (
                <li
                  className={`border font-light border-slate-200 w-fit p-2 rounded-lg ${
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
                  /{li.short}
                </li>
              ))}
            </ul>
          </div>
          <button className="bg-black text-white p-4 rounded-lg w-1/2 self-center mt-4">
            Create
          </button>
        </form>
      </Dialog>
    </div>
  );
};
