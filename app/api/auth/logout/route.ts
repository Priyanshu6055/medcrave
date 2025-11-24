import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
  });

  // Redirect to login
  return NextResponse.redirect("/login");
}
