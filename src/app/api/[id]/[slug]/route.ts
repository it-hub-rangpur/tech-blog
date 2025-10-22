// app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  DevToArticle,
  SuccessResponse,
  ErrorResponse,
} from "@/types/devto.types";

interface RouteParams {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<Response> {
  const pathName = await params;
  const id = pathName?.id;

  try {
    // // Build the Dev.to API URL
    let devToUrl = `https://dev.to/api/articles/${id}`;

    const res = await fetch(devToUrl, {
      headers: {
        "User-Agent": "Your News App (your-email@example.com)",
      },
    });

    if (!res.ok) {
      throw new Error(`Dev.to API error: ${res.status} ${res.statusText}`);
    }

    const articles = await res.json();
    const tags = articles?.tags;

    const relatedUrl = `https://dev.to/api/articles?page=1&per_page=3&tag=${tags?.join(
      "&tag="
    )}`;

    const relatedResponse = await fetch(relatedUrl, {
      headers: {
        "User-Agent": "Your News App (your-email@example.com)",
      },
    });

    const relatedArticles = await relatedResponse.json();

    const responseData = {
      success: true,
      data: articles,
      relatedArticles,
    };

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60", // Cache for 1 minute
      },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);

    const errorResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };

    return NextResponse.json(errorResponse, {
      status: 500,
    });
  }
}
