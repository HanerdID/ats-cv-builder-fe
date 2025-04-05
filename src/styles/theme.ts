// src/styles/theme.ts
export const theme = {
  colors: {
    primary: {
      light: "#6366F1", // Indigo yang lebih cerah
      main: "#4F46E5", // Indigo utama
      dark: "#4338CA", // Indigo yang lebih gelap
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#10B981", // Emerald yang lebih cerah
      main: "#059669", // Emerald utama
      dark: "#047857", // Emerald yang lebih gelap
      contrastText: "#FFFFFF",
    },
    accent: {
      light: "#F59E0B", // Amber yang lebih cerah
      main: "#D97706", // Amber utama
      dark: "#B45309", // Amber yang lebih gelap
      contrastText: "#FFFFFF",
    },
    neutral: {
      100: "#F9FAFB",
      200: "#F3F4F6",
      300: "#E5E7EB",
      400: "#D1D5DB",
      500: "#9CA3AF",
      600: "#6B7280",
      700: "#4B5563",
      800: "#374151",
      900: "#1F2937",
    },
  },
  typography: {
    fontFamily: {
      sans: "Inter, system-ui, sans-serif",
      display: "Lexend, system-ui, sans-serif",
    },
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  borderRadius: {
    sm: "0.125rem",
    default: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
};
