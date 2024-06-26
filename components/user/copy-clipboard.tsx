import envConfig from "@/utils/constants";
import { toast } from "sonner";

export const CopyClipboard = ({ short }: { short: string }) => {
  const copyToClipboard = async () => {
    console.log(navigator);
    console.log(navigator.clipboard);
    try {
      await navigator.clipboard.writeText(`${envConfig.apiUrl}/links/${short}`);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <button onClick={copyToClipboard}>
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
        className="lucide lucide-clipboard"
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </svg>
    </button>
  );
};
