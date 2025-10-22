// components/SearchBox.tsx
import {
  TextField,
  Card,
  Typography,
  InputAdornment,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBoxProps {
  defaultValue?: string;
}

export default function SearchBox({ defaultValue }: SearchBoxProps) {
  return (
    <Card sx={{ p: 2 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 600, fontSize: "1rem" }}
      >
        Search Articles
      </Typography>
      <form action="/" method="GET">
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            name="search"
            placeholder="Search articles..."
            defaultValue={defaultValue}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <button
            type="submit"
            style={{
              display: "none",
            }}
          >
            Search
          </button>
        </Box>
      </form>
    </Card>
  );
}
