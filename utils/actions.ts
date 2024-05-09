import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");

  const res = await fetch(`http://localhost:3031/api/user`, {
    headers: {
      cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });
  const data = await res.json();

  return data;
};

export const getLinks = async (url: { order: string }) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");

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
