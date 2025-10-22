// app/page.tsx
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Alert,
  Button,
  Chip,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";
import HeroFeatured from "@/components/HeroFeatured";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import GoogleAdContainer from "@/components/GoogleAdContainer";
import SearchBox from "@/components/SearchBox"; // New component
import { getPosts } from "@/data/posts";
import { ErrorResponse, SuccessResponse } from "@/types/devto.types";
import { TrendingUp, Whatshot, NewReleases, Tag } from "@mui/icons-material";

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
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
        {/* Hero Section - Only show on first page without filters */}
        {showHero && (
          <Box sx={{ mb: 6 }}>
            <HeroFeatured post={featuredPost} />
          </Box>
        )}

        {/* Main Layout Grid */}
        <Grid container spacing={3}>
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

// Sidebar Content Component - Now server component only
function SidebarContent({ search, tag }: { search?: string; tag?: string }) {
  return (
    <Stack spacing={3} sx={{ position: "sticky", top: 100 }}>
      {/* Search Box - Using the new component */}
      <SearchBox defaultValue={search} />

      {/* Trending Tags */}
      <Card sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Whatshot sx={{ color: "error.main", fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
            Trending Tags
          </Typography>
        </Stack>
        <Stack spacing={1}>
          {TRENDING_TAGS.map((tagItem) => (
            <Button
              key={tagItem.name}
              href={`/?tag=${tagItem.name}`}
              component="a"
              startIcon={<TrendingUp sx={{ fontSize: 16 }} />}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: "0.875rem",
                color: "text.primary",
                bgcolor:
                  tag === tagItem.name ? "action.selected" : "transparent",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              #{tagItem.name}
            </Button>
          ))}
        </Stack>
      </Card>

      {/* Google Ad - Square */}
      <GoogleAdContainer
        adSlot="your-ad-slot-sidebar-1"
        format="rectangle"
        style={{ width: "100%", height: "250px" }}
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
    <Stack spacing={3}>
      {/* Page Header */}

      {/* Error Alert */}
      {!articles.success && !isLoading && (
        <Alert
          severity="error"
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
          {/* Articles List */}
          {articles.data.length > 0 ? (
            <Grid container spacing={2}>
              {articles.data.map((post, index) => (
                <Grid key={post.id} size={{ xs: 12, sm: 6 }}>
                  <PostCard post={post} />

                  {/* Google Ad after every 4th article */}
                  {(index + 1) % 4 === 0 && (
                    <Box sx={{ mt: 2, mb: 2 }}>
                      <GoogleAdContainer
                        adSlot="your-ad-slot-infeed-1"
                        format="auto"
                        responsive={true}
                      />
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          ) : (
            // Empty State
            <Card sx={{ p: 6, textAlign: "center" }}>
              <NewReleases
                sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
              />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No articles found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {search
                  ? `No results found for "${search}". Try different keywords.`
                  : tag
                  ? `No articles found for tag "${tag}".`
                  : "No articles available at the moment."}
              </Typography>
              <Button variant="contained" href="/" component="a">
                Browse All Articles
              </Button>
            </Card>
          )}

          {/* Pagination */}
          {articles.data.length > 0 && articles.pagination && (
            <Card sx={{ p: 3 }}>
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
      ) : null}
    </Stack>
  );
}

// Right Sidebar Component
function RightSidebar() {
  return (
    <Stack spacing={3} sx={{ position: "sticky", top: 100 }}>
      {/* Popular Tags */}
      <Card sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Tag sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
            Popular Tags
          </Typography>
        </Stack>
        <Stack spacing={1}>
          {POPULAR_TAGS.slice(0, 8).map((tagItem) => (
            <Button
              key={tagItem.name}
              href={`/?tag=${tagItem.name}`}
              component="a"
              fullWidth
              sx={{
                justifyContent: "space-between",
                textTransform: "none",
                fontSize: "0.875rem",
                color: "text.primary",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <span>#{tagItem.name}</span>
              <Typography variant="caption" color="text.secondary">
                {tagItem.count}
              </Typography>
            </Button>
          ))}
        </Stack>
      </Card>

      {/* Google Ad - Vertical */}
      <GoogleAdContainer
        adSlot="your-ad-slot-sidebar-2"
        format="vertical"
        style={{ width: "100%", height: "600px" }}
      />

      {/* Newsletter Signup */}
      <Card sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Stay Updated
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
          Get the latest articles delivered to your inbox.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "white",
            color: "primary.main",
            "&:hover": {
              bgcolor: "grey.100",
            },
          }}
        >
          Subscribe
        </Button>
      </Card>
    </Stack>
  );
}

// Loading Skeleton Component
function LoadingSkeleton() {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6 }}>
          <Card sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Skeleton variant="rectangular" height={140} />
              <Skeleton variant="text" height={32} />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="text" height={20} width="80%" />
              <Stack direction="row" spacing={1}>
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton variant="text" width={100} height={24} />
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
