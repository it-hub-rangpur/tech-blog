// utils/generateArticleMapping.js
const fs = require("fs");
const path = require("path");

/**
 * Fetches all articles from Dev.to API and creates a mapping JSON file
 */
async function generateArticleMapping(maxPages = 10, perPage = 30) {
  const articleMapping = {};
  let totalArticles = 0;

  console.log("🚀 Starting article mapping generation...");
  console.log(
    `📝 Configuration: ${maxPages} pages, ${perPage} articles per page\n`
  );

  try {
    for (let currentPage = 1; currentPage <= maxPages; currentPage++) {
      process.stdout.write(`📄 Fetching page ${currentPage}/${maxPages}... `);

      const apiUrl = `https://dev.to/api/articles?page=${currentPage}&per_page=${perPage}`;

      const response = await fetch(apiUrl, {
        headers: {
          "User-Agent": "TechNews App (your-email@example.com)",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const articles = await response.json();

      if (articles.length === 0) {
        console.log("No more articles found.");
        break;
      }

      // Add articles to mapping
      articles.forEach((article) => {
        articleMapping[article.id] = article.slug;
        totalArticles++;
      });

      console.log(`✅ ${articles.length} articles added`);

      // If we got fewer articles than requested, we've reached the end
      if (articles.length < perPage) {
        console.log("✅ Reached the end of available articles.");
        break;
      }

      // Rate limiting - be respectful to the API
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Save to file
    const publicDir = path.join(process.cwd(), "public");
    const mappingFilePath = path.join(publicDir, "article-mapping.json");

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write the mapping file
    fs.writeFileSync(
      mappingFilePath,
      JSON.stringify(articleMapping, null, 2),
      "utf-8"
    );

    console.log(`\n🎉 Successfully generated article mapping!`);
    console.log(`📊 Total articles mapped: ${totalArticles}`);
    console.log(`📁 File saved to: ${mappingFilePath}`);

    return {
      success: true,
      totalArticles,
      filePath: mappingFilePath,
    };
  } catch (error) {
    console.error("\n❌ Error generating article mapping:", error);
    throw error;
  }
}

/**
 * Loads the article mapping from the generated JSON file
 */
function loadArticleMapping() {
  try {
    const mappingFilePath = path.join(
      process.cwd(),
      "public",
      "article-mapping.json"
    );

    if (!fs.existsSync(mappingFilePath)) {
      console.warn(
        "⚠️ Article mapping file not found. Run generateArticleMapping first."
      );
      return {};
    }

    const fileContent = fs.readFileSync(mappingFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("❌ Error loading article mapping:", error);
    return {};
  }
}

/**
 * Gets the slug for a given article ID
 */
function getSlugById(id) {
  const mapping = loadArticleMapping();
  return mapping[id] || null;
}

/**
 * Gets the ID for a given article slug
 */
function getIdBySlug(slug) {
  const mapping = loadArticleMapping();
  for (const [id, articleSlug] of Object.entries(mapping)) {
    if (articleSlug === slug) {
      return parseInt(id);
    }
  }
  return null;
}

// If this file is run directly, execute the function
if (require.main === module) {
  // Get command line arguments
  const args = process.argv.slice(2);
  const pages = parseInt(
    args.find((arg) => arg.startsWith("--pages="))?.split("=")[1] || "10"
  );
  const perPage = parseInt(
    args.find((arg) => arg.startsWith("--per-page="))?.split("=")[1] || "30"
  );

  generateArticleMapping(pages, perPage)
    .then((result) => {
      console.log(`\n✅ Mapping generation completed successfully!`);
      console.log(`📊 Total articles: ${result.totalArticles}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Mapping generation failed:", error);
      process.exit(1);
    });
}

// Export functions for use in other files
module.exports = {
  generateArticleMapping,
  loadArticleMapping,
  getSlugById,
  getIdBySlug,
};
