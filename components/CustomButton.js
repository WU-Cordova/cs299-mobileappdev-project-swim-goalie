import { Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../config/theme";

export default function CustomButton({ label, onPress}) {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: activeColors.secondary,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 16,
          fontFamily:"Cochin",
          color: activeColors.onSecondary,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
