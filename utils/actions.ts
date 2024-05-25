import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const createNewGroup = async (formJson: any, selectedLinks: any) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");
  await fetch("http://localhost:3031/api/groups", {
    method: "POST",
    headers: {
      cookie: `${cookie?.name}=${cookie?.value}`,
    },
    credentials: "include",
    body: JSON.stringify({
      name: formJson.name,
      description: formJson.description,
      links: selectedLinks,
    }),
  });
};
export const getUser = async () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");
  console.log("pido al usuario");
  try {
    const res = await fetch(`http://localhost:3031/api/user`, {
      headers: {
        cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });
    const data = await res.json();
    if (data.user === "Invalid User") {
      redirect("http://localhost:3000/login");
    }
    return data;
  } catch (error) {
    redirect("http://localhost:3000/login");
  }
};

export const getLinks = async (url: { order: string; search: string }) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");
  console.log("im calling this function");
  if (url.search) {
    try {
      const res = await fetch(
        `http://localhost:3031/api/links/search?text=${url.search}`,
        {
          headers: {
            cookie: `${cookie?.name}=${cookie?.value}`,
          },
        }
      );
      const data = await res.json();
      console.log("ord", data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  if (url.order) {
    try {
      const res = await fetch(
        `http://localhost:3031/api/links/order?sort=${url.order}`,
        {
          headers: {
            cookie: `${cookie?.name}=${cookie?.value}`,
          },
        }
      );
      const data = await res.json();
      console.log("ord", data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const res = await fetch(`http://localhost:3031/api/links`, {
      headers: {
        cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getGroups = async () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");
  try {
    console.log("vengo aca");
    const response = await fetch("http://localhost:3031/api/groups", {
      headers: {
        cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });
    const data = await response.json();
    return data.groups;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleGroup = async (id: string) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");
  try {
    const response = await fetch(`http://localhost:3031/api/groups/${id}`, {
      headers: {
        cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });
    const data = await response.json();

    return data.group;
  } catch (error) {
    console.log(error);
  }
};
