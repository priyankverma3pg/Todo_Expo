/**
 * GradientCard component displays a card with a gradient background, an icon, and a label. 
 * It allows the user to tap on the card to trigger an optional action.
 *
 * @component
 * @param {Object} props - The properties for the GradientCard component.
 * @param {("fact-check" | "pending-actions")} props.iconName - The name of the icon to be displayed in the card.
 * @param {string} props.iconBackgoundColor - The background color of the icon's container.
 * @param {string} props.label - The label to be displayed on the card.
 * @param {string[]} props.gradientColors - An array of colors to be used in the gradient background of the card.
 * @param {LinearGradientPoint} [props.gradientStart] - The starting point of the gradient (optional).
 * @param {LinearGradientPoint} [props.gradientEnd] - The ending point of the gradient (optional).
 * @param {Function} [props.tapAction] - The function to be called when the card is tapped (optional).
 *
 * @example
 * <GradientCard
 *   iconName="fact-check"
 *   iconBackgoundColor="#FF5733"
 *   label="Task Overview"
 *   gradientColors={["#FF7F50", "#FFD700"]}
 *   gradientStart={{ x: 0, y: 0 }}
 *   gradientEnd={{ x: 1, y: 1 }}
 *   tapAction={handleCardTap}
 * />
 */

import React from "react";
import { GradientContainer } from "./GradientContainer";
import { ImageSourcePropType, TouchableOpacity, View } from "react-native";
import { StyledImage, Text } from "./CommonStyledComponents";
import { LinearGradientPoint } from "expo-linear-gradient";
import { ColorPallete } from "../constants/Colors";
import styled from "styled-components/native";

interface GradientCardProps {
  iconName: ImageSourcePropType;
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
            {/* <MaterialIcons
              name={iconName}
              color={ColorPallete.white}
              size={24}
            /> */}
             <StyledImage
                    source={iconName}
                    width={20}
                    height={20}
                    tintColor={ColorPallete.white}
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
