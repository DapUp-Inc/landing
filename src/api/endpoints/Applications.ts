import { apiClient, type ApiResponse } from "../ApiClient";
import type { Contract } from "./Contracts";

export interface Application {
  id?: string;
  campaignId: string;
  athleteId: string;
  status: "pending" | "submitted" | "accepted" | "declined" | "completed";
  deliverables?: Array<{
    id: string;
    label: string;
    checked: boolean;
    url?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
  brandAccepted?: boolean;
  athleteSubmitted?: boolean;
  brandApproved?: boolean;
  contractUrl?: string;
  contract?: Contract;
}

// Application with enriched athlete profile (BFF pattern)
export interface ApplicationWithProfile extends Application {
  profile?: {
    displayName?: string;
    email?: string;
    photoURL?: string;
    sport?: string;
    school?: string;
    city?: string;
    state?: string;
    socialMediaLinks?: {
      instagram?: string;
      twitter?: string;
      tiktok?: string;
    };
  } | null;
}

export interface CreateApplicationData {
  campaignId: string;
  athleteId: string;
}

export interface UpdateApplicationData {
  status?: "pending" | "submitted" | "accepted" | "declined" | "completed";
  deliverables?: Array<{
    id: string;
    label: string;
    checked: boolean;
    url?: string;
  }>;
  brandAccepted?: boolean;
  athleteSubmitted?: boolean;
  brandApproved?: boolean;
}

export const applicationsApi = {
  /**
   * Get application for a campaign and athlete
   */
  getApplication: async (
    campaignId: string,
    athleteId: string
  ): Promise<ApiResponse<Application>> => {
    return apiClient.get<Application>(
      `/api/campaigns/${campaignId}/applications/${athleteId}`
    );
  },

  /**
   * Get all applications for a campaign
   */
  getCampaignApplications: async (
    campaignId: string
  ): Promise<ApiResponse<Application[]>> => {
    return apiClient.get<Application[]>(`/api/campaigns/${campaignId}/applications`);
  },

  /**
   * Get all applications for a campaign with enriched athlete profiles (BFF pattern)
   * Uses single API call instead of N+1 queries
   */
  getCampaignApplicationsWithProfiles: async (
    campaignId: string
  ): Promise<ApiResponse<ApplicationWithProfile[]>> => {
    return apiClient.get<ApplicationWithProfile[]>(
      `/api/campaigns/${campaignId}/applications?include=profiles`
    );
  },

  /**
   * Create new application (right swipe)
   */
  createApplication: async (
    data: CreateApplicationData
  ): Promise<ApiResponse<Application>> => {
    return apiClient.post<Application>(
      `/api/campaigns/${data.campaignId}/applications`,
      { athleteId: data.athleteId }
    );
  },

  /**
   * Update application
   */
  updateApplication: async (
    campaignId: string,
    athleteId: string,
    data: UpdateApplicationData
  ): Promise<ApiResponse<Application>> => {
    return apiClient.put<Application>(
      `/api/campaigns/${campaignId}/applications/${athleteId}`,
      data
    );
  },

  /**
   * Submit application for review
   */
  submitApplication: async (
    campaignId: string,
    athleteId: string
  ): Promise<ApiResponse<Application>> => {
    return apiClient.post<Application>(
      `/api/campaigns/${campaignId}/applications/${athleteId}/submit`,
      {}
    );
  },

  /**
   * Brand accept application
   */
  acceptApplication: async (
    campaignId: string,
    athleteId: string
  ): Promise<ApiResponse<Application>> => {
    return apiClient.post<Application>(
      `/api/campaigns/${campaignId}/applications/${athleteId}/accept`,
      {}
    );
  },

  /**
   * Brand decline application
   */
  declineApplication: async (
    campaignId: string,
    athleteId: string
  ): Promise<ApiResponse<Application>> => {
    return apiClient.post<Application>(
      `/api/campaigns/${campaignId}/applications/${athleteId}/decline`,
      {}
    );
  },

  /**
   * Get all applications for an athlete
   */
  getAthleteApplications: async (
    athleteId: string
  ): Promise<ApiResponse<Application[]>> => {
    return apiClient.get<Application[]>(`/api/athletes/${athleteId}/applications`);
  },
};
