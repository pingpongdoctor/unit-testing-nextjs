import UserProfile from "@/app/components/UserProfile";
import { getByText, render, screen } from "@testing-library/react";

describe("UserProfile", () => {
  describe("UserProfile Rendering", () => {
    //WHEN ISVIP TO TRUE
    it("should have text vip when the isVip is true", () => {
      render(<UserProfile name="simon" age={18} isVip={true} />);
      expect(screen.getByText("name:simon")).toBeInTheDocument();
      expect(screen.getByText("age:18")).toBeInTheDocument();
      expect(screen.getByText("isVip:vip")).toBeInTheDocument();
      expect(screen.queryByText("isVip:no vip")).not.toBeInTheDocument();
    });

    //WHEN ISVIP IS FALSE
    it("should have text vip when the isVip is false", () => {
      render(<UserProfile name="simon" age={18} isVip={false} />);
      expect(screen.getByText("name:simon")).toBeInTheDocument();
      expect(screen.getByText("age:18")).toBeInTheDocument();
      expect(screen.getByText("isVip:no vip")).toBeInTheDocument();
      expect(screen.queryByText("isVip:vip")).not.toBeInTheDocument();
    });

    //WHEN THE NAME LENGHTH IS GREATER THAN 30 LETTER
    it("should show only the first 30 letters of the name if the name length is longer than 30 letters", () => {
      const name =
        "mynameissimon mynameissimon mynameissimon mynameissimon mynameissimon";
      render(<UserProfile name={name} age={18} isVip={true} />);

      //GET THE TEXT THAT INCLUDES NAME
      const text = screen.getByText(/name:/);
      //CHECK IF THE THEXT HAS THE LENGTH 33 AND END WITH THREE DOT
      expect(text.textContent).toEqual(
        `name:${name.split("").slice(0, 30).join("").concat("...")}`
      );
    });

    //WHEN THE NAME LENGHTH IS LESS THAN 30 LETTER
    it("should show the whole name without three dots if the name length is longer than 30 letters", () => {
      const name = "mynameissimon";
      render(<UserProfile name={name} age={18} isVip={true} />);

      //GET THE TEXT THAT INCLUDES NAME
      const text = screen.queryByText(/name:/);
      //CHECK IF THE THEXT HAS THE LENGTH 33 AND END WITH THREE DOT
      //.* MACTCHES ANY CHARACTERS AND \.\.\. MATCHES THREE DOTS
      expect(text).not.toHaveTextContent(/.*\.\.\./);
    });
  });
});
