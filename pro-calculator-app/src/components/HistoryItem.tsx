import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ColorPalette } from "../theme/colors";
import { HistoryItem as HistoryItemType } from "../types/calculator";

interface HistoryItemProps {
  item: HistoryItemType;
  onSelect: (item: HistoryItemType) => void;
  onDelete: (id: string) => void;
  theme: ColorPalette;
}

export const HistoryItemComponent: React.FC<HistoryItemProps> = ({
  item,
  onSelect,
  onDelete,
  theme,
}) => {
  const formattedDate = new Date(item.timestamp).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
      onPress={() => onSelect(item)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Use history item ${item.expression} equals ${item.result}`}
    >
      <View style={styles.content}>
        <Text style={[styles.dateText, { color: theme.textMuted }]}>
          {formattedDate}
        </Text>
        <Text style={[styles.expressionText, { color: theme.textSecondary }]}>
          {item.expression}
        </Text>
        <Text style={[styles.resultText, { color: theme.textPrimary }]}>
          = {item.result}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
        accessibilityLabel="Delete item"
      >
        <Ionicons name="trash-outline" size={20} color={theme.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  content: {
    flex: 1,
  },
  dateText: {
    fontSize: 11,
    marginBottom: 4,
  },
  expressionText: {
    fontSize: 16,
    marginBottom: 2,
  },
  resultText: {
    fontSize: 22,
    fontWeight: "600",
  },
  deleteButton: {
    padding: 8,
  },
});
