import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { ColorPalette } from "../theme/colors";

interface CalculatorButtonProps extends TouchableOpacityProps {
  label: string;
  onPress: () => void;
  type?: "number" | "operator" | "function" | "accent" | "secondary";
  theme: ColorPalette;
  flex?: number;
  style?: ViewStyle;
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onPress,
  type = "number",
  theme,
  flex = 1,
  style,
  ...rest
}) => {
  let backgroundColor = theme.surfaceVariant;
  let textColor = theme.textPrimary;

  if (type === "operator") {
    backgroundColor = theme.operator;
    textColor = "#FFFFFF";
  } else if (type === "accent") {
    backgroundColor = theme.accent;
    textColor = "#FFFFFF";
  } else if (type === "function") {
    backgroundColor = theme.function;
    textColor = theme.textPrimary;
  } else if (type === "secondary") {
    backgroundColor = theme.secondary;
    textColor = "#FFFFFF";
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, { backgroundColor, flex }, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      {...rest}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 64,
    margin: 4,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text: {
    fontSize: 22,
    fontWeight: "500",
  },
});
