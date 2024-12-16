import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import WelcomeScreen from "./../app/screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/types";

type NavigationMock = Partial<NativeStackNavigationProp<RootStackParamList, "Welcome">>;


describe("WelcomeScreen Component", () => {
  const mockNavigation: NavigationMock = {
    replace: jest.fn(),
  };

  const renderComponent = () =>
    render(
      <NavigationContainer>
        <WelcomeScreen navigation={mockNavigation as any} />
      </NavigationContainer>
    );

  it("renders the welcome screen with all components", () => {
    const { getByText, getByPlaceholderText } = renderComponent();

    expect(getByText("To-Do List")).toBeTruthy();
    expect(
      getByText(
        "This productive tool is designed to help you better manage your day to day tasks conveniently!"
      )
    ).toBeTruthy();
   
    expect(getByText("Let's Go! 🤝")).toBeTruthy();
  });


  it("navigates to TodoList on correct credentials", async () => {
    const { getByText } = renderComponent();

   
    fireEvent.press(getByText("Let's Go! 🤝"));

    await waitFor(() => {
      expect(mockNavigation.replace).toHaveBeenCalledWith("TodoList");
    });
  });
});
