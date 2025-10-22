// app/api/[id]/[slug]/route.ts
import { NextRequest } from "next/server";

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
  try {
    const { id, slug } = await params;

    // Use environment variable for base URL
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Fetch from DEV.to API
    const devToResponse = await fetch(`${baseUrl}/api/articles/${id}`, {
      headers: {
        "User-Agent": "TechBlog App (your-email@example.com)",
        Accept: "application/vnd.forem.api-v1+json",
      },
    });

    if (!devToResponse.ok) {
      return Response.json({ error: "Article not found" }, { status: 404 });
    }

    const article = await devToResponse.json();

    // Get related articles
    const tags = article.tags || [];
    let relatedArticles = [];

    const relatedUrl = `${baseUrl}/api/articles?tag=${tags.join(
      "&tag="
    )}&page=1&per_page=3`;

    const relatedArticlesResponse = await fetch(relatedUrl, {
      headers: {
        "User-Agent": "TechBlog App (your-email@example.com)",
        Accept: "application/vnd.forem.api-v1+json",
      },
    });
    if (relatedArticlesResponse.ok) {
      relatedArticles = await relatedArticlesResponse.json();
    }

    return Response.json({
      data: article,
      relatedArticles,
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
