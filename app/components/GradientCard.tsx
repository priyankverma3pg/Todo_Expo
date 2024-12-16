import React from "react";
import { GradientContainer } from "./GradientContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, View } from "react-native";
import { Text } from "./Container";
import { LinearGradientPoint } from "expo-linear-gradient";
import { ColorPallete } from "../constants/Colors";
import styled from "styled-components/native";

interface GradientCardProps {
  iconName: "fact-check" | "pending-actions";
  iconBackgoundColor: string;
  label: string;
  gradientColors: string[];
  gradientStart?: LinearGradientPoint;
  gradientEnd?: LinearGradientPoint;
  tapAction?: () => void;
}

const GradientCard: React.FC<GradientCardProps> = (props) => {
  const {
    iconName,
    iconBackgoundColor,
    label,
    gradientColors,
    gradientEnd,
    gradientStart,
    tapAction,
  } = props;
  return (
    <GradientContainer
      colors={gradientColors}
      height={80}
      width={"40%"}
      borderRadius={8}
      start={gradientStart}
      end={gradientEnd}
    >
      <TouchableOpacity onPress={tapAction}>
        <CardRowWrap>
          <IconBackground style={{ backgroundColor: iconBackgoundColor }}>
            <MaterialIcons
              name={iconName}
              color={ColorPallete.white}
              size={24}
            />
          </IconBackground>
          <View>
            <Text fontWeight={700}>{label}</Text>
            <Text fontSize={14} fontWeight={300}>
              View Tasks
            </Text>
          </View>
        </CardRowWrap>
      </TouchableOpacity>
    </GradientContainer>
  );
};

export default GradientCard;

const IconBackground = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50px;
`;

const CardRowWrap = styled.View`
  flex-direction: row;
  column-gap: 5%;
`;
