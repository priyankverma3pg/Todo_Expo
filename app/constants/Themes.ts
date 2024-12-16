import { ColorPallete } from "./Colors";

export const lightTheme = {
  background: ColorPallete.white,
  text: ColorPallete.black,
  buttonBackground: "#029816",
  buttonText: ColorPallete.white,
  border: ColorPallete.grey,
};

export const darkTheme = {
  background: ColorPallete.black,
  text: ColorPallete.white,
  buttonBackground: "#056619",
  buttonText: ColorPallete.white,
  border: "#444",
};

export type Theme = typeof lightTheme;
