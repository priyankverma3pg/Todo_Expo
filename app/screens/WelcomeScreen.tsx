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
import { Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { RootStackParamList } from "../types";
import { Container, Text, Button } from "../components/Container";

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
    // Navigate to Home screen with params
    navigation.navigate("TodoList");
  };

  return (
    <Container>
      <ImageSection>
        <Image
          style={{ height: 300, width: 300, alignSelf: "center" }}
          source={require("../../assets/images/todoIcon.png")}
        />
      </ImageSection>
      <BottomSection>
        <Text fontSize={28}>To-Do List </Text>
        <Text padding="10px 0px 20px">
          This productive tool is designed to help you better manage your day to
          day tasks conveniently!
        </Text>
        <Button width="80%" onPress={navigateToHome}>
          <Text fontSize={22}>Let's Go! 🤝</Text>
        </Button>
      </BottomSection>
    </Container>
  );
};

export default WelcomeScreen;

const ImageSection = styled.View`
  flex: 0.6;
  background-color: ${(props) => props.theme.background};
`;
const BottomSection = styled.View`
  flex: 0.4;
  background-color: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
`;
