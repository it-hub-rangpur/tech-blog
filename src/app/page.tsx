// app/page.tsx
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Alert,
  Button,
  Card,
  Skeleton,
} from "@mui/material";
import {
  TrendingUp,
  Whatshot,
  NewReleases,
  Tag,
  ArrowForward,
} from "@mui/icons-material";
import HeroFeatured from "@/components/HeroFeatured";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import GoogleAdContainer from "@/components/GoogleAdContainer";
import SearchBox from "@/components/SearchBox";
import { getPosts } from "@/data/posts";
import { ErrorResponse, SuccessResponse } from "@/types/devto.types";

export type ISearchParams = {
  [key: string]: string | string[] | undefined;
};

interface HomeProps {
  searchParams: Promise<ISearchParams>;
}

// Popular tags data
const POPULAR_TAGS = [
  { name: "javascript", count: 2845, trending: true },
  { name: "webdev", count: 1923, trending: true },
  { name: "beginners", count: 1678 },
  { name: "programming", count: 1543 },
  { name: "tutorial", count: 1421 },
  { name: "react", count: 1389, trending: true },
  { name: "python", count: 1256 },
  { name: "productivity", count: 1123 },
  { name: "ai", count: 987, trending: true },
  { name: "devops", count: 876 },
];

const TRENDING_TAGS = POPULAR_TAGS.filter((tag) => tag.trending);

export default async function Home({ searchParams }: HomeProps) {
  const resolvedParams = await searchParams;

  // Parse search parameters with validation
  const page = Math.max(1, parseInt(resolvedParams?.page as string) || 1);
  const per_page = Math.min(
    50,
    Math.max(1, parseInt(resolvedParams?.size as string) || 12)
  );
  const search = resolvedParams?.search as string | undefined;
  const tag = resolvedParams?.tag as string | undefined;

  const params = { page, per_page, search, tag };

  // Fetch articles with error handling
  let articles: SuccessResponse | ErrorResponse;
  let isLoading = false;

  try {
    articles = await getArticles(params);
  } catch (error) {
    articles = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch articles",
      pagination: {
        current_page: page,
        per_page: per_page,
        has_next_page: false,
        has_previous_page: page > 1,
      },
    };
    isLoading = true;
  }

  const featuredPost = (articles as SuccessResponse)?.data[0];
  const showHero = page === 1 && !search && !tag;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* New Hero Section */}
      {showHero && (
        <Box
          sx={{
            background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
            borderBottom: `1px solid #e0e0e0`,
            py: { xs: 6, md: 10 },
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                      lineHeight: 1.2,
                      mb: 2,
                      background:
                        "linear-gradient(135deg, #0066cc 0%, #00bcd4 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Welcome to TechBlog
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 400,
                      mb: 3,
                      lineHeight: 1.6,
                    }}
                  >
                    Explore the latest trends in artificial intelligence, web
                    development, cloud computing, and more. Stay ahead of the
                    technology curve with in-depth articles and insights.
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: 300, md: 400 },
                    background: `linear-gradient(135deg, #0066cc20 0%, #00bcd420 100%)`,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px solid #e0e0e0`,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      background:
                        "radial-gradient(circle at 20% 50%, rgba(0, 102, 204, 0.1) 0%, transparent 50%)",
                      animation: "pulse 3s ease-in-out infinite",
                      "@keyframes pulse": {
                        "0%, 100%": { opacity: 0.5 },
                        "50%": { opacity: 1 },
                      },
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      textAlign: "center",
                      zIndex: 1,
                    }}
                  >
                    Technology Insights
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* Featured Hero Section (Original) */}
      {showHero && featuredPost && (
        <Box sx={{ py: 4 }}>
          <Container maxWidth="xl">
            <HeroFeatured post={featuredPost} />
          </Container>
        </Box>
      )}

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          {/* Sidebar - Left */}
          <Grid size={{ xs: 12, lg: 2.5 }}>
            <SidebarContent search={search} tag={tag} />
          </Grid>

          {/* Main Content - Center */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <MainContent
              articles={articles}
              params={params}
              search={search}
              tag={tag}
              isLoading={isLoading}
            />
          </Grid>

          {/* Sidebar - Right */}
          <Grid size={{ xs: 12, lg: 2.5 }}>
            <RightSidebar />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Sidebar Content Component
function SidebarContent({ search, tag }: { search?: string; tag?: string }) {
  return (
    <Stack spacing={3} sx={{ position: "sticky", top: 100 }}>
      {/* Search Box */}
      <SearchBox defaultValue={search} />

      {/* Trending Tags */}
      <Card
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <Whatshot sx={{ color: "error.main", fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
            Trending Tags
          </Typography>
        </Stack>
        <Stack spacing={1.5}>
          {TRENDING_TAGS.map((tagItem) => (
            <Button
              key={tagItem.name}
              href={`/?tag=${tagItem.name}`}
              component="a"
              startIcon={<TrendingUp sx={{ fontSize: 18 }} />}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: tag === tagItem.name ? "primary.main" : "text.primary",
                bgcolor: tag === tagItem.name ? "primary.50" : "transparent",
                borderRadius: 2,
                px: 2,
                py: 1,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "action.hover",
                  transform: "translateX(4px)",
                },
              }}
            >
              #{tagItem.name}
            </Button>
          ))}
        </Stack>
      </Card>

      {/* Google Ad */}
      <GoogleAdContainer
        adSlot="your-ad-slot-sidebar-1"
        format="rectangle"
        style={{ width: "100%", height: "250px", borderRadius: 12 }}
      />
    </Stack>
  );
}

// Main Content Component
function MainContent({
  articles,
  params,
  search,
  tag,
  isLoading,
}: {
  articles: SuccessResponse | ErrorResponse;
  params: any;
  search?: string;
  tag?: string;
  isLoading: boolean;
}) {
  return (
    <Stack spacing={4}>
      {/* Section Header */}
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
            background: "linear-gradient(135deg, #0066cc 0%, #00bcd4 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {search
            ? `Search: "${search}"`
            : tag
            ? `Tag: #${tag}`
            : "Latest Articles"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {search
            ? "Search results for your query"
            : tag
            ? `Articles tagged with #${tag}`
            : "Discover the newest content from our tech experts"}
        </Typography>
      </Box>

      {/* Error Alert */}
      {!articles.success && !isLoading && (
        <Alert
          severity="error"
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "error.light",
          }}
          action={
            <Button color="inherit" size="small" href="/">
              Retry
            </Button>
          }
        >
          {articles.error}
        </Alert>
      )}

      {/* Articles Grid */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : articles.success ? (
        <>
          {articles.data.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {articles.data.map((post, index) => (
                  <Grid key={post.id} size={{ xs: 12, sm: 6, lg: 6 }}>
                    <PostCard post={post} />

                    {/* Google Ad after every 4th article */}
                    {(index + 1) % 4 === 0 && (
                      <Box sx={{ mt: 3, mb: 2 }}>
                        <GoogleAdContainer
                          adSlot="your-ad-slot-infeed-1"
                          format="auto"
                          responsive={true}
                          style={{ borderRadius: 12 }}
                        />
                      </Box>
                    )}
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {articles.data.length > 0 && articles.pagination && (
                <Card
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Pagination
                      currentPage={articles.pagination.current_page}
                      hasNextPage={articles.pagination.has_next_page}
                      hasPreviousPage={articles.pagination.has_previous_page}
                      totalPages={
                        articles.pagination.estimated_remaining_pages
                          ? articles.pagination.current_page + 10
                          : undefined
                      }
                      searchParams={params}
                    />
                  </Box>
                </Card>
              )}
            </>
          ) : (
            // Empty State
            <Card
              sx={{
                p: 8,
                textAlign: "center",
                borderRadius: 3,
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              }}
            >
              <NewReleases
                sx={{
                  fontSize: 64,
                  color: "text.secondary",
                  mb: 3,
                  opacity: 0.7,
                }}
              />
              <Typography
                variant="h5"
                color="text.secondary"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                No articles found
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
              >
                {search
                  ? `No results found for "${search}". Try different keywords or browse all articles.`
                  : tag
                  ? `No articles found for tag "${tag}". Explore other popular tags.`
                  : "No articles available at the moment. Please check back later."}
              </Typography>
              <Button
                variant="contained"
                href="/"
                component="a"
                sx={{
                  background:
                    "linear-gradient(135deg, #0066cc 0%, #00bcd4 100%)",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Browse All Articles
              </Button>
            </Card>
          )}
        </>
      ) : null}
    </Stack>
  );
}

// Right Sidebar Component
function RightSidebar() {
  return (
    <Stack spacing={3} sx={{ position: "sticky", top: 100 }}>
      {/* Popular Tags */}
      <Card
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <Tag sx={{ color: "primary.main", fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
            Popular Tags
          </Typography>
        </Stack>
        <Stack spacing={1.5}>
          {POPULAR_TAGS.slice(0, 8).map((tagItem) => (
            <Button
              key={tagItem.name}
              href={`/?tag=${tagItem.name}`}
              component="a"
              fullWidth
              sx={{
                justifyContent: "space-between",
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "text.primary",
                borderRadius: 2,
                px: 2,
                py: 1.5,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "action.hover",
                  transform: "translateX(4px)",
                },
              }}
            >
              <span>#{tagItem.name}</span>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  bgcolor: "action.selected",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                {tagItem.count.toLocaleString()}
              </Typography>
            </Button>
          ))}
        </Stack>
      </Card>

      {/* Google Ad - Vertical */}
      <GoogleAdContainer
        adSlot="your-ad-slot-sidebar-2"
        format="vertical"
        style={{
          width: "100%",
          height: "600px",
          borderRadius: 12,
        }}
      />

      {/* Newsletter Signup */}
      <Card
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #0066cc 0%, #00bcd4 100%)",
          color: "white",
          borderRadius: 3,
          border: "none",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          Stay Updated
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}
        >
          Get the latest tech articles, tutorials, and industry insights
          delivered directly to your inbox.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "white",
            color: "primary.main",
            fontWeight: 700,
            py: 1.5,
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "grey.100",
              transform: "translateY(-2px)",
            },
          }}
        >
          Subscribe Now
        </Button>
      </Card>
    </Stack>
  );
}

// Loading Skeleton Component
function LoadingSkeleton() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, lg: 6 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            }}
          >
            <Stack spacing={2}>
              <Skeleton
                variant="rectangular"
                height={160}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton variant="text" height={32} />
              <Skeleton variant="text" height={24} width="80%" />
              <Stack direction="row" spacing={1} alignItems="center">
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="text" width={120} height={24} />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

// Enhanced getArticles function
const getArticles = async (params: {
  page: number;
  per_page: number;
  search?: string;
  tag?: string;
}): Promise<SuccessResponse | ErrorResponse> => {
  const { page, per_page, search, tag } = params;

  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/api/articles`);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("per_page", per_page.toString());

    if (search) {
      url.searchParams.set("search", search);
    }
    if (tag) {
      url.searchParams.set("tag", tag);
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["articles"],
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
