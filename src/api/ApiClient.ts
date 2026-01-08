import { auth } from "../config/Firebase";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Default request timeout (30 seconds)
const DEFAULT_TIMEOUT_MS = 30000;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getAuthToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    timeoutMs: number = DEFAULT_TIMEOUT_MS
  ): Promise<ApiResponse<T>> {
    const token = await this.getAuthToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const url = `${this.baseUrl}${endpoint}`;

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        // Log 404s as warnings since they're often expected (resource not found)
        // Log other errors as actual errors
        if (response.status === 404) {
          console.warn(`API Warning [${response.status}]:`, data);
        } else {
          console.error(`API Error [${response.status}]:`, data);
        }
        return {
          success: false,
          error: data.error || {
            code: "UNKNOWN_ERROR",
            message: "An unknown error occurred",
          },
        };
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle timeout (AbortError)
      if (error instanceof Error && error.name === "AbortError") {
        console.error("API Request timed out:", url);
        return {
          success: false,
          error: {
            code: "TIMEOUT_ERROR",
            message: `Request timed out after ${timeoutMs / 1000} seconds`,
          },
        };
      }

      console.error("API Request failed:", error);
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: error instanceof Error ? error.message : "Network error occurred",
        },
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
