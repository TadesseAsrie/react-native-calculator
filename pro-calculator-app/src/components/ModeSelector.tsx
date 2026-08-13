import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ColorPalette } from "../theme/colors";
import { AngleMode, CalculatorMode } from "../types/calculator";

interface ModeSelectorProps {
  mode: CalculatorMode;
  angleMode: AngleMode;
  onModeChange: (mode: CalculatorMode) => void;
  onAngleModeChange: (angleMode: AngleMode) => void;
  theme: ColorPalette;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mode,
  angleMode,
  onModeChange,
  onAngleModeChange,
  theme,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {/* Standard vs Scientific Toggle */}
      <View
        style={[styles.tabGroup, { backgroundColor: theme.surfaceVariant }]}
      >
        <TouchableOpacity
          style={[
            styles.tab,
            mode === "standard" && { backgroundColor: theme.primary },
          ]}
          onPress={() => onModeChange("standard")}
        >
          <Text
            style={[
              styles.tabText,
              { color: mode === "standard" ? "#FFFFFF" : theme.textSecondary },
            ]}
          >
            Standard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            mode === "scientific" && { backgroundColor: theme.primary },
          ]}
          onPress={() => onModeChange("scientific")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: mode === "scientific" ? "#FFFFFF" : theme.textSecondary,
              },
            ]}
          >
            Scientific
          </Text>
        </TouchableOpacity>
      </View>

      {/* DEG vs RAD Toggle */}
      <TouchableOpacity
        style={[
          styles.angleBtn,
          { borderColor: theme.border, backgroundColor: theme.surfaceVariant },
        ]}
        onPress={() => onAngleModeChange(angleMode === "DEG" ? "RAD" : "DEG")}
      >
        <Text style={[styles.angleText, { color: theme.textPrimary }]}>
          {angleMode}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabGroup: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 2,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
  },
  angleBtn: {
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  angleText: {
    fontSize: 13,
    fontWeight: "700",
  },
});
