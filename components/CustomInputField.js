import React, { useContext } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

export default function CustomInputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  let isPassword= inputType == "password";
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
        <TextInput
          placeholderTextColor={activeColors.text}
          placeholder={label}
          keyboardAppearance={theme.mode}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: activeColors.tint }}
          secureTextEntry={isPassword}
        />
       
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: activeColors.accent, fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
