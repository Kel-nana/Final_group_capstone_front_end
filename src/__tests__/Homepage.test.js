import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Homepage from "../routes/Homepage";

describe("Hompage should render correctly", () => {
  it("test Homepage", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );
  });
});
