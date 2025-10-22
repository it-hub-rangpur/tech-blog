// components/HeaderMinimal.tsx
"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  alpha,
  Container,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Link from "next/link";

interface HeaderProps {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

export default function HeaderMinimal({ mode, toggleTheme }: HeaderProps) {
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        background:
          mode === "dark" ? alpha("#0a0a0a", 0.9) : alpha("#ffffff", 0.9),
        backdropFilter: "blur(20px)",
        borderBottom:
          mode === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",
        py: 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 1, sm: 2 },
            minHeight: 60,
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            component={Link}
            href="/"
            sx={{
              textDecoration: "none",
              fontWeight: 800,
              background:
                mode === "dark"
                  ? "linear-gradient(45deg, #90caf9 30%, #bb86fc 90%)"
                  : "linear-gradient(45deg, #1976d2 30%, #7b1fa2 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            TechNews
          </Typography>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: mode === "dark" ? "grey.300" : "grey.700",
              p: 1.5,
              backgroundColor:
                mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
              border:
                mode === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor:
                  mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
              },
            }}
          >
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
