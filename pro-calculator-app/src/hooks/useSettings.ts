import { useEffect, useState } from "react";
import {
  DEFAULT_SETTINGS,
  loadSettingsStorage,
  saveSettingsStorage,
} from "../storage/settingsStorage";
import { CalculatorSettings } from "../types/calculator";

export function useSettings() {
  const [settings, setSettings] =
    useState<CalculatorSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadSettingsStorage().then((data) => {
      setSettings(data);
      setIsLoaded(true);
    });
  }, []);

  const updateSettings = (newSettings: Partial<CalculatorSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettingsStorage(updated);
      return updated;
    });
  };

  return { settings, updateSettings, isLoaded };
}
