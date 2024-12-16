import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../contexts/ThemeProvider";
import { StyledImage, Text } from "./Container";
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
