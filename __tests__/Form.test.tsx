import Form from "@/app/components/Form";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Form - Behavior - Rendering", () => {
  it("should have no error text after logging in with a correct password", async () => {
    render(<Form />);

    expect(screen.getByText("null")).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/Username/);
    const passwordInput = screen.getByLabelText(/Password/);

    expect(nameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const buttonEle = screen.getByRole("button", { name: "Login" });

    expect(buttonEle).toBeDisabled();

    await userEvent.type(nameInput, "simon");
    await userEvent.type(passwordInput, "password");

    expect(nameInput).toHaveValue("simon");
    expect(passwordInput).toHaveValue("password");

    expect(buttonEle).toBeEnabled();

    //USE TESTID TO GET THE FORM SINCE THERE IS NO SPECIFIC ROLE FOR FORM
    const formEle = screen.getByTestId("formEle");

    //USE FIREEVENT TO SUBMIT A FORM SINCE USEREVENT DOES NOT HAVE THE SUBMIT METHOD
    await fireEvent.submit(formEle);

    expect(await screen.findByText("Successfull")).toBeInTheDocument();
  });
});
