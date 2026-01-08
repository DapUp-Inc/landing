import type { Timestamp } from "firebase/firestore";

export interface AthleteProfile {
  id?: string;
  displayName?: string;
  school?: string;
  sport?: string;
  photoURL?: string;
  imageUrl?: string;
  visibility?: string;
  email?: string;
  emailLower?: string;
  profileCompleted?: boolean;
  acceptedCampaignIds?: string[];
  declinedCampaigns?: Record<string, string>; // Maps campaignId to ISO timestamp when campaign can be shown again
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface BrandProfile {
  name?: string;
  logoURL?: string;
  imageUrl?: string;
  owners?: string[];
  email?: string;
  emailLower?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface DirectorProfile {
  title?: string;
  email?: string;
  emailLower?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Profile page specific types
export interface SocialStats {
  impressions: number;
  impressionsChange: number; // percentage
  reach: number;
  reachChange: number;
  followers: number;
  followersChange: number;
  avgEngagement: number;
  engagementLevel: 'Low' | 'Medium' | 'High';
}

export interface SeasonStats {
  season: string; // e.g., "2023-2024"
  gamesPlayed: number;
  // Sport-specific stats (for QB example):
  passYards?: number;
  touchdowns?: number;
  interceptions?: number;
  rating?: number;
  // Can expand for other sports
  points?: number;
  rebounds?: number;
  assists?: number;
  // General stats
  [key: string]: string | number | undefined;
}

export interface FocusArea {
  id: string;
  label: string; // e.g., "Leadership", "Fitness"
  hashtag: string; // e.g., "#Leadership"
}

export interface Collaboration {
  id: string;
  brandName: string;
  logoUrl: string;
}

export interface PortfolioItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;  // For videos and images (from resizer)
  title?: string;
  isIntroVideo?: boolean; // Flag for the introduction video
  order: number;          // For drag-and-drop ordering
  uploadedAt?: Timestamp;
  duration?: number;      // Video duration in seconds (for validation)
}

export interface PortfolioUploadProgress {
  itemId: string;
  progress: number; // 0-100
  status: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

// Extended athlete profile with new fields
export interface AthleteProfileExtended extends AthleteProfile {
  headline?: string; // e.g., "Quarterback @ State University" (max 220 chars)
  focusAreas?: FocusArea[];
  socialStats?: SocialStats;
  seasonStats?: SeasonStats[];
  collaborations?: Collaboration[];
  portfolioMedia?: PortfolioItem[];
  position?: string; // e.g., "Quarterback"
  location?: string; // e.g., "Austin, TX"
  bio?: string;
  isVerified?: boolean;
  activeCampaignIds?: string[];
  // Profile fields
  major?: string;
  graduationYear?: string;
  academicYear?: string;
  height?: string;
  weight?: string;
  age?: string;
  gender?: string;
  // Sport details
  jerseyNumber?: string;
  team?: string;
  athleticStatus?: string;
  // Social media
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
  phone?: string;
  // Privacy settings
  searchable?: boolean;
  allowBrandMessages?: boolean;
  // Notification settings
  emailNotifications?: boolean;
  campaignAlerts?: boolean;
  messageAlerts?: boolean;
  dealReminders?: boolean;
}
