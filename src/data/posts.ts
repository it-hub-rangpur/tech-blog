// data/posts.ts
import { IBlogPost } from "@/types";

export const posts: IBlogPost[] = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    slug: "getting-started-with-nextjs-14",
    description: "Learn the basics of Next.js 14 and its new features",
    content:
      "<p>Next.js 14 introduces several exciting features including the stable App Router...</p><p>Server Components allow for better performance and smaller bundle sizes.</p>",
    author: "Sarah Chen",
    date: "2024-01-15",
    image: "/images/nextjs-banner.jpg",
    category: "Frontend",
    tags: ["Next.js", "React", "JavaScript"],
  },
  {
    id: 2,
    title: "Mastering TypeScript Generics",
    slug: "mastering-typescript-generics",
    description: "Deep dive into TypeScript generics with practical examples",
    content:
      "<p>Generics provide a way to create reusable components while maintaining type safety...</p><p>They allow you to capture the type of arguments for later use.</p>",
    author: "Mike Johnson",
    date: "2024-01-12",
    image: "/images/typescript-generics.jpg",
    category: "TypeScript",
    tags: ["TypeScript", "Generics", "Web Development"],
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox",
    slug: "css-grid-vs-flexbox",
    description: "When to use CSS Grid and when to use Flexbox in your layouts",
    content:
      "<p>While both Grid and Flexbox can create layouts, they serve different purposes...</p><p>Grid is ideal for two-dimensional layouts, while Flexbox excels in one-dimensional flows.</p>",
    author: "Emma Davis",
    date: "2024-01-08",
    image: "/images/css-grid-flexbox.jpg",
    category: "CSS",
    tags: ["CSS", "Grid", "Flexbox", "Layout"],
  },
  {
    id: 4,
    title: "React Performance Optimization",
    slug: "react-performance-optimization",
    description: "Essential techniques to optimize your React applications",
    content:
      "<p>React applications can suffer from performance issues as they grow...</p><p>Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.</p>",
    author: "Alex Rivera",
    date: "2024-01-05",
    image: "/images/react-performance.jpg",
    category: "React",
    tags: ["React", "Performance", "JavaScript"],
  },
  {
    id: 5,
    title: "Introduction to Material-UI v6",
    slug: "introduction-to-material-ui-v6",
    description: "What's new in the latest version of Material-UI",
    content:
      "<p>Material-UI v6 brings significant improvements and new components...</p><p>The new theming system offers better customization and dark mode support.</p>",
    author: "Jessica Wong",
    date: "2024-01-02",
    image: "/images/material-ui-v6.jpg",
    category: "UI Framework",
    tags: ["Material-UI", "React", "UI Components"],
  },
  {
    id: 6,
    title: "Building REST APIs with Node.js",
    slug: "building-rest-apis-with-nodejs",
    description:
      "Step-by-step guide to creating robust REST APIs using Node.js",
    content:
      "<p>Node.js combined with Express.js provides a powerful platform for building APIs...</p><p>Learn about routing, middleware, and error handling in this comprehensive guide.</p>",
    author: "David Kim",
    date: "2023-12-28",
    image: "/images/nodejs-rest-api.jpg",
    category: "Backend",
    tags: ["Node.js", "API", "Backend", "JavaScript"],
  },
];

export const getPosts = (): IBlogPost[] => posts;
export const getPostBySlug = (slug: string): IBlogPost | undefined =>
  posts.find((post) => post.slug === slug);
export const getPostsByCategory = (category: string): IBlogPost[] =>
  posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
