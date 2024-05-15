import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");

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
};

export const getLinks = async (url: { order: string; search: string }) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");
  console.log(url);
  if (url.search) {
    console.log(url.search);
    console.log("busca");
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
  }
  if (url.order) {
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
  }
  const res = await fetch(`http://localhost:3031/api/links`, {
    headers: {
      cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });
  const data = await res.json();

  return data;
};

export const getGroups = async () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");
  const response = await fetch("http://localhost:3031/api/groups", {
    headers: {
      cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });
  const data = await response.json();
  return data.rows;
};

export const getSingleGroup = async (id: string) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");
  console.log("i", id);
  const response = await fetch(`http://localhost:3031/api/groups/${id}`, {
    headers: {
      cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });
  const data = await response.json();
  console.log("grou", data);

  return data;
};
