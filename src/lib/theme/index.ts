import { createTheme, PaletteMode } from "@mui/material";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#0066cc" : "#66b3ff",
        light: mode === "light" ? "#3385dd" : "#99ccff",
        dark: mode === "light" ? "#0052a3" : "#3366cc",
      },
      secondary: {
        main: mode === "light" ? "#00bcd4" : "#4dd0e1",
        light: mode === "light" ? "#4dd0e1" : "#80deea",
        dark: mode === "light" ? "#0097a7" : "#00acc1",
      },
      background: {
        default: mode === "light" ? "#f5f7fa" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "#1a1a1a" : "#e0e0e0",
        secondary: mode === "light" ? "#666666" : "#b0b0b0",
      },
      divider: mode === "light" ? "#e0e0e0" : "#333333",
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif',
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: "0.875rem",
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.6,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 8,
            transition: "all 0.3s ease",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === "light"
                ? "0 2px 8px rgba(0, 0, 0, 0.1)"
                : "0 2px 8px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow:
                mode === "light"
                  ? "0 8px 24px rgba(0, 0, 0, 0.15)"
                  : "0 8px 24px rgba(0, 0, 0, 0.5)",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          },
        },
      },
    },
  });
