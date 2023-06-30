import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";
import { server } from "./mocks/server";

//SETUP MOCK API
beforeAll(() => {
  //LISTEN TO THE SERVER AT THE BEGINNING
  server.listen();
});

afterEach(() => {
  //RESET THE HANLDERS AFTER EACH TEST
  server.resetHandlers();
});

//CLOSE THE SERVER AT THE END
afterAll(() => {
  server.close();
});
