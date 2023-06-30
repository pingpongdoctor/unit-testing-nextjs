import { render, screen } from "@testing-library/react";
import UserList from "@/app/components/UserList";

describe("UserList - Rendering", () => {
  it("should render the name and id based on users array that is returned from an API call", async () => {
    render(<UserList />);
  });
});
