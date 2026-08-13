import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ColorPalette } from "../theme/colors";
import { AngleMode } from "../types/calculator";

interface CalculatorDisplayProps {
  expression: string;
  result: string | null;
  displayValue: string;
  errorMessage: string | null;
  angleMode: AngleMode;
  memoryValue: number;
  theme: ColorPalette;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  expression,
  result,
  displayValue,
  errorMessage,
  angleMode,
  memoryValue,
  theme,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {/* Indicators */}
      <View style={styles.indicatorRow}>
        <View style={styles.badgeContainer}>
          <Text
            style={[
              styles.badgeText,
              { color: theme.primary, borderColor: theme.primary },
            ]}
          >
            {angleMode}
          </Text>
          {memoryValue !== 0 && (
            <Text
              style={[
                styles.badgeText,
                {
                  color: theme.accent,
                  borderColor: theme.accent,
                  marginLeft: 6,
                },
              ]}
            >
              M
            </Text>
          )}
        </View>
      </View>

      {/* Expression Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.expressionText, { color: theme.textSecondary }]}>
          {expression || " "}
        </Text>
      </ScrollView>

      {/* Main Result or Error Display */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {errorMessage ? (
          <Text style={[styles.errorText, { color: theme.error }]}>
            {errorMessage}
          </Text>
        ) : (
          <Text style={[styles.resultText, { color: theme.textPrimary }]}>
            {displayValue}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "flex-end",
  },
  indicatorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  expressionText: {
    fontSize: 22,
    fontWeight: "400",
    textAlign: "right",
  },
  resultText: {
    fontSize: 48,
    fontWeight: "300",
    textAlign: "right",
  },
  errorText: {
    fontSize: 28,
    fontWeight: "500",
    textAlign: "right",
  },
});
