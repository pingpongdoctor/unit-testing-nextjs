import { rest } from "msw";

export const handlers = [
  //GET REQUEST
  rest.get("http://localhost:3000/api/users", async (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: "simon2" }]));
  }),
];
