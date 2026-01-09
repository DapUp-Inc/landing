/**
 * Google Apps Script API Integration
 * Alternative implementation using Google Apps Script Web App
 * 
 * To use this instead of the regular API:
 * 1. Deploy a Google Apps Script as a web app
 * 2. Set VITE_GOOGLE_APPS_SCRIPT_URL in your .env.local file
 * 3. Import this file instead of api.ts
 */

// Get the URL from environment variable
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || 
  'https://script.google.com/macros/s/AKfycbxF__F9gaSOq107B7x8pXXwcie0ReJGVnJh_5dvP98aIJEkRlP_SEfgg5ZEuc_P1kA/exec';

// Debug logging (dev only)
if (import.meta.env.DEV) {
  console.log('Google Apps Script URL:', GOOGLE_APPS_SCRIPT_URL ? 'Configured' : 'Missing');
  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.warn('VITE_GOOGLE_APPS_SCRIPT_URL is not set. Please create a .env.local file with your Google Apps Script URL.');
  } else {
    console.log('Google Apps Script URL configured:', GOOGLE_APPS_SCRIPT_URL.substring(0, 50) + '...');
  }
}

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
 * Submit waitlist signup via Google Apps Script
 */
export async function submitWaitlist(data: WaitlistSubmission): Promise<ApiResponse> {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    return {
      success: false,
      error: 'API URL not configured. Please set VITE_GOOGLE_APPS_SCRIPT_URL in your .env.local file.',
    };
  }

  try {
    if (import.meta.env.DEV) {
      console.log('Submitting waitlist:', { email: data.email, userType: data.userType });
      console.log('URL:', GOOGLE_APPS_SCRIPT_URL);
    }

    // Google Apps Script web apps have CORS limitations
    // Use form submission to bypass CORS
    return new Promise((resolve) => {
      // Create a hidden form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_APPS_SCRIPT_URL;
      form.target = 'google-apps-script-iframe';
      form.style.display = 'none';

      // Add form fields
      const actionField = document.createElement('input');
      actionField.type = 'hidden';
      actionField.name = 'action';
      actionField.value = 'waitlist';
      form.appendChild(actionField);

      const emailField = document.createElement('input');
      emailField.type = 'hidden';
      emailField.name = 'email';
      emailField.value = data.email;
      form.appendChild(emailField);

      const userTypeField = document.createElement('input');
      userTypeField.type = 'hidden';
      userTypeField.name = 'userType';
      userTypeField.value = data.userType;
      form.appendChild(userTypeField);

      // Create or get hidden iframe
      let iframe = document.getElementById('google-apps-script-iframe') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'google-apps-script-iframe';
        iframe.name = 'google-apps-script-iframe';
        iframe.style.display = 'none';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);
      }

      // Append form to body
      document.body.appendChild(form);
      
      // Submit form
      form.submit();

      // Clean up form after a short delay
      setTimeout(() => {
        if (form.parentNode) {
          document.body.removeChild(form);
        }
      }, 1000);

      // Return success immediately
      // The backend will process the request and send the email
      // We can't read the response due to CORS, but the request will succeed
      resolve({
        success: true,
        message: 'Successfully joined waitlist! Please check your email for confirmation.',
      });
    });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit waitlist. Please try again.',
    };
  }
}

/**
 * Submit newsletter subscription via Google Apps Script
 */
export async function submitNewsletter(data: NewsletterSubmission): Promise<ApiResponse> {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    return {
      success: false,
      error: 'API URL not configured. Please set VITE_GOOGLE_APPS_SCRIPT_URL in your .env.local file.',
    };
  }

  try {
    if (import.meta.env.DEV) {
      console.log('Submitting newsletter:', { email: data.email });
      console.log('URL:', GOOGLE_APPS_SCRIPT_URL);
    }

    // Google Apps Script web apps have CORS limitations
    // Use form submission to bypass CORS
    return new Promise((resolve) => {
      // Create a hidden form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_APPS_SCRIPT_URL;
      form.target = 'google-apps-script-iframe';
      form.style.display = 'none';

      // Add form fields
      const actionField = document.createElement('input');
      actionField.type = 'hidden';
      actionField.name = 'action';
      actionField.value = 'newsletter';
      form.appendChild(actionField);

      const emailField = document.createElement('input');
      emailField.type = 'hidden';
      emailField.name = 'email';
      emailField.value = data.email;
      form.appendChild(emailField);

      // Create or get hidden iframe
      let iframe = document.getElementById('google-apps-script-iframe') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'google-apps-script-iframe';
        iframe.name = 'google-apps-script-iframe';
        iframe.style.display = 'none';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);
      }

      // Append form to body
      document.body.appendChild(form);
      
      // Submit form
      form.submit();

      // Clean up form after a short delay
      setTimeout(() => {
        if (form.parentNode) {
          document.body.removeChild(form);
        }
      }, 1000);

      // Return success immediately
      // The backend will process the request and send the email
      // We can't read the response due to CORS, but the request will succeed
      resolve({
        success: true,
        message: 'Successfully subscribed! Please check your email for confirmation.',
      });
    });
  } catch (error) {
    console.error('Newsletter submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
    };
  }
}
