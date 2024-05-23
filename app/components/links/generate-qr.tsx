/* eslint-disable @next/next/no-img-element */
import QRCode from "qrcode";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
export const GenerateQR = ({ short }: { short: string }) => {
  const [qr, setQr] = useState("");
  const [open, setOpen] = useState(false);

  const generateQRCode = async () => {
    try {
      let url = await QRCode.toDataURL(
        `http://localhost:3031/api/links/${short}`,
        {
          errorCorrectionLevel: "H",
        }
      );
      setQr(url);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadQR = async () => {
    try {
      const response = await fetch(qr);
      if (!response.ok) {
        throw new Error("Failed to fetch QR code image");
      }

      const imgURL = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = imgURL;
      link.download = `${short}_QR_CODE`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(imgURL);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };
  return (
    <>
      <button onClick={generateQRCode}>
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
          className="lucide lucide-qr-code"
        >
          <rect width="5" height="5" x="3" y="3" rx="1" />
          <rect width="5" height="5" x="16" y="3" rx="1" />
          <rect width="5" height="5" x="3" y="16" rx="1" />
          <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
          <path d="M21 21v.01" />
          <path d="M12 7v3a2 2 0 0 1-2 2H7" />
          <path d="M3 12h.01" />
          <path d="M12 3h.01" />
          <path d="M12 16v.01" />
          <path d="M16 12h1" />
          <path d="M21 12v.01" />
          <path d="M12 21v-1" />
        </svg>
      </button>
      <Dialog
        className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-10"
        open={open}
        setOpen={setOpen}
        blurBack={true}
        blockClicksBehind={true}
      >
        <div className="h-[200px] w-[200px] p-5 flex flex-col gap-4 items-center">
          <img src={qr} alt="qr-code" />
        </div>
        <button
          onClick={downloadQR}
          className="bg-black text-white p-2 rounded-md"
        >
          Download
        </button>
      </Dialog>
    </>
  );
};
