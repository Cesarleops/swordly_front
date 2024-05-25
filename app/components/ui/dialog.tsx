import { Dispatch, SetStateAction } from "react";

export const DialogOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/50  backdrop-blur-sm backdrop-filter "></div>
  );
};

export const BlockClicks = () => {
  return (
    <div className="fixed inset-0 z-50 bg-transparent pointer-events-auto"></div>
  );
};

export const Dialog = ({
  className,
  open,
  setOpen,
  children,
  blurBack,
  blockClicksBehind,
}: {
  className: string;
  blurBack: boolean;
  open: boolean;
  children: React.ReactNode;
  blockClicksBehind: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  if (!open) return null;

  return (
    <div>
      {blockClicksBehind && <BlockClicks />}
      {blurBack && <DialogOverlay />}
      <div
        className={`${className}  bg-white rounded-lg border-2 border-slate-100 p-10 flex flex-col justify-center gap-5 animate-fade-in`}
      >
        <div
          className="absolute top-2 right-2 p-1 z-10 border border-slate-200 rounded-full"
          onClick={() => {
            setOpen(false);
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
            className="lucide lucide-circle-x"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};
