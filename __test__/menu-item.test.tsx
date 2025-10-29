import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MenuItem from "../app/vendor/menu-item";

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

// Mock expo-image-picker
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({
      canceled: false,
      assets: [{ uri: "mock-image-uri" }],
    })
  ),
}));

// Mock react-native-dropdown-select-list
jest.mock("react-native-dropdown-select-list", () => ({
  MultipleSelectList: ({
    setSelected,
    data,
  }: {
    setSelected: (val: any) => void;
    data: Array<{ key: string; value: string }>;
  }) => {
    const { View, Text, TouchableOpacity } = require("react-native");
    return (
      <View testID="dropdown">
        <Text>Mock Dropdown</Text>
        <TouchableOpacity
          testID="dropdown-option"
          onPress={() => setSelected(["Traditional Bajan"])}
        >
          <Text>Traditional Bajan</Text>
        </TouchableOpacity>
      </View>
    );
  },
}));

// Mock BackButton component
jest.mock("@/components/BackButton", () => ({
  BackButton: ({ route }: { route: string }) => {
    const { View, Text } = require("react-native");
    return (
      <View testID="back-button">
        <Text>Back to {route}</Text>
      </View>
    );
  },
}));

// Mock fetch
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

// Create a mock store
const mockStore = configureStore({
  reducer: {
    vendor: (state = { vendorId: "test-vendor-123" }) => state,
  },
});

const renderWithProvider = (component: any) => {
  return render(<Provider store={mockStore}>{component}</Provider>);
};

describe("MenuItem Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = renderWithProvider(
      <MenuItem />
    );

    expect(getByText("Add Item")).toBeTruthy();
    expect(getByText("Upload Photo")).toBeTruthy();
    expect(getByPlaceholderText("Item Name")).toBeTruthy();
    expect(getByPlaceholderText("Price")).toBeTruthy();
    expect(getByText("Cuisine Type")).toBeTruthy();
  });

  test("updates item name input", () => {
    const { getByPlaceholderText } = renderWithProvider(<MenuItem />);

    const itemInput = getByPlaceholderText("Item Name");
    fireEvent.changeText(itemInput, "Fish Sandwich");

    expect(itemInput.props.value).toBe("Fish Sandwich");
  });

  test("updates price input", () => {
    const { getByPlaceholderText } = renderWithProvider(<MenuItem />);

    const priceInput = getByPlaceholderText("Price");
    fireEvent.changeText(priceInput, "15.99");

    expect(priceInput.props.value).toBe("15.99");
  });

  test("handles image upload", async () => {
    const { getByText } = renderWithProvider(<MenuItem />);

    const uploadButton = getByText("Upload Photo");
    fireEvent.press(uploadButton);

    await waitFor(() => {
      // Check if ImagePicker was called
      expect(
        require("expo-image-picker").launchImageLibraryAsync
      ).toHaveBeenCalled();
    });
  });

  test("submits form with correct data", async () => {
    const mockResponse = new Response(JSON.stringify({ id: "new-item-123" }), {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" },
    });
    mockFetch.mockResolvedValue(mockResponse);

    const { getByPlaceholderText, getByText } = renderWithProvider(
      <MenuItem />
    );

    // Fill form
    fireEvent.changeText(getByPlaceholderText("Item Name"), "Test Item");
    fireEvent.changeText(getByPlaceholderText("Price"), "10.50");

    // Submit form
    const submitButton = getByText("Add Item");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "http://10.0.0.167:3000/menu",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item: "Test Item",
            price: 10.5,
            image: "",
            category: [],
            vendor_id: "test-vendor-123",
          }),
        })
      );
    });
  });

  test("handles form submission error", async () => {
    const mockResponse = new Response("Server error", {
      status: 500,
      statusText: "Internal Server Error",
    });
    mockFetch.mockResolvedValue(mockResponse);

    // Mock alert
    global.alert = jest.fn();

    const { getByText } = renderWithProvider(<MenuItem />);

    const submitButton = getByText("Add Item");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Failed to submit menu item. Please try again"
      );
    });
  });

  test("trims whitespace from price input", () => {
    const { getByPlaceholderText } = renderWithProvider(<MenuItem />);

    const priceInput = getByPlaceholderText("Price");
    fireEvent.changeText(priceInput, "  15.99  ");

    expect(priceInput.props.value).toBe("15.99");
  });
});
