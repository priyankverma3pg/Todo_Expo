import React from "react";
import styled from "styled-components/native";
import {
  LinearGradient,
  LinearGradientPoint,
  LinearGradientProps,
} from "expo-linear-gradient";
import { ColorPallete } from "../constants/Colors";

interface GradientContainerProps extends Omit<LinearGradientProps, "colors"> {
  colors: string[]; // At least two colors are required
  borderRadius?: number; // Border radius
  padding?: string; // Padding value
  height?: number | string;
  width?: number | string;
  start?: LinearGradientPoint;
  end?: LinearGradientPoint;
}

const GradientContainerBase = styled(
  LinearGradient
).attrs<GradientContainerProps>((props) => ({
  colors: props.colors || ColorPallete.greenGradient, // Default gradient colors
  start: props.start || { x: 0, y: 0 }, // Default gradient start point
  end: props.end || { x: 1, y: 0 }, // Default gradient end point
}))<GradientContainerProps>`
  border-radius: ${(props) => props.borderRadius || 0}px;
  padding: ${(props) => props.padding || "0px"};
  height: ${(props) => props.height || 80}px;
  width: ${(props) => props.width || 120};
  justify-content: center;
  align-items: center;
`;

// Memoized component to optimize performance
export const GradientContainer = React.memo(
  GradientContainerBase,
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.colors) === JSON.stringify(nextProps.colors) &&
      JSON.stringify(prevProps.start) === JSON.stringify(nextProps.start) &&
      JSON.stringify(prevProps.end) === JSON.stringify(nextProps.end) &&
      prevProps.borderRadius === nextProps.borderRadius &&
      prevProps.height === nextProps.height &&
      prevProps.width === nextProps.width &&
      prevProps.padding === nextProps.padding
    );
  }
);
