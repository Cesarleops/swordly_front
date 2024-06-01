"use client";

import { EditGroup } from "./edit-group";
import { DeleteGroup } from "./delete-group";

export const GroupOptions = ({
  name,
  description,
  id,
  available_links,
}: any) => {
  return (
    <div>
      <ul className="flex gap-3 ">
        <li>
          <EditGroup
            id={id}
            name={name}
            description={description}
            available_links={available_links}
          />
        </li>
        <li>
          <DeleteGroup id={id} />
        </li>
      </ul>
    </div>
  );
};
