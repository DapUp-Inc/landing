import { apiClient, type ApiResponse } from "../ApiClient";
import type { AthleteProfile } from "../../types/Profiles";
import type { Campaign } from "../../types/Campaign";
import type { Application } from "./Applications";
import type { Contract } from "./Contracts";

// Enriched Deal type for BFF endpoint (athlete deals with all related data)
export interface EnrichedDeal {
  campaign: Campaign;
  application: Application;
  contract?: Contract | null;
  deliverablesStatus?: 'in_progress' | 'submitted' | 'approved' | 'rejected' | null;
}

export interface CreateAthleteData {
  visibility?: string;
  email: string;
  displayName?: string;
  school?: string;
  photoURL?: string;
  profileCompleted?: boolean;
}

export interface UpdateAthleteData {
  visibility?: string;
  displayName?: string;
  school?: string;
  sport?: string;
  photoURL?: string;
  profileCompleted?: boolean;
  // New profile fields
  headline?: string;
  location?: string;
  focusAreas?: Array<{ id: string; label: string; hashtag: string }>;
  // Profile fields
  bio?: string;
  major?: string;
  graduationYear?: string;
  academicYear?: string;
  height?: string;
  weight?: string;
  age?: string;
  gender?: string;
  // Sport details
  position?: string;
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
  // Campaign interactions
  declinedCampaigns?: Record<string, string>; // Maps campaignId to ISO timestamp when it can be shown again
}

export const athletesApi = {
  /**
   * Get athlete profile by UID
   */
  getAthlete: async (uid: string): Promise<ApiResponse<AthleteProfile>> => {
    return apiClient.get<AthleteProfile>(`/api/athletes/${uid}`);
  },

  /**
   * Update athlete profile
   */
  updateAthlete: async (
    uid: string,
    data: UpdateAthleteData
  ): Promise<ApiResponse<AthleteProfile>> => {
    return apiClient.put<AthleteProfile>(`/api/athletes/${uid}`, data);
  },

  /**
   * Create athlete profile
   */
  createAthlete: async (
    uid: string,
    data: CreateAthleteData
  ): Promise<ApiResponse<AthleteProfile>> => {
    return apiClient.post<AthleteProfile>("/api/athletes", { uid, ...data });
  },

  /**
   * Get all athletes
   */
  getAllAthletes: async (): Promise<ApiResponse<AthleteProfile[]>> => {
    return apiClient.get<AthleteProfile[]>("/api/athletes");
  },

  /**
   * Get enriched deals for an athlete (BFF endpoint)
   * Returns accepted applications with campaigns, contracts, and deliverables status
   */
  getAthleteDeals: async (uid: string): Promise<ApiResponse<EnrichedDeal[]>> => {
    return apiClient.get<EnrichedDeal[]>(`/api/athletes/${uid}/deals`);
  },
};
