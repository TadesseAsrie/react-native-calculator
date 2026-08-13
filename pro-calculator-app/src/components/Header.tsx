import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react";
import { ColorPalette } from "../theme/colors";

interface HeaderProps {
  title: string;
  theme: ColorPalette;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  theme,
  showBack = false,
}) => {
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background, borderColor: theme.border },
      ]}
    >
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
            accessibilityLabel="Go Back"
            accessibilityRole="button"
          >
            <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/settings")}
            accessibilityLabel="Open Settings"
            accessibilityRole="button"
          >
            <Ionicons
              name="settings-outline"
              size={22}
              color={theme.textPrimary}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.title, { color: theme.textPrimary }]}>{title}</Text>

      <View style={styles.rightContainer}>
        {!showBack && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/history")}
            accessibilityLabel="Open History"
            accessibilityRole="button"
          >
            <Ionicons name="time-outline" size={24} color={theme.textPrimary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftContainer: {
    width: 40,
    alignItems: "flex-start",
  },
  rightContainer: {
    width: 40,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  iconButton: {
    padding: 8,
  },
});
