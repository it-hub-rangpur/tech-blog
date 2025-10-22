// components/HeroFeatured.tsx
import { DevToArticle } from "@/types/devto.types";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import { CalendarToday, Schedule, ArrowForward } from "@mui/icons-material";

interface HeroFeaturedProps {
  post: DevToArticle;
}

export default function HeroFeatured({ post }: HeroFeaturedProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDisplayName = () => {
    return post.organization?.name || post.user.name;
  };

  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        background: post.cover_image
          ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${post.cover_image})`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: { xs: "300px", sm: "350px", md: "400px" },
        display: "flex",
        alignItems: "flex-end",
        color: "white",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 3, sm: 4 },
          width: "100%",
          background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
        }}
      >
        <Box sx={{ maxWidth: "800px" }}>
          {/* Featured Badge and Tags */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Chip
              label="Featured"
              size="small"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
            {post.tag_list?.slice(0, 2).map((tag: string) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                variant="outlined"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </Stack>

          {/* Title */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              mb: 2,
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.4,
              mb: 3,
              opacity: 0.9,
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            {truncateDescription(post.description)}
          </Typography>

          {/* Meta Information and CTA */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
          >
            {/* Author and Date */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={post.user?.profile_image}
                alt={getDisplayName()}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {getDisplayName()}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarToday sx={{ fontSize: 14, opacity: 0.8 }} />
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {formatDate(post.published_at)}
                  </Typography>
                  <Schedule sx={{ fontSize: 14, opacity: 0.8 }} />
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {post.reading_time_minutes}m read
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            {/* Action Button */}
            <Button
              variant="contained"
              size="medium"
              component={Link}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                fontWeight: 600,
                minWidth: "140px",
                "&:hover": {
                  bgcolor: "grey.100",
                  transform: "translateX(4px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Read Article
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
