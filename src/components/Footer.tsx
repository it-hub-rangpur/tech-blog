// components/Footer.tsx
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { GitHub, Twitter, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "background.paper", py: 4, mt: "auto" }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 TechBlog. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mt: { xs: 2, sm: 0 } }}>
            <IconButton aria-label="GitHub" size="small">
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton aria-label="Twitter" size="small">
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton aria-label="LinkedIn" size="small">
              <LinkedIn fontSize="small" />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 2,
              mt: { xs: 2, sm: 0 },
            }}
          >
            <Link
              href="/privacy"
              variant="body2"
              color="text.secondary"
              underline="hover"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              variant="body2"
              color="text.secondary"
              underline="hover"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              variant="body2"
              color="text.secondary"
              underline="hover"
            >
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
