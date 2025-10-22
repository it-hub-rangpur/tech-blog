// app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  DevToArticle,
  SuccessResponse,
  ErrorResponse,
} from "@/types/devto.types";

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const per_page = parseInt(searchParams.get("per_page") || "12");
  const tag = searchParams.get("tag");

  try {
    // Build the Dev.to API URL
    let devToUrl = `https://dev.to/api/articles?page=${page}&per_page=${per_page}`;
    if (tag) {
      devToUrl += `&tag=${encodeURIComponent(tag)}`;
    }

    const res = await fetch(devToUrl, {
      headers: {
        "User-Agent": "Your News App (your-email@example.com)",
      },
    });

    if (!res.ok) {
      throw new Error(`Dev.to API error: ${res.status} ${res.statusText}`);
    }

    const articles: DevToArticle[] = await res.json();

    // Calculate pagination info
    const hasNextPage = articles.length === per_page;

    // Estimate remaining pages (optional - can be removed if not needed)
    let estimated_remaining_pages: number | null = null;

    if (articles.length > 0 && page === 1) {
      try {
        // Quick check if page 50 has content to estimate total pages
        const farPageCheck = await fetch(
          `https://dev.to/api/articles?page=50&per_page=1`,
          { signal: AbortSignal.timeout(5000) } // 5 second timeout
        );
        if (farPageCheck.ok) {
          const farPageData: DevToArticle[] = await farPageCheck.json();
          estimated_remaining_pages =
            farPageData.length > 0 ? 50 - page : 10 - page;
        }
      } catch (farPageError) {
        console.warn("Failed to fetch far page estimate:", farPageError);
        // Use conservative estimate if far page check fails
        estimated_remaining_pages = 10 - page;
      }
    }

    const responseData: SuccessResponse = {
      success: true,
      data: articles,
      pagination: {
        current_page: page,
        per_page: per_page,
        has_next_page: hasNextPage,
        has_previous_page: page > 1,
        next_page: hasNextPage ? page + 1 : null,
        previous_page: page > 1 ? page - 1 : null,
        estimated_remaining_pages:
          estimated_remaining_pages !== null
            ? Math.max(0, estimated_remaining_pages)
            : null,
        total_articles_loaded: (page - 1) * per_page + articles.length,
      },
      meta: {
        source: "Dev.to",
        fetched_at: new Date().toISOString(),
      },
    };

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60", // Cache for 1 minute
      },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);

    const errorResponse: ErrorResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      pagination: {
        current_page: page,
        per_page: per_page,
        has_next_page: false,
        has_previous_page: page > 1,
      },
    };

    return NextResponse.json(errorResponse, {
      status: 500,
    });
  }
}
