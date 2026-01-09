/**
 * API Service for Waitlist and Newsletter
 * Handles all backend communication
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export interface WaitlistSubmission {
  email: string;
  userType: 'athlete' | 'brand' | 'university';
}

export interface NewsletterSubmission {
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submit waitlist signup
 * Automatically adds user to newsletter as well
 */
export async function submitWaitlist(data: WaitlistSubmission): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit waitlist. Please try again.',
    };
  }
}

/**
 * Submit newsletter subscription
 */
export async function submitNewsletter(data: NewsletterSubmission): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Newsletter submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
    };
  }
}
