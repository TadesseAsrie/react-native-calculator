import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryItem } from "../types/calculator";

const HISTORY_KEY = "@calculator_history_v1";
const MAX_HISTORY_ITEMS = 100;

export async function loadHistoryStorage(): Promise<HistoryItem[]> {
  try {
    const json = await AsyncStorage.getItem(HISTORY_KEY);
    if (json) {
      return JSON.parse(json);
    }
  } catch (e) {
    console.error("Failed to load history:", e);
  }
  return [];
}

export async function saveHistoryStorage(
  history: HistoryItem[],
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history.slice(0, MAX_HISTORY_ITEMS)),
    );
  } catch (e) {
    console.error("Failed to save history:", e);
  }
}

export async function clearHistoryStorage(): Promise<void> {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error("Failed to clear history:", e);
  }
}
