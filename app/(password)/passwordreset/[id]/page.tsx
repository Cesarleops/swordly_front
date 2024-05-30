"use client";

import { newPassword } from "@/utils/actions";
import { useParams } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function NewPassword(props: any) {
  const params = useParams();
  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    );
    console.log(formData);
    if (formData.newPassword === formData.confirm) {
      const data = await newPassword(formData, params);
      if (data.success) {
        toast.success("your password was updated");
      } else {
        toast.error(data.message);
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
