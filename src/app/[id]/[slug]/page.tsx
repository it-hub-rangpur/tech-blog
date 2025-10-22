// app/[id]/[slug]/page.tsx
import React from "react";
import {
  Container,
  Typography,
  Box,
  Chip,
  Stack,
  Avatar,
  Divider,
  IconButton,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import {
  BookmarkBorder,
  Share,
  Favorite,
  Comment,
  ArrowBack,
} from "@mui/icons-material";
import Link from "next/link";
import GoogleAdContainer from "@/components/GoogleAdContainer";
import PostCard from "@/components/PostCard";
import { DevToArticle } from "@/types/devto.types";

const getArticleDetails = async (id: string, slug: string) => {
  const res = await fetch(`http://localhost:3000/api/${id}/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

const ArticleDetails = async ({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) => {
  const { id, slug } = await params;
  const response = await getArticleDetails(id, slug);
  const article = response?.data;
  const relatedArticles = (response?.relatedArticles as DevToArticle[]) ?? [];

  if (!article) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Article Not Found
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/"
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Navigation */}
      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBack />}
        sx={{
          mb: 4,
          color: "text.secondary",
          textTransform: "none",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        Back to Articles
      </Button>

      <Box
        sx={{ display: "grid", gridTemplateColumns: { md: "3fr 1fr" }, gap: 4 }}
      >
        {/* Main Content */}
        <Box>
          {/* Article Header */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 4,
              borderRadius: 4,
              background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack spacing={3}>
              {/* Category & Tags */}
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                <Chip
                  label={article.type_of}
                  color="primary"
                  variant="filled"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
                {article.tags?.slice(0, 4).map((tag: string) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "primary.light",
                      color: "primary.dark",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Stack>

              {/* Title */}
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.1,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  background:
                    "linear-gradient(45deg, #1976d2, #00bcd4, #ff4081)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  backgroundSize: "200% 200%",
                  mb: 2,
                }}
              >
                {article.title}
              </Typography>

              {/* Description */}
              <Typography
                variant="h5"
                component="p"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.4rem" },
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                {article.description}
              </Typography>

              {/* Author & Meta Info */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "flex-start", sm: "center" }}
                sx={{ pt: 3 }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ flexGrow: 1 }}
                >
                  <Avatar
                    src={article.user?.profile_image}
                    alt={article.user?.name}
                    sx={{
                      width: 60,
                      height: 60,
                      border: "3px solid",
                      borderColor: "primary.main",
                    }}
                  />
                  <Box>
                    <Typography variant="h6" component="h2" fontWeight={600}>
                      {article.user?.name}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={2}
                      color="text.secondary"
                      flexWrap="wrap"
                      gap={1}
                    >
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        📅 {formatDate(article.published_at)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        ⏱️ {article.reading_time_minutes} min read
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        ❤️ {article.public_reactions_count} reactions
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        💬 {article.comments_count} comments
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                {/* Action Buttons */}
                <Stack direction="row" spacing={1}>
                  <IconButton
                    color="primary"
                    sx={{
                      backgroundColor: "background.paper",
                      "&:hover": {
                        backgroundColor: "primary.light",
                        color: "white",
                      },
                    }}
                  >
                    <Favorite />
                  </IconButton>
                  <IconButton
                    color="primary"
                    sx={{
                      backgroundColor: "background.paper",
                      "&:hover": {
                        backgroundColor: "primary.light",
                        color: "white",
                      },
                    }}
                  >
                    <BookmarkBorder />
                  </IconButton>
                  <IconButton
                    color="primary"
                    sx={{
                      backgroundColor: "background.paper",
                      "&:hover": {
                        backgroundColor: "primary.light",
                        color: "white",
                      },
                    }}
                  >
                    <Share />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Paper>

          {/* Banner Ad - Top */}
          <Box sx={{ mb: 4 }}>
            <GoogleAdContainer
              adSlot="your-ad-slot-banner-top"
              format="banner"
              style={{
                width: "100%",
                height: "90px",
                borderRadius: 2,
                overflow: "hidden",
              }}
            />
          </Box>

          {/* Cover Image */}
          {article.cover_image && (
            <Box
              sx={{
                mb: 4,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <img
                src={article.cover_image}
                alt={article.title}
                style={{
                  width: "100%",
                  height: "450px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          )}

          {/* Article Content */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              mb: 4,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Box
              sx={{
                // Headings
                "& h1": {
                  mt: 6,
                  mb: 4,
                  fontWeight: 700,
                  fontSize: "2.5rem",
                  lineHeight: 1.2,
                  color: "text.primary",
                  paddingBottom: 2,
                  borderBottom: "2px solid",
                  borderColor: "primary.main",
                },
                "& h2": {
                  mt: 5,
                  mb: 3,
                  fontWeight: 600,
                  fontSize: "2rem",
                  lineHeight: 1.3,
                  color: "text.primary",
                },
                "& h3": {
                  mt: 4,
                  mb: 2,
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  lineHeight: 1.4,
                  color: "text.primary",
                },
                "& h4": {
                  mt: 3,
                  mb: 2,
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  lineHeight: 1.4,
                },

                // Paragraphs
                "& p": {
                  mb: 3,
                  fontSize: "1.125rem",
                  lineHeight: 1.8,
                  color: "text.primary",
                  textAlign: "justify",
                },

                // Lists
                "& ul, & ol": {
                  mb: 4,
                  pl: 4,
                  "& li": {
                    mb: 2,
                    fontSize: "1.125rem",
                    lineHeight: 1.7,
                    color: "text.primary",
                  },
                },

                // Blockquotes
                "& blockquote": {
                  borderLeft: "4px solid",
                  borderColor: "primary.main",
                  pl: 4,
                  py: 2,
                  mb: 4,
                  backgroundColor: "action.hover",
                  fontStyle: "italic",
                  borderRadius: "0 8px 8px 0",
                  mx: 0,
                  "& p": {
                    mb: 0,
                    color: "text.secondary",
                    fontSize: "1.1rem",
                  },
                },

                // Code blocks
                "& code": {
                  backgroundColor: "grey.900",
                  color: "#00ff88",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  border: "1px solid",
                  borderColor: "grey.700",
                },

                // Pre blocks
                "& pre": {
                  backgroundColor: "grey.900",
                  color: "#e0e0e0",
                  p: 3,
                  borderRadius: 2,
                  overflow: "auto",
                  mb: 4,
                  border: "1px solid",
                  borderColor: "grey.700",
                  fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                  "& code": {
                    backgroundColor: "transparent",
                    color: "inherit",
                    px: 0,
                    py: 0,
                    border: "none",
                    fontSize: "inherit",
                  },
                },

                // Links
                "& a": {
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 600,
                  borderBottom: "1px dotted",
                  borderColor: "primary.main",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    textDecoration: "none",
                    borderBottom: "2px solid",
                    backgroundColor: "primary.light",
                    color: "white",
                    padding: "0 2px",
                    borderRadius: "2px",
                  },
                },

                // Images in content
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 2,
                  my: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },

                // Tables
                "& table": {
                  width: "100%",
                  borderCollapse: "collapse",
                  mb: 4,
                  "& th, & td": {
                    border: "1px solid",
                    borderColor: "divider",
                    p: 1.5,
                    textAlign: "left",
                  },
                  "& th": {
                    backgroundColor: "action.hover",
                    fontWeight: 600,
                  },
                },
              }}
              dangerouslySetInnerHTML={{ __html: article.body_html }}
            />
          </Paper>

          {/* Banner Ad - Middle */}
          <Box sx={{ mb: 4 }}>
            <GoogleAdContainer
              adSlot="your-ad-slot-banner-middle"
              format="banner"
              style={{
                width: "100%",
                height: "90px",
                borderRadius: 2,
                overflow: "hidden",
              }}
            />
          </Box>

          {/* Article Footer */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Stack spacing={4}>
              {/* Tags Section */}
              <Box>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  📌 Article Tags
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {article.tags?.map((tag: string) => (
                    <Chip
                      key={tag}
                      label={tag}
                      variant="filled"
                      color="primary"
                      size="medium"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        py: 1,
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Divider />

              {/* Engagement Section */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  startIcon={<Favorite />}
                  color="error"
                  variant="outlined"
                  size="large"
                  sx={{
                    minWidth: 160,
                    fontWeight: 600,
                    py: 1.5,
                  }}
                >
                  {article.public_reactions_count} Reactions
                </Button>
                <Button
                  startIcon={<Comment />}
                  color="primary"
                  variant="outlined"
                  size="large"
                  sx={{
                    minWidth: 160,
                    fontWeight: 600,
                    py: 1.5,
                  }}
                >
                  {article.comments_count} Comments
                </Button>
                <Button
                  startIcon={<BookmarkBorder />}
                  color="primary"
                  variant="contained"
                  size="large"
                  sx={{
                    minWidth: 160,
                    fontWeight: 600,
                    py: 1.5,
                  }}
                >
                  Save Article
                </Button>
              </Stack>
            </Stack>
          </Paper>

          {/* Banner Ad - Bottom */}
          <Box sx={{ mb: 4 }}>
            <GoogleAdContainer
              adSlot="your-ad-slot-banner-bottom"
              format="banner"
              style={{
                width: "100%",
                height: "90px",
                borderRadius: 2,
                overflow: "hidden",
              }}
            />
          </Box>
        </Box>

        {/* Sidebar */}
        <Box>
          {/* Article Stats */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              fontWeight={600}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              📊 Article Stats
            </Typography>
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  Reading Time
                </Typography>
                <Chip
                  label={`${article.reading_time_minutes} min`}
                  size="small"
                  color="primary"
                  variant="filled"
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  Published
                </Typography>
                <Typography variant="body2" fontWeight="bold" textAlign="right">
                  {formatDate(article.published_at)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  Reactions
                </Typography>
                <Chip
                  label={article.public_reactions_count}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  Comments
                </Typography>
                <Chip
                  label={article.comments_count}
                  size="small"
                  color="info"
                  variant="outlined"
                />
              </Stack>
            </Stack>
          </Paper>

          {/* Sidebar Ad */}
          <Box sx={{ position: "sticky", top: 100 }}>
            <GoogleAdContainer
              adSlot="your-ad-slot-sidebar"
              format="rectangle"
              style={{
                width: "100%",
                height: "600px",
                borderRadius: 2,
                overflow: "hidden",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {relatedArticles?.map((article, i: number) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <PostCard post={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArticleDetails;
