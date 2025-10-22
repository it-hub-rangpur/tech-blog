// components/PostCard.tsx
import { DevToArticle } from "@/types/devto.types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import { CalendarToday } from "@mui/icons-material";

interface PostCardProps {
  post: DevToArticle;
  loading?: boolean;
}

export default function PostCard({ post, loading = false }: PostCardProps) {
  // console.log(JSON.stringify(post, null, 2));

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.2s ease-in-out",
        }}
      >
        <Box sx={{ height: 140, bgcolor: "grey.100" }} />
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography
            variant="body2"
            sx={{ mb: 1, height: 16, bgcolor: "grey.100" }}
          />
          <Typography
            variant="h6"
            sx={{ mb: 1, height: 20, bgcolor: "grey.100" }}
          />
          <Typography
            variant="body2"
            sx={{ height: 40, bgcolor: "grey.100" }}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      component={Link}
      href={`/${post?.id}/${post?.slug}`}
      sx={{
        cursor: "pointer",
        textDecoration: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Cover Image */}
      {post?.cover_image || post?.social_image ? (
        <CardMedia
          component="img"
          height="140"
          image={post?.cover_image || post?.social_image}
          alt={post?.title}
          sx={{
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          sx={{
            height: 140,
            bgcolor: "grey.100",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "grey.400",
              fontWeight: "bold",
            }}
          >
            {post?.title?.charAt(0)}
          </Typography>
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        {/* Category Tags - Single line */}
        <Stack direction="row" spacing={0.5} sx={{ mb: 1.5 }}>
          {post?.tag_list?.slice(0, 2).map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="filled"
              sx={{
                fontWeight: 500,
                fontSize: "0.7rem",
                height: 20,
                bgcolor: "primary.50",
                color: "primary.main",
              }}
            />
          ))}
          {post.tag_list && post.tag_list.length > 2 && (
            <Chip
              label={`+${post.tag_list.length - 2}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.65rem", height: 20 }}
            />
          )}
        </Stack>

        {/* Title */}
        <Typography
          variant="subtitle1"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: "0.9rem",
            mb: 1,
          }}
        >
          {post.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.4,
            fontSize: "0.8rem",
            mb: 2,
          }}
        >
          {post.description}
        </Typography>

        {/* Author and Meta Information */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Avatar
            src={post.user?.profile_image}
            alt={post.user?.name}
            sx={{ width: 24, height: 24 }}
          >
            {post.user?.name?.charAt(0)}
          </Avatar>
          <Typography
            variant="caption"
            fontWeight="500"
            noWrap
            sx={{ flex: 1 }}
          >
            {post.user?.name}
          </Typography>
        </Stack>

        {/* Stats and Date */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            pt: 1.5,
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CalendarToday sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.published_at)}
            </Typography>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            {post.public_reactions_count} ♥
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
