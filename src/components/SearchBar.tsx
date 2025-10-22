// components/SearchBar.tsx
import { Paper, InputBase, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search articles..."
        inputProps={{ "aria-label": "search articles" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  );
}
