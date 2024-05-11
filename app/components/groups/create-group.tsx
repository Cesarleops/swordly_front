"use client";

import { FormEvent, useState } from "react";
import { Dialog } from "../ui/dialog";

export const CreateGroup = () => {
  const [open, setOpen] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState<any[]>([]);
  const handleSubmit = (e: FormEvent) => {
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    e.preventDefault();
    fetch("http://localhost:3031/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: formJson.name,
        description: formJson.description,
        links: selectedLinks,
      }),
    });
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Create group</button>

      <Dialog
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] "
        blurBack={true}
        blockClicksBehind={true}
        open={open}
        setOpen={setOpen}
      >
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="name">Group name</label>
          <input
            id="name"
            name="name"
            className="border-2 border-slate-200 rounded-lg p-2"
          />
          <label htmlFor="describe">Brief description</label>
          <label htmlFor="links" />
          <input
            id="describe"
            name="description"
            className="border-2 border-slate-200 rounded-lg p-2"
          />
          <div className="flex flex-col gap-4">
            <p className=" p-2 w-fit ">Add links</p>
            <ul className="flex flex-wrap gap-4">
              {/* {links.map((li) => (
                <li
                  className={`border-2 border-slate-200 w-fit p-2 rounded-lg ${
                    selectedLinks.map((li) => li.short).includes(li.short)
                      ? "bg-green-200"
                      : ""
                  }`}
                  onClick={() => {
                    if (selectedLinks.includes(li.short)) {
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
              ))} */}
            </ul>
          </div>
          <button>ENVIAR</button>
        </form>
      </Dialog>
    </>
  );
};
