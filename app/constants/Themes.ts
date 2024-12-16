/**
 * Contains the different color schemes 'light' and 'dark'
 * to be used according to the mode set
 */
import { ColorPallete } from "./Colors";

export const lightTheme = {
  background: ColorPallete.white,
  text: ColorPallete.black,
  buttonBackground: ColorPallete.buttonGreenBackground,
  buttonText: ColorPallete.white,
  border: ColorPallete.grey,
};

export const darkTheme = {
  background: ColorPallete.black,
  text: ColorPallete.white,
  buttonBackground: ColorPallete.greenGradient[1],
  buttonText: ColorPallete.white,
  border: ColorPallete.darkBorder,
};

export type Theme = typeof lightTheme;
