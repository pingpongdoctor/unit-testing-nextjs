import { rest } from "msw";

export const handlers = [
  //GET REQUEST
  rest.get("http://localhost:3000/api/users", (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: "simon6" }]));
  }),

  rest.post("http://localhost:3000/api/auth", async (req, res, ctx) => {
    const body = await req.json();
    // if (body.password === "wrong") {
    //   return res(ctx.status(400), ctx.json({ message: "error" }));
    // }
    return res(ctx.json({ message: "successful" }));
  }),
];
