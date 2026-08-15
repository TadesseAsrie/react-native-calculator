import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// Responsive scaling helper based on screen height
const isSmallDevice = height < 680;
const isTablet = width >= 768;

export const styles = StyleSheet.create({
  // Root Container
  safeArea: {
    flex: 1,
    backgroundColor: "#0F172A", // Deep slate dark background
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: isTablet ? 32 : 16,
    paddingBottom: Platform.OS === "ios" ? 24 : 16,
  },

  // Display Section
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingVertical: isSmallDevice ? 12 : 24,
    paddingHorizontal: 16,
  },
  historyText: {
    fontSize: isSmallDevice ? 16 : isTablet ? 24 : 18,
    color: "#94A3B8",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    textAlign: "right",
  },
  expressionText: {
    fontSize: isSmallDevice ? 36 : isTablet ? 64 : 48,
    fontWeight: "300",
    color: "#F8FAFC",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-light",
    textAlign: "right",
  },

  // Keypad Container
  keypadContainer: {
    width: "100%",
    gap: isSmallDevice ? 8 : 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: isSmallDevice ? 8 : 12,
  },

  // Button Base Styling
  button: {
    flex: 1,
    aspectRatio: 1, // Keeps buttons perfectly circular/square dynamically
    maxHeight: isTablet ? 90 : 78,
    borderRadius: isTablet ? 45 : 24,
    justifyContent: "center",
    alignItems: "center",
    // Elevation & Soft Glow Shadow
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  // Button Variants
  numberButton: {
    backgroundColor: "#1E293B", // Subtle slate card background
  },
  functionButton: {
    backgroundColor: "#334155", // Muted slate accent
  },
  operatorButton: {
    backgroundColor: "#3B82F6", // Vivid electric blue primary
  },
  equalsButton: {
    backgroundColor: "#10B981", // Emerald green highlight
  },
  clearButton: {
    backgroundColor: "#EF4444", // Coral red for destructive actions
  },

  // Button Typography
  buttonText: {
    fontSize: isSmallDevice ? 20 : isTablet ? 32 : 24,
    fontWeight: "600",
    color: "#F8FAFC",
  },
  operatorText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // Double Width Button (e.g., '0' key)
  doubleButton: {
    flex: 2.1,
    aspectRatio: 2.1,
    borderRadius: isTablet ? 45 : 24,
    alignItems: "flex-start",
    paddingLeft: isTablet ? 36 : 28,
  },
});
