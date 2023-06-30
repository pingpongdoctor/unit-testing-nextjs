import HomePage from "@/app/page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//BREAKING THINGS DOWN TO TEST BLOCKS
//TEST THE HOME PAGE

describe("home page", () => {
  //TEST BLOCK TO TEST RENDERING ELEMENTS
  describe("rendering testing", () => {
    //RENDER THE HOME PAGE FIRST
    beforeEach(() => {
      return render(<HomePage />);
    });

    //CHECK IF HOME PAGE TEXT IS RENDERED
    it("should render homepage text", () => {
      //GETBY THROW ERROR WHEN THERE IS NO TEXT OR MORE THAN ONE TEXT
      expect(screen.getByText("Home Page")).toBeInTheDocument();
    });

    //CHECK IF THERE IS A BUTTON
    //USE GETBYROLE AND USE THE NAME FIELD AS AN OPTION TO SPECIFY THE BUTTON NAME
    it("should render a button", () => {
      expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
    });

    //CHECK INPUT FIELD WITH GETBYLABELTEXT
    //SINCE INPUT FIELD DOES NOT HAVE THE CONTENT SO WE SHOULD FIND IT WITH LABELTEXT
    it("should render the input box with label", () => {
      expect(screen.getByLabelText(/Input Label/)).toBeInTheDocument();
    });

    //CHECK INPUT FIEND BY PLACE HOLDER
    it("should should render input box with placeholder", () => {
      expect(
        screen.getByPlaceholderText("This is a placeholder")
      ).toBeInTheDocument();
    });

    //CHECK IF A TEXT IS NOT IN THE DOCUMENT
    //USE QUERYBY TO CHECK NON EXISTENCE ELE AND GETBY TO CHECK EXISTENCE ELE
    it("should not render the text", () => {
      expect(
        screen.queryByText(/This is a hidden text/)
      ).not.toBeInTheDocument();
    });
  });

  //TEST BLOCK TO TEST USER BEHAVIOURS
  //NEED USEREVENT TO TEST WITH EVENTS
  describe("behavior testing", () => {
    beforeEach(() => {
      return render(<HomePage />);
    });
    //CHECK IF STATE IS SYNCHRONOUSLY CHANGED AFTER THE BUTTON IS CLICKED
    it("should render text when button is clicked", async () => {
      //CONFIRM THAT THE TEXT IS INITIALLY NOT AVAILABLE
      expect(
        screen.queryByText("Text that is rendered depending on state")
      ).not.toBeInTheDocument();
      //GET THE BUTTON
      const showTextButton = screen.getByRole("button", {
        name: "Button to show the text",
      });
      //USE USEEVENT TO FIRE THE CLICK EVENT WHEN THE BUTTON IS CLICKED
      //USEEVENT RETURN A PROMISE SO WE NEED TO USE AWAIT
      await userEvent.click(showTextButton);
      //CHECK IF THE TEXT IS IN DOCUMENT AFTER THE BUTTON IS CLICKED
      expect(
        screen.getByText("Text that is rendered depending on state")
      ).toBeInTheDocument();
    });

    //CHECK IF STATE IS ASYNCHRONOUSLY CHANGED AFTER THE BUTTON IS CLICKED
    //INSTEAD OF USING GETBY, WE CAN USE FINDBY WHICH RETURN A PROMISE WAITING FOR THE TEXT TO APPEAR
    //THIS IS HELPFUL SINCE SOMETIME WE NEED TO WAIT FOR DATA RETURNED FROM A FETCH REQUEST AND IT TAKE A WHILE
    // findBy methods are a combination of getBy* queries and waitFor. They accept the waitFor options as the last argument (i.e. await screen.findByText('text', queryOptions, waitForOptions))
    it("should render text after a while", async () => {
      //CONFIRM THAT THE TEXT IS INITIALLY NOT AVAILABLE
      expect(
        screen.queryByText("Text that is rendered depending on state")
      ).not.toBeInTheDocument();
      //GET THE BUTTON
      const showTextButton = screen.getByRole("button", {
        name: "Button to show the text after a while",
      });
      //USE USEEVENT TO FIRE THE CLICK EVENT WHEN THE BUTTON IS CLICKED
      //USEEVENT RETURN A PROMISE SO WE NEED TO USE AWAIT
      await userEvent.click(showTextButton);
      //CHECK IF THE TEXT IS IN DOCUMENT AFTER THE BUTTON IS CLICKED
      expect(
        await screen.findByText(
          "Text that is rendered after a while depending on state",
          {
            //GETBY OPTIONS
          },
          {
            //WAITFOR OPTIONS
            //SET THE WAITING TIME TO 1200
            timeout: 1200,
          }
        )
      ).toBeInTheDocument();
    });
  });
});
