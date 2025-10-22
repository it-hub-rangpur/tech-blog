// app/layout.tsx
"use client";
import { Box } from "@mui/material";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      {children}
    </Box>
  );
}
