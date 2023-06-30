//IMPORT THIS TO USE THE JEST-DOM ENVIRONMENT
import "@testing-library/jest-dom/extend-expect";
//WE NEED TO USE WHATWG-FETCH TO PROVIDE FETCH API POLYFILLS
//JEST IS INITIALY RUN IN NODE ENVIRONMENT AND COMMONJS MODULE
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
