import { cookies, headers } from "next/headers";
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

export const resetPassword = async (formData: any) => {
  const res = await fetch(`${envConfig.apiUrl}/user/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recovery_email: formData.email }),
  });
  const data = await res.json();

  return data;
};

export const newPassword = async (formData: any, params: any) => {
  const res = await fetch(
    `${envConfig.apiUrl}/user/update-password/${params.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const data = await res.json();
  return data;
};

export const validatePasswordReset = async (
  responseOtp: string,
  email: string
) => {
  const res = await fetch(`${envConfig.apiUrl}/user/validate-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_otp: responseOtp, recovery_email: email }),
  });
  const data = await res.json();
  return data;
};

export const createNewGroup = async (formJson: any, selectedLinks: any) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("auth_session");
  const res = await fetch(`${envConfig.apiUrl}/groups`, {
    method: "POST",
    headers: {
      cookie: `${cookie?.name}=${cookie?.value}`,
    },
    body: JSON.stringify({
      name: formJson.name,
      description: formJson.description,
      links: selectedLinks,
    }),
  });
  const data = await res.json();
  return data;
};

export const deleteGroup = async (id: string) => {
  const res = await fetch(`${envConfig.apiUrl}/groups`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });
  const data = await res.json();
  return data;
};

export const updateGroup = async (
  id: string,
  selectedLinks: string[],
  formJson: any
) => {
  const res = await fetch(`${envConfig.apiUrl}/groups`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ id, new_links: selectedLinks, ...formJson }),
    credentials: "include",
  });
  const updatedLink = await res.json();
  return updatedLink;
};

export const userLogin = async (formJson: any) => {
  try {
    const res = await fetch(`${envConfig.apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formJson),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
