import { apiClient, type ApiResponse } from "../ApiClient";
import type { DirectorProfile } from "../../types/Profiles";

export interface CreateDirectorData {
  title?: string;
  email: string;
}

export interface UpdateDirectorData {
  title?: string;
}

export const directorsApi = {
  /**
   * Get director profile by UID
   */
  getDirector: async (uid: string): Promise<ApiResponse<DirectorProfile>> => {
    return apiClient.get<DirectorProfile>(`/api/directors/${uid}`);
  },

  /**
   * Update director profile
   */
  updateDirector: async (
    uid: string,
    data: UpdateDirectorData
  ): Promise<ApiResponse<DirectorProfile>> => {
    return apiClient.put<DirectorProfile>(`/api/directors/${uid}`, data);
  },

  /**
   * Create director profile
   */
  createDirector: async (
    uid: string,
    data: CreateDirectorData
  ): Promise<ApiResponse<DirectorProfile>> => {
    return apiClient.post<DirectorProfile>("/api/directors", { uid, ...data });
  },
};
