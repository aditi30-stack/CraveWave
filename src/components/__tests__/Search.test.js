import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import useRestaurantData from "../../Hooks/GetRestaurant";
import { Search } from "../Search";

jest.mock("../../Hooks/GetRestaurant");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("render Search Component", () => {
  test("Input Element is rendered", async () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(await screen.findByPlaceholderText("Search for restaurant")).toBeInTheDocument();
  });

  test("Button is rendered", async () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(await screen.findByTestId("search")).toBeInTheDocument();
  });

  test("when input has no value, no filtered data renders on screen", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("");
    expect(screen.queryByTestId("filter")).not.toBeInTheDocument();
  });

  test("when input has value, filtered data renders on screen and navigates to different page", () => {
    const mockData = {
      menu: [
        {
          info: {
            id: "1",
            name: "Pizza Hut",
            cloudinaryImageId: "123456",
          },
        },
      ],
    };
    useRestaurantData.mockReturnValueOnce(mockData);

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Pizza Hut" } });

    expect(inputElement.value).toBe("Pizza Hut");
    expect(screen.getByTestId("filter")).toBeInTheDocument();
    expect(screen.getByAltText("photo")).toBeInTheDocument();

    
    fireEvent.click(screen.getByTestId("filter"));
    expect(mockNavigate).toHaveBeenCalledWith("/restaurant/Pizza Hut/1");
  });
});
