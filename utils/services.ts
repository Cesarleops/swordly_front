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
