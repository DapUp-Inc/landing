import { apiClient, type ApiResponse } from "../ApiClient";
import type { Role } from "../../context/AuthContext";

export interface User {
  uid: string;
  role: Role;
  email: string;
  emailLower: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserData {
  role?: Role;
  email?: string;
}

export const usersApi = {
  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return apiClient.get<User>("/api/auth/me");
  },

  /**
   * Create new user
   */
  createUser: async (uid: string, email: string, role: Role): Promise<ApiResponse<User>> => {
    return apiClient.post<User>("/api/users", { uid, email, role });
  },

  /**
   * Get user profile by UID
   */
  getUser: async (uid: string): Promise<ApiResponse<User>> => {
    return apiClient.get<User>(`/api/users/${uid}`);
  },

  /**
   * Update user profile
   */
  updateUser: async (uid: string, data: UpdateUserData): Promise<ApiResponse<User>> => {
    return apiClient.put<User>(`/api/users/${uid}`, data);
  },

  /**
   * Get all users (for development/testing)
   */
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    return apiClient.get<User[]>("/api/users");
  },

  /**
   * Delete user account (with anonymization)
   */
  deleteUser: async (uid: string): Promise<ApiResponse<null>> => {
    return apiClient.delete<null>(`/api/users/${uid}`);
  },
};
