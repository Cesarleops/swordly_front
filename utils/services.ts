import envConfig from "./constants";

export async function createNewLink(input: any) {
  const res = await fetch(`${envConfig.apiUrl}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });
  const data = await res.json();
  return data;
}

export async function updateLink(id: string, formJson: { [key: string]: any }) {
  const res = await fetch(`${envConfig.apiUrl}/links`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ id, ...formJson }),
  });
  const data = await res.json();
  return data;
}

export async function deleteLink(id: string) {
  const del = await fetch(`${envConfig.apiUrl}/links`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });
  console.log(del);
  const data = del.json();
  return data;
}

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

export const createNewGroup = async (formJson: any, selectedLinks: any) => {
  const res = await fetch(`${envConfig.apiUrl}/groups`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      name: formJson.name,
      description: formJson.description,
      links: selectedLinks,
    }),
  });
  const data = await res.json();
  return data;
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
