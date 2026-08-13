import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Header } from "../src/components/Header";
import { useHistory } from "../src/hooks/useHistory";
import { useSettings } from "../src/hooks/useSettings";
import { darkTheme, lightTheme } from "../src/theme/colors";
import { AngleMode, ThemeMode } from "../src/types/calculator";

export default function SettingsScreen() {
  const systemColorScheme = useColorScheme();
  const { settings, updateSettings } = useSettings();
  const { clearHistory } = useHistory();

  const isDark =
    settings.theme === "dark" ||
    (settings.theme === "system" && systemColorScheme === "dark");
  const theme = isDark ? darkTheme : lightTheme;

  const handleClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all stored history?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: clearHistory },
      ],
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header title="Settings" theme={theme} showBack />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Theme Setting */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Theme
          </Text>
          <View style={styles.optionGroup}>
            {(["system", "light", "dark"] as ThemeMode[]).map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.optionBtn,
                  settings.theme === t && { backgroundColor: theme.primary },
                ]}
                onPress={() => updateSettings({ theme: t })}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        settings.theme === t ? "#FFFFFF" : theme.textPrimary,
                    },
                  ]}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Angle Unit Setting */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Default Angle Unit
          </Text>
          <View style={styles.optionGroup}>
            {(["DEG", "RAD"] as AngleMode[]).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.optionBtn,
                  settings.angleMode === mode && {
                    backgroundColor: theme.primary,
                  },
                ]}
                onPress={() => updateSettings({ angleMode: mode })}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        settings.angleMode === mode
                          ? "#FFFFFF"
                          : theme.textPrimary,
                    },
                  ]}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Feedback Settings */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Feedback
          </Text>

          <View style={styles.rowItem}>
            <Text style={[styles.rowLabel, { color: theme.textPrimary }]}>
              Haptic Feedback
            </Text>
            <Switch
              value={settings.hapticsEnabled}
              onValueChange={(val) => updateSettings({ hapticsEnabled: val })}
              trackColor={{ false: theme.surfaceVariant, true: theme.primary }}
            />
          </View>
        </View>

        {/* Data Management */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Data Management
          </Text>
          <TouchableOpacity
            style={styles.actionRow}
            onPress={handleClearHistory}
          >
            <Text style={[styles.actionText, { color: theme.error }]}>
              Clear Calculation History
            </Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            About
          </Text>
          <View style={styles.rowItem}>
            <Text style={[styles.rowLabel, { color: theme.textPrimary }]}>
              Version
            </Text>
            <Text style={{ color: theme.textMuted }}>1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  optionGroup: {
    flexDirection: "row",
  },
  optionBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: 16,
  },
  actionRow: {
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
