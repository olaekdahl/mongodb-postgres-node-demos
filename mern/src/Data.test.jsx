import React from "react";
import { render, waitFor } from "@testing-library/react";
import Data from "./Data";

// Mock Axios
import axios from "axios";
jest.mock("axios");

describe("DataDisplay component", () => {
  it("renders loading message and then displays data", async () => {
    // Mock Axios response data
    axios.get.mockResolvedValueOnce({
      data: [{ _id: "1", name: "John", age: 30 }],
    });

    const { getByText } = render(<Data />);

    // Check if loading message is displayed
    expect(getByText("Loading data...")).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      // Check if data is displayed
      expect(getByText("Data Display")).toBeInTheDocument();
      expect(getByText("Name: John, Age: 30")).toBeInTheDocument();
    });
  });
});
