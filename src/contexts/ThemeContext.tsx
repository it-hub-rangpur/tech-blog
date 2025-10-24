"use client";

import React, { useEffect, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  PaletteMode,
} from "@mui/material";
import { getTheme } from "@/lib/theme";
// import { getTheme } from "./theme";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: PaletteMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "light",
}) => {
  const [mode, setMode] = useState<PaletteMode>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as PaletteMode | null;
    if (savedTheme) {
      setMode(savedTheme);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  const theme = getTheme(mode);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

// Custom hook for using theme
export const useTheme = () => {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as PaletteMode | null;
    if (savedTheme) {
      setMode(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  return {
    mode,
    toggleTheme,
  };
};
