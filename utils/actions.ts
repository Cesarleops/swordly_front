import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import envConfig from "./constants";

export const getUser = async () => {
  const cookieStore = cookies();
  console.log("front cookie", cookieStore);
  const cookie = cookieStore.get("auth_session");
  console.log("pido al usuario");
  try {
    const res = await fetch(`${envConfig.apiUrl}/user`, {
      headers: {
        cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });
    const data = await res.json();
    console.log("usuario", data);
    if (data.user === "Invalid User") {
      redirect("http://localhost:3000/login");
    }
    return data;
  } catch (error) {
    console.log("error yendo", error);
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
        `${envConfig.apiUrl}/links/search?text=${url.search}`,
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
        `${envConfig.apiUrl}/links/order?sort=${url.order}`,
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
    const res = await fetch(`${envConfig.apiUrl}/links`, {
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
    const response = await fetch(`${envConfig.apiUrl}/groups`, {
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
    const response = await fetch(`${envConfig.apiUrl}/groups/${id}`, {
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
