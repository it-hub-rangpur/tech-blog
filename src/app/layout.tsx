// app/layout.tsx
"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useMemo } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import "./globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <html lang="en">
      <Script
        id="google-adsense"
        dangerouslySetInnerHTML={{
          __html: `
              (function() {
                var script = document.createElement('script');
               src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7862759836671677;
                script.async = true;
                script.crossOrigin = 'anonymous';
                document.head.appendChild(script);
              })();
            `,
        }}
      />

      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Header mode={mode} toggleTheme={toggleTheme} />
              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
