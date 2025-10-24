"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";

const Header: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          mode === "light"
            ? "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)"
            : "linear-gradient(135deg, #1e1e1e 0%, #121212 100%)",
        boxShadow:
          mode === "light"
            ? "0 2px 8px rgba(0, 0, 0, 0.1)"
            : "0 2px 8px rgba(0, 0, 0, 0.3)",
        borderBottom: `1px solid ${muiTheme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 !important",
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 1,
              textDecoration: "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #0066cc 0%, #00bcd4 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: { xs: "none", sm: "block" },
              }}
            >
              TechBlog
            </Typography>
          </Box>

          {/* Right Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{
                color: muiTheme.palette.text.primary,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: muiTheme.palette.action.hover,
                },
              }}
            >
              {mode === "light" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon sx={{ color: "white" }} />
              )}
            </IconButton>

            {isMobile && (
              <IconButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                size="small"
                sx={{
                  color: muiTheme.palette.text.primary,
                }}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
