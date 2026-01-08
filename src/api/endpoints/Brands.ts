import { apiClient, type ApiResponse } from "../ApiClient";
import type { BrandProfile } from "../../types/Profiles";

export interface CreateBrandData {
  name?: string;
  email: string;
  owners?: string[];
  logoURL?: string;
}

export interface UpdateBrandData {
  name?: string;
  logoURL?: string;
  imageUrl?: string;
  owners?: string[];
}

export const brandsApi = {
  /**
   * Get brand profile by UID
   */
  getBrand: async (uid: string): Promise<ApiResponse<BrandProfile>> => {
    return apiClient.get<BrandProfile>(`/api/brands/${uid}`);
  },

  /**
   * Update brand profile
   */
  updateBrand: async (
    uid: string,
    data: UpdateBrandData
  ): Promise<ApiResponse<BrandProfile>> => {
    return apiClient.put<BrandProfile>(`/api/brands/${uid}`, data);
  },

  /**
   * Create brand profile
   */
  createBrand: async (
    uid: string,
    data: CreateBrandData
  ): Promise<ApiResponse<BrandProfile>> => {
    return apiClient.post<BrandProfile>("/api/brands", { uid, ...data });
  },

  /**
   * Get all brands
   */
  getAllBrands: async (): Promise<ApiResponse<BrandProfile[]>> => {
    return apiClient.get<BrandProfile[]>("/api/brands");
  },
};
