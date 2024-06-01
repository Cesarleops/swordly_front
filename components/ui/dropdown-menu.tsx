"use client";

import { useEffect, useRef } from "react";

export const DropdownMenu = ({
  open,
  setOpen,
  children,
  className,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className: string;
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    console.log("e", event.target);

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Element)
    ) {
      if (event.button !== 0 || event.target instanceof SVGElement) {
        return;
      }
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("pointerdown", handleClickOutside);
    } else {
      document.removeEventListener("pointerdown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div ref={dropdownRef}>
      {open && (
        <div
          className={`bg-white z-99 border-2 border-slate-200 rounded-lg ${className}`}
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
      )}
    </div>
  );
};
