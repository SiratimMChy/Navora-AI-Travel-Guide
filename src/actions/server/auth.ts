"use server";

export async function postUser(form: { name: string; email: string; password: string }) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
}
