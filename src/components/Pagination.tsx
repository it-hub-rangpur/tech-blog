// components/Pagination.tsx
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages?: number;
  searchParams: any;
}

export default function Pagination({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    if (page > 1) params.set("page", page.toString());
    if (searchParams.per_page !== 12)
      params.set("size", searchParams.per_page.toString());
    if (searchParams.search) params.set("search", searchParams.search);
    if (searchParams.tag) params.set("tag", searchParams.tag);

    return `/?${params.toString()}`;
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {/* First Page */}
      <Button
        variant="outlined"
        size="small"
        href={createPageUrl(1)}
        component="a"
        disabled={!hasPreviousPage}
        startIcon={<FirstPage />}
        sx={{ minWidth: "auto" }}
      >
        First
      </Button>

      {/* Previous Page */}
      <Button
        variant="outlined"
        size="small"
        href={createPageUrl(currentPage - 1)}
        component="a"
        disabled={!hasPreviousPage}
        startIcon={<ChevronLeft />}
      >
        Prev
      </Button>

      {/* Current Page Info */}
      <Box sx={{ px: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Page{" "}
          <Typography component="span" fontWeight="600">
            {currentPage}
          </Typography>
          {totalPages && ` of ${totalPages}`}
        </Typography>
      </Box>

      {/* Next Page */}
      <Button
        variant="outlined"
        size="small"
        href={createPageUrl(currentPage + 1)}
        component="a"
        disabled={!hasNextPage}
        endIcon={<ChevronRight />}
      >
        Next
      </Button>

      {/* Last Page (if known) */}
      {totalPages && (
        <Button
          variant="outlined"
          size="small"
          href={createPageUrl(totalPages)}
          component="a"
          disabled={!hasNextPage}
          endIcon={<LastPage />}
          sx={{ minWidth: "auto" }}
        >
          Last
        </Button>
      )}
    </Stack>
  );
}
