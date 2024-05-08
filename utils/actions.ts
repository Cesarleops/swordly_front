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

export const getLinks = async (id: string) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");
  const res = await fetch(`http://localhost:3031/api/links`, {
    headers: {
      cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });
  const data = await res.json();

  return data;
};
