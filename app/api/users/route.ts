import { NextResponse } from "next/server";

export function GET(req: Request, res: NextResponse) {
  return NextResponse.json([
    { id: 1, name: "simon" },
    { id: 2, name: "simon2" },
  ]);
}
