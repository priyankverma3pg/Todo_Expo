/**
 * GradientContainer component is a styled wrapper that applies a linear gradient background to its children.
 * It allows customization of gradient colors, border radius, padding, dimensions, and gradient direction.
 *
 * @component
 * @param {Object} props - The properties for the GradientContainer component.
 * @param {string[]} props.colors - An array of at least two colors to be used for the gradient background.
 * @param {number} [props.borderRadius] - The border radius of the container (optional).
 * @param {string} [props.padding] - The padding value for the container (optional).
 * @param {number|string} [props.height] - The height of the container (optional).
 * @param {number|string} [props.width] - The width of the container (optional).
 * @param {LinearGradientPoint} [props.start] - The starting point of the gradient (optional).
 * @param {LinearGradientPoint} [props.end] - The ending point of the gradient (optional).
 *
 * @returns {React.Component} The GradientContainer component.
 *
 * @example
 * <GradientContainer
 *   colors={['#FF5733', '#FFBD33']}
 *   borderRadius={10}
 *   padding="10px"
 *   height={100}
 *   width={200}
 *   start={{ x: 0, y: 0 }}
 *   end={{ x: 1, y: 1 }}
 * >
 *   <Text>Content goes here</Text>
 * </GradientContainer>
 */

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
