// components/AdsPlaceholder.tsx
import { Paper, Typography } from "@mui/material";

export default function AdsPlaceholder() {
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: "center",
        bgcolor: "grey.100",
        height: 250,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Advertisement
      </Typography>
    </Paper>
  );
}
