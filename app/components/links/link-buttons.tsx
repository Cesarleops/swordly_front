"use client";

import { CopyClipboard } from "../user/copy-clipboard";
import { GenerateQR } from "./generate-qr";
import { DeleteLink } from "./delete-link";
import { EditLink } from "./edit-link";

export const LinkButtons = ({ id, link }: { id: number; link: any }) => {
  return (
    <>
      <nav className="absolute top-2 right-2 flex items-center gap-3">
        <GenerateQR short={link.short} />
        <CopyClipboard short={link.short} />
        <span className="flex ">
          <EditLink id={id} link={link} />
        </span>
        <span className="">
          <DeleteLink id={id} />
        </span>
      </nav>
    </>
  );
};
