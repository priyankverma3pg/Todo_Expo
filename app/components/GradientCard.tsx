import React from "react";
import { GradientContainer } from "./GradientContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Container";
import { LinearGradientPoint } from "expo-linear-gradient";
import { ColorPallete } from "../constants/Colors";

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
      <TouchableOpacity onPress={tapAction} style={styles.cardRowWrap}>
        <View
          style={[
            styles.iconBackground,
            { backgroundColor: iconBackgoundColor },
          ]}
        >
          <MaterialIcons name={iconName} color={ColorPallete.white} size={24} />
        </View>
        <View>
          <Text fontWeight={700}>{label}</Text>
          <Text fontSize={14} fontWeight={300}>
            View Tasks
          </Text>
        </View>
      </TouchableOpacity>
    </GradientContainer>
  );
};

export default GradientCard;
const styles = StyleSheet.create({
  iconBackground: {
    alignContent: "center",
    padding: 10,
    backgroundColor: "green",
    borderRadius: 50,
  },
  cardRowWrap: {
    flexDirection: "row",
    columnGap: "5%",
  },
});
