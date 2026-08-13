import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Header } from "../src/components/Header";
import { HistoryItemComponent } from "../src/components/HistoryItem";
import { useHistory } from "../src/hooks/useHistory";
import { useSettings } from "../src/hooks/useSettings";
import { darkTheme, lightTheme } from "../src/theme/colors";

export default function HistoryScreen() {
  const router = useRouter();
  const systemColorScheme = useColorScheme();
  const { settings } = useSettings();
  const { history, deleteHistoryItem, clearHistory } = useHistory();

  const isDark =
    settings.theme === "dark" ||
    (settings.theme === "system" && systemColorScheme === "dark");
  const theme = isDark ? darkTheme : lightTheme;

  const handleClearAll = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all calculation history?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", style: "destructive", onPress: clearHistory },
      ],
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header title="History" theme={theme} showBack />

      {history.length > 0 ? (
        <>
          <View style={styles.topActions}>
            <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn}>
              <Text style={[styles.clearBtnText, { color: theme.error }]}>
                Clear History
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <HistoryItemComponent
                item={item}
                onSelect={(selected) => {
                  router.push({
                    pathname: "/",
                    params: {
                      expression: selected.expression,
                      result: selected.result,
                    },
                  });
                }}
                onDelete={deleteHistoryItem}
                theme={theme}
              />
            )}
            contentContainerStyle={styles.listContainer}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            No history available
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  clearBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  clearBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
  },
});
