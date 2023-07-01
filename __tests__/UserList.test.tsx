import { render, screen, waitFor } from "@testing-library/react";
import UserList from "@/app/components/UserList";
import { server } from "@/mocks/server";
import { rest } from "msw"; //rest is like router, router.get, rest.get

describe("UserList - Rendering", () => {
  it("should render the name and id based on users array that is returned from an API call", async () => {
    render(<UserList />);
    //THERE SHOULD BE LOADING TEXT BEFORE THE DATA IS AVAILABLE
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
    //JEST USE THE MOCK API CALL INSTEAD OF USING THE REAL API CALL
    expect(
      await screen.findByText("name:simon6", {}, { timeout: 1200 })
    ).toBeInTheDocument();
    //THERE IS NO LOADING TEXT AFTER THE DATA IS AVAILABLE
    expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
  });

  it("should render new users based on new handler", async () => {
    //WE CAN CREATE A NEW HANDLER THAT WILL BE PRIORITIZED TO USE
    server.use(
      rest.get("http://localhost:3000/api/users", (req, res, ctx) => {
        return res(ctx.json([{ id: 3, name: "abc" }]));
      })
    );
    render(<UserList />);
    //USE WAITFOR WITH GETBY INSTEAD OF FINDBY
    //THE TOBEINDOCUMENT MATCHER IS PUT AFTER THE EXPECT METHOD
    await waitFor(
      () => {
        expect(screen.getByText("name:abc")).toBeInTheDocument();
      },
      { timeout: 1200 }
    );
  });
});
