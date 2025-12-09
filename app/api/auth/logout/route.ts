import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
  });

  return new NextResponse(null, { status: 204 });
}
