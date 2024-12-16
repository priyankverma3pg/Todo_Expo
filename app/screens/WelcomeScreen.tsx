/**
 * WelcomeScreen component that displays a welcome message, an image, and a button
 * that navigates to the TodoList screen. This screen serves as an introduction to
 * the app and encourages users to start managing their tasks.
 *
 * @component
 * @example
 * <WelcomeScreen navigation={navigation} />
 *
 * @param {WelcomeScreenProps} props - The props for the WelcomeScreen component.
 * @param {WelcomeScreenNavigationProp} props.navigation - The navigation prop to navigate between screens.
 */

import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { RootStackParamList } from "../types";
import { Container, Text, Button } from "../components/CommonStyledComponents";
import { ColorPallete } from "../constants/Colors";

// Typing the navigation prop for the WelcomeScreen
type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const navigateToHome = () => {
    // Navigate to Home screen with params to block transitioning back to welcomescreen
    navigation.replace("TodoList");
  };

  return (
    <Container backgroundColor={ColorPallete.containerBackground}>
      <ImageSection
        resizeMode="cover"
        source={require("../../assets/images/welcomeImage.jpg")}
      >
        <BottomSection>
          <Text fontSize={28}>To-Do List </Text>
          <Text padding="10px 0px 20px" textAlign="center">
            This productive tool is designed to help you better manage your day
            to day tasks conveniently!
          </Text>
          <Button width="80%" onPress={navigateToHome}>
            <Text fontSize={22}>Let's Go! 🤝</Text>
          </Button>
        </BottomSection>
      </ImageSection>
    </Container>
  );
};

export default WelcomeScreen;

const ImageSection = styled.ImageBackground`
  flex: 1;
  justify-content: center;
`;
const BottomSection = styled.View`
  flex: 1;
  background-color: transparent;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
`;
