"use client";

import { useState } from "react";

export function CreateLink() {
  const [clicked, setClicked] = useState(false);
  const [input, setInput] = useState({
    long: "",
    short: "",
    description: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3031/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(input),
    });
    const data = await res.json();
  };
  return (
    <>
      <button
        className="border bg-black text-white rounded-xl font-semibold p-2 px-5"
        onClick={() => setClicked(true)}
      >
        Create Link
      </button>
      {clicked ? (
        <div>
          <div className="fixed inset-0 z-50 bg-neutral-900/50  backdrop-blur-sm backdrop-filter "></div>
          <form
            className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg border-2 border-slate-100 p-10 flex flex-col justify-center gap-5 animate-fade-in"
            onSubmit={handleSubmit}
          >
            <div
              onClick={() => setClicked(false)}
              className="absolute p-2 border border-slate-100 rounded-full top-2 right-2"
            >
              X
            </div>
            <label className="flex flex-col gap-2">
              Long Link
              <input
                className="border-2 border-slate-200 rounded-lg "
                type="text"
                onChange={(e) => {
                  setInput((prev) => {
                    return {
                      ...prev,
                      long: e.target.value,
                    };
                  });
                }}
              />
            </label>
            <label className="flex flex-col gap-2">
              Short Link
              <input
                type="text"
                className="border-2 border-slate-200 rounded-lg"
                onChange={(e) => {
                  setInput((prev) => {
                    return {
                      ...prev,
                      short: e.target.value,
                    };
                  });
                }}
              />
            </label>
            <label className="flex flex-col gap-2">
              description
              <textarea
                placeholder="Optional"
                className="border-2 border-slate-200 rounded-lg"
              ></textarea>
            </label>
            <button className="bg-blue-500 p-5 rounded-lg">Send</button>
          </form>
        </div>
      ) : null}
    </>
  );
}
