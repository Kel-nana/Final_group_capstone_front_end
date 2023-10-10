import { render } from "@testing-library/react"; // Change this line
import { BrowserRouter } from "react-router-dom";
import Sidebar from "../routes/Sidebar";

describe("Sidebar component", () => {
  test("Sidebar component should match the snapshot", () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
