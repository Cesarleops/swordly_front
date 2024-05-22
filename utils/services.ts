export async function createNewLink(input: any) {
  const res = await fetch("http://localhost:3031/api/links", {
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

export async function updateLink(id: number, formJson: { [key: string]: any }) {
  const updatedLink = await fetch("http://localhost:3031/api/links", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ id, ...formJson }),
  });
  console.log(updatedLink);
}

export async function deleteLink(id: string) {
  const del = await fetch("http://localhost:3031/api/links", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });
  console.log(del);
}
