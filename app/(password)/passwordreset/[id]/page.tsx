"use client";

import { useParams } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function NewPassword(props: any) {
  console.log(props);
  const params = useParams();
  console.log(params);
  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    if (formData.newPassword === formData.confirm) {
      console.log("go");
      console.log(params.id);
      const res = await fetch(
        `http://localhost:3031/api/user/update-password/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("your password was updated");
      }
    }
  };
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleUpdatePassword}
        className="border-2 border-slate-200 p-10 flex flex-col gap-4"
      >
        <input
          className="p-2 border border-slate-200 rounded-md"
          type="password"
          name="newPassword"
          placeholder="New Password"
        />
        <input
          className="p-2 border border-slate-200 rounded-md"
          type="password"
          name="confirm"
          placeholder="Confirm Password"
        />
        <button className="bg-black text-white p-2 rounded-md">
          Change Password
        </button>
      </form>
    </section>
  );
}
