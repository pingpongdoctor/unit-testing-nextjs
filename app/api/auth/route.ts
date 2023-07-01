import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const credentials = await req.json();
    console.log(credentials);
    return NextResponse.json({ message: "successful registration" });
  } catch (e) {
    console.log(e);
  }
}
