"use client";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { Dialog } from "../../components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PasswordReset() {
  const [otpInput, setOtpInput] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOTP = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = Object.fromEntries(
      new FormData(form as HTMLFormElement).entries()
    );

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3031/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recovery_email: formData.email }),
      });
      const data = await res.json();
      if (data.success) {
        console.log("viene", data.recovery_email);
        setEmail(data.recovery_email);
        setOtpInput(true);
      }
      setLoading(false);
      toast.error(data.message);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const validateOTP = async (e: FormEvent) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    );
    const responseOtp = Object.values(formData).join("");
    console.log(responseOtp);
    console.log("email", email);
    console.log(
      JSON.stringify({ user_otp: responseOtp, recovery_email: email })
    );
    try {
      const res = await fetch("http://localhost:3031/api/user/validate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_otp: responseOtp, recovery_email: email }),
      });
      console.log("res", res);
      const data = await res.json();
      console.log(data);
      if (data.success) {
        router.push(`/passwordreset/${data.token}`);
      }
    } catch (error) {
      console.log("me cago en todo", error);
    }
  };
  return (
    <>
      <section className="px-5 relative h-screen w-screen flex items-center justify-center">
        <div className="p-10 border-2 border-slate-200 rounded-md">
          <form onSubmit={sendOTP} className="flex flex-col gap-4 ">
            <label className="font-bold text-xl">
              Please enter your account email
            </label>
            <input
              type="email"
              placeholder="youremail@example.com"
              name="email"
              required
              className="p-3 border border-slate-200 rounded-md"
            />
            <Link
              className="w-fit self-end underline decoration-1 rounded-md"
              href={"/login"}
            >
              Sign In
            </Link>
            <button className="bg-black p-4 rounded-md text-white">
              Send
              {loading && <span className="animate-pulse">...</span>}
            </button>
          </form>
        </div>
      </section>
      <div className="px-3">
        {" "}
        <Dialog
          className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  p-10"
          open={otpInput}
          setOpen={setOtpInput}
          blurBack={true}
          blockClicksBehind={true}
        >
          <p className="text-lg font-bold">Enter the code</p>
          <form className="flex flex-col gap-2" onSubmit={validateOTP}>
            <fieldset className="flex gap-2">
              <input
                name="first"
                className="w-20 h-20 text-center rounded-md border border-black"
              />
              <input
                name="second"
                className="w-20 h-20 text-center rounded-md border border-black"
              />
              <input
                name="third"
                className="w-20 h-20 text-center rounded-md border border-black"
              />
              <input
                name="fourth"
                className="w-20 h-20 text-center rounded-md border border-black"
              />
            </fieldset>
            <div className="flex gap-2">
              <button
                type="submit"
                className="p-2 rounded-md bg-black text-center text-white"
              >
                Send
              </button>
              {/* <button className="bg-blue-500 text-white p-2 rounded-md text-center">
                Resend code
              </button> */}
            </div>
          </form>
        </Dialog>
      </div>
    </>
  );
}
