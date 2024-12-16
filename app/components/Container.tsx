/**
 * Contains a set of styled components used at
 * various places in the app
 */
import styled from "styled-components/native";
import { ColorPallete } from "../constants/Colors";

interface ButtonProps {
  backgroundColor?: string; // For custom background color
  padding?: string; // For custom padding
  borderRadius?: number; // For custom border radius
  alignItems?: string; // To customize alignment
  justifyContent?: string; // To customize content positioning
  margin?: string; // For margin
  width?: string; // For custom width
  disabled?: boolean; // Disable styling
}

interface InputProps {
  placeholderTextColor?: string;
  borderColor?: string;
}

export const Container = styled.SafeAreaView<{
  padding?: string;
  backgroundColor?: string;
}>`
  flex: 1;
  background-color: ${(props) =>
    props.backgroundColor || props.theme.background};
  padding: ${(props) => props.padding || 0};
`;

export const Text = styled.Text<{
  color?: string;
  fontSize?: number;
  fontWeight?: string | number;
  padding?: string; // top, right, bottom, left
  textAlign?: string;
}>`
  color: ${(props) => props.color || props.theme.text};
  font-size: ${(props) => props.fontSize || 16}px;
  padding: ${(props) => props.padding || 0};
  font-weight: ${(props) => props.fontWeight || 0};
  text-align: ${(props) => props.textAlign};
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${(props) =>
    props.disabled
      ? props.theme.buttonDisabledBackground || ColorPallete.white // Theme-based or fallback for disabled
      : props.backgroundColor ||
        props.theme.buttonBackground ||
        ColorPallete.actionBack};
  padding: ${(props) => props.padding || "10px 20px"};
  border-radius: ${(props) => props.borderRadius || 5}px;
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "center"};
  margin: ${(props) => props.margin || "0"};
  width: ${(props) => props.width || "auto"};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 16px;
  font-weight: bold;
`;

export const ChipsConatiner = styled.View<{
  height: number;
  width: number;
  backgroundColor: string;
}>`
height: ${(props) => props.height || 40}px
width: ${(props) => props.width || 40}px
background-color: ${(props) => props.backgroundColor || "blue"}

`;

export const StyledInput = styled.TextInput<InputProps>`
  background-color: ${(props) =>
    props.theme.inputBackground || ColorPallete.listCardBack};
  color: ${(props) => props.theme.text || ColorPallete.inputValueText};
  padding: 12px 15px;
  border: 1px solid
    ${(props) =>
      props.borderColor || props.theme.borderColor || ColorPallete.lightGrey};
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const StyledImage = styled.Image<{
  width: number;
  height: number;
  borderRadius?: number;
  tintColor?: string;
  marginBottom?: number;
  padding?: string;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-bottom: ${(props) => props.marginBottom};
  border-radius: ${(props) => props.borderRadius || 0}px;
  tint-color: ${(props) => props.tintColor};
  padding: ${(props) => props.padding || 0};
`;
