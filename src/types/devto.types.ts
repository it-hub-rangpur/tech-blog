// types/devto.types.ts

// Dev.to User interface
export interface DevToUser {
  name: string;
  username: string;
  twitter_username: string | null;
  github_username: string | null;
  user_id: number;
  website_url: string | null;
  profile_image: string;
  profile_image_90: string;
}

// Dev.to Organization interface
export interface DevToOrganization {
  name: string;
  username: string;
  slug: string;
  profile_image: string;
  profile_image_90: string;
}

// Dev.to Article interface based on actual API response
export interface DevToArticle {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: string | null;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  user: DevToUser;
  organization?: DevToOrganization;
  language?: string;
  subforem_id?: number;
}

// Pagination interface
export interface PaginationInfo {
  current_page: number;
  per_page: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  next_page: number | null;
  previous_page: number | null;
  estimated_remaining_pages: number | null;
  total_articles_loaded: number;
}

// Meta information interface
export interface MetaInfo {
  source: string;
  fetched_at: string;
}

// Success response interface
export interface SuccessResponse {
  success: true;
  data: DevToArticle[];
  pagination: PaginationInfo;
  meta: MetaInfo;
}

// Error response interface
export interface ErrorResponse {
  success: false;
  error: string;
  pagination: {
    current_page: number;
    per_page: number;
    has_next_page: false;
    has_previous_page: boolean;
  };
}

// Combined response type
export type ApiResponse = SuccessResponse | ErrorResponse;
