import React from "react";
import { StyleSheet, View } from "react-native";
import { ColorPalette } from "../theme/colors";
import { CalculatorButton } from "./CalculatorButton";

interface ScientificPanelProps {
  onAppend: (value: string) => void;
  theme: ColorPalette;
}

export const ScientificPanel: React.FC<ScientificPanelProps> = ({
  onAppend,
  theme,
}) => {
  const rows = [
    ["sin", "cos", "tan", "sin⁻¹", "cos⁻¹"],
    ["tan⁻¹", "sinh", "cosh", "tanh", "log"],
    ["ln", "log₂", "√", "∛", "^"],
    ["1/x", "x²", "x³", "10ˣ", "eˣ"],
    ["π", "e", "!", "mod", "abs"],
  ];

  const mapLabelToInput = (label: string): string => {
    switch (label) {
      case "x²":
        return "^2";
      case "x³":
        return "^3";
      case "sin":
        return "sin(";
      case "cos":
        return "cos(";
      case "tan":
        return "tan(";
      case "sin⁻¹":
        return "sin⁻¹(";
      case "cos⁻¹":
        return "cos⁻¹(";
      case "tan⁻¹":
        return "tan⁻¹(";
      case "sinh":
        return "sinh(";
      case "cosh":
        return "cosh(";
      case "tanh":
        return "tanh(";
      case "log":
        return "log(";
      case "ln":
        return "ln(";
      case "log₂":
        return "log₂(";
      case "√":
        return "√(";
      case "∛":
        return "∛(";
      case "1/x":
        return "1/x(";
      case "10ˣ":
        return "10ˣ(";
      case "eˣ":
        return "eˣ(";
      case "abs":
        return "abs(";
      case "mod":
        return " mod ";
      default:
        return label;
    }
  };

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={`sc-row-${rowIndex}`} style={styles.row}>
          {row.map((btnLabel) => (
            <CalculatorButton
              key={btnLabel}
              label={btnLabel}
              type="function"
              theme={theme}
              style={styles.sciBtn}
              onPress={() => onAppend(mapLabelToInput(btnLabel))}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: "row",
  },
  sciBtn: {
    height: 44,
    borderRadius: 8,
    margin: 2,
  },
});
