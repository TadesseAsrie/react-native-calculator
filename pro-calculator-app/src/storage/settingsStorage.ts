import AsyncStorage from "@react-native-async-storage/async-storage";
import { CalculatorSettings } from "../types/calculator";

const SETTINGS_KEY = "@calculator_settings_v1";

export const DEFAULT_SETTINGS: CalculatorSettings = {
  theme: "system",
  angleMode: "DEG",
  calculatorMode: "standard",
  hapticsEnabled: true,
  soundEnabled: false,
};

export async function loadSettingsStorage(): Promise<CalculatorSettings> {
  try {
    const json = await AsyncStorage.getItem(SETTINGS_KEY);
    if (json) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(json) };
    }
  } catch (e) {
    console.error("Failed to load settings:", e);
  }
  return DEFAULT_SETTINGS;
}

export async function saveSettingsStorage(
  settings: CalculatorSettings,
): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings:", e);
  }
}
