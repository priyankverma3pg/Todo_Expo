/**
 * NotFound component is a flexible UI element to display when no content is found. It shows an image, title, and description 
 * with customizable content. The component adapts to different screen sizes using responsive design.
 *
 * @component
 * @param {Object} props - The properties for the NotFound component.
 * @param {string} props.title - The title text to be displayed under the image
 * @param {string} props.description - A description text providing more context to the user.
 * @param {any} props.imageSource - The image source to be displayed (can be an image URL or local image asset).
 *
 * @example
 * <NotFound
 *   title="No Data Available"
 *   description="We couldn't find any data matching your search. Please try again later."
 *   imageSource={require('../assets/images/no-data.png')}
 * />
 */

import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../contexts/ThemeProvider";
import { StyledImage, Text } from "./CommonStyledComponents";
import { ColorPallete } from "../constants/Colors";

interface NotFoundProps {
  title: string;
  description: string;
  imageSource: any; // Optional image prop for flexibility
}

const NotFound: React.FC<NotFoundProps> = ({
    title, description, imageSource
}) => {
  const { theme } = useTheme(); // Access theme theme 
  const { width } = useWindowDimensions(); // Responsive design

  return (
    <Container backgroundColor={theme.background}>
      {/* Image */}
      <StyledImage
        source={imageSource}
        width={width * 0.6}
        height={width * 0.6}
        resizeMode="contain"
        borderRadius={10}
      />

      {/* Title */}
      <Text color={theme.text} fontSize={24} fontWeight={700}>
        {title}
      </Text>

      {/* Description */}
      <Text textAlign="center" color={ColorPallete.grey} fontSize={16}>
        {description}
      </Text>
    </Container>
  );
};

// Styled Components
const Container = styled.View<{ backgroundColor: string }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: ${(props) => props.backgroundColor};
`;



export default NotFound;
