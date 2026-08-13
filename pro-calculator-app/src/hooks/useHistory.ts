import { useEffect, useState } from "react";
import {
  clearHistoryStorage,
  loadHistoryStorage,
  saveHistoryStorage,
} from "../storage/historyStorage";
import { HistoryItem } from "../types/calculator";

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistoryStorage().then(setHistory);
  }, []);

  const addHistoryItem = (expression: string, result: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      expression,
      result,
      timestamp: Date.now(),
    };
    setHistory((prev) => {
      const updated = [newItem, ...prev];
      saveHistoryStorage(updated);
      return updated;
    });
  };

  const deleteHistoryItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveHistoryStorage(updated);
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    clearHistoryStorage();
  };

  return { history, addHistoryItem, deleteHistoryItem, clearHistory };
}
