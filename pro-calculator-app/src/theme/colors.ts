export interface ColorPalette {
  background: string;
  surface: string;
  surfaceVariant: string;
  primary: string;
  secondary: string;
  accent: string;
  operator: string;
  function: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  error: string;
  success: string;
  activeIndicator: string;
}

export const lightTheme: ColorPalette = {
  background: "#F8F9FA",
  surface: "#FFFFFF",
  surfaceVariant: "#E9ECEF",
  primary: "#0066FF",
  secondary: "#6C757D",
  accent: "#FF9500",
  operator: "#0066FF",
  function: "#E2E8F0",
  textPrimary: "#1A1D20",
  textSecondary: "#495057",
  textMuted: "#A0AEC0",
  border: "#E2E8F0",
  error: "#E53E3E",
  success: "#38A169",
  activeIndicator: "#0066FF",
};

export const darkTheme: ColorPalette = {
  background: "#0F172A",
  surface: "#1E293B",
  surfaceVariant: "#334155",
  primary: "#3B82F6",
  secondary: "#64748B",
  accent: "#F59E0B",
  operator: "#3B82F6",
  function: "#334155",
  textPrimary: "#F8FAFC",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  border: "#334155",
  error: "#EF4444",
  success: "#10B981",
  activeIndicator: "#3B82F6",
};
