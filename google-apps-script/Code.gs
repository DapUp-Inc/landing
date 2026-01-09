/**
 * Google Apps Script for Waitlist and Newsletter
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this code
 * 4. Update the configuration variables below
 * 5. Deploy as a web app (Execute as: Me, Who has access: Anyone)
 * 6. Copy the web app URL and set it as VITE_GOOGLE_APPS_SCRIPT_URL
 * 
 * GOOGLE SHEETS SETUP:
 * 1. Create a new Google Sheet
 * 2. Name the first sheet "Waitlist" with columns: Email, UserType, Timestamp
 * 3. Name the second sheet "Newsletter" with columns: Email, Timestamp
 * 4. Copy the Sheet ID from the URL (between /d/ and /edit)
 * 5. Update SPREADSHEET_ID below
 */

// ============ CONFIGURATION ============
const SPREADSHEET_ID = '1Y7J47Eeq-O0Lgswvvr2aU5mT7noWlqh8iewA3jBy0ic'; // Replace with your Google Sheet ID
const WAITLIST_SHEET_NAME = 'Waitlist';
const NEWSLETTER_SHEET_NAME = 'Newsletter';

// Email configuration (using Gmail)
// Note: Emails will be sent from the Gmail account that authorizes this script
const FROM_EMAIL = 'arthurandersen96@gmail.com'; // Your Gmail address (for reference)
const FROM_NAME = 'DapUp Team';

// Email templates
const WAITLIST_EMAIL_SUBJECT = 'Welcome to DapUp Waitlist!';
const NEWSLETTER_EMAIL_SUBJECT = 'Welcome to DapUp Newsletter';

// ============ MAIN HANDLER ============
/**
 * Handle GET requests (for testing and direct URL access)
 */
function doGet(e) {
  return createResponse(true, 'DapUp Waitlist API is running! Use POST to submit data.');
}

/**
 * Handle OPTIONS requests (for CORS preflight)
 * Note: ContentService doesn't support setting headers directly.
 * Since the frontend now uses form submission (no CORS needed),
 * we return an empty JSON response here.
 */
function doOptions() {
  return ContentService.createTextOutput('{}')
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST requests (for form submissions)
 */
function doPost(e) {
  try {
    let data;
    
    // Log received data for debugging
    Logger.log('Received postData: ' + JSON.stringify(e.postData));
    Logger.log('Received parameters: ' + JSON.stringify(e.parameter));
    
    // Handle form-encoded data first (most common for HTML forms)
    if (e.parameter && (e.parameter.action || e.parameter.email)) {
      // Form-encoded data comes in e.parameter
      data = {
        action: e.parameter.action,
        email: e.parameter.email,
        userType: e.parameter.userType
      };
      Logger.log('Using form-encoded data: ' + JSON.stringify(data));
    } 
    // Handle JSON data (if Content-Type is application/json)
    else if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
        Logger.log('Using JSON data: ' + JSON.stringify(data));
      } catch (jsonError) {
        Logger.log('JSON parse error: ' + jsonError.toString());
        return createResponse(false, 'Invalid JSON data: ' + jsonError.toString());
      }
    } else {
      Logger.log('No data received in postData or parameter');
      return createResponse(false, 'No data received. Check that form fields are named correctly.');
    }

    // Validate that we have required data
    if (!data || !data.action) {
      Logger.log('Missing action in data: ' + JSON.stringify(data));
      return createResponse(false, 'Missing action parameter');
    }

    const action = data.action;

    if (action === 'waitlist') {
      return handleWaitlist(data);
    } else if (action === 'newsletter') {
      return handleNewsletter(data);
    } else {
      Logger.log('Invalid action: ' + action);
      return createResponse(false, 'Invalid action: ' + action);
    }
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return createResponse(false, 'Server error: ' + error.toString());
  }
}

// ============ WAITLIST HANDLER ============
function handleWaitlist(data) {
  const email = data.email;
  const userType = data.userType;

  Logger.log('handleWaitlist called with: ' + JSON.stringify(data));

  // Validate input
  if (!email || !userType) {
    Logger.log('Validation failed: email=' + email + ', userType=' + userType);
    return createResponse(false, 'Email and user type are required');
  }

  if (!isValidEmail(email)) {
    Logger.log('Invalid email format: ' + email);
    return createResponse(false, 'Invalid email address');
  }

  try {
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    if (!spreadsheet) {
      Logger.log('Failed to open spreadsheet with ID: ' + SPREADSHEET_ID);
      return createResponse(false, 'Failed to access spreadsheet');
    }
    
    const sheet = spreadsheet.getSheetByName(WAITLIST_SHEET_NAME);
    if (!sheet) {
      Logger.log('Sheet "' + WAITLIST_SHEET_NAME + '" not found');
      return createResponse(false, 'Waitlist sheet not found');
    }
    
    // Check if email already exists
    const existingData = sheet.getDataRange().getValues();
    const emailColumn = 0; // Assuming email is in column A
    const emailExists = existingData.some(row => row[emailColumn] && row[emailColumn].toString().toLowerCase() === email.toLowerCase());
    
    if (emailExists) {
      Logger.log('Email already exists: ' + email);
      return createResponse(false, 'Email already registered');
    }

    // Add to waitlist sheet
    const timestamp = new Date();
    sheet.appendRow([email, userType, timestamp]);
    Logger.log('Added to waitlist sheet: ' + email + ', ' + userType);

    // Also add to newsletter automatically
    const newsletterSheet = spreadsheet.getSheetByName(NEWSLETTER_SHEET_NAME);
    if (newsletterSheet) {
      const newsletterData = newsletterSheet.getDataRange().getValues();
      const newsletterEmailExists = newsletterData.some(row => row[0] && row[0].toString().toLowerCase() === email.toLowerCase());
      
      if (!newsletterEmailExists) {
        newsletterSheet.appendRow([email, timestamp]);
        Logger.log('Added to newsletter sheet: ' + email);
      } else {
        Logger.log('Email already in newsletter: ' + email);
      }
    } else {
      Logger.log('Newsletter sheet not found, skipping newsletter addition');
    }

    // Send welcome email
    try {
      sendWaitlistEmail(email, userType);
      Logger.log('Welcome email sent to: ' + email);
    } catch (emailError) {
      Logger.log('Email send failed (non-critical): ' + emailError.toString());
      // Don't fail the request if email fails
    }

    return createResponse(true, 'Successfully joined waitlist!');
  } catch (error) {
    Logger.log('Waitlist error: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return createResponse(false, 'Failed to process waitlist: ' + error.toString());
  }
}

// ============ NEWSLETTER HANDLER ============
function handleNewsletter(data) {
  const email = data.email;

  Logger.log('handleNewsletter called with: ' + JSON.stringify(data));

  // Validate input
  if (!email) {
    Logger.log('Validation failed: email missing');
    return createResponse(false, 'Email is required');
  }

  if (!isValidEmail(email)) {
    Logger.log('Invalid email format: ' + email);
    return createResponse(false, 'Invalid email address');
  }

  try {
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    if (!spreadsheet) {
      Logger.log('Failed to open spreadsheet with ID: ' + SPREADSHEET_ID);
      return createResponse(false, 'Failed to access spreadsheet');
    }
    
    const sheet = spreadsheet.getSheetByName(NEWSLETTER_SHEET_NAME);
    if (!sheet) {
      Logger.log('Sheet "' + NEWSLETTER_SHEET_NAME + '" not found');
      return createResponse(false, 'Newsletter sheet not found');
    }
    
    // Check if email already exists
    const existingData = sheet.getDataRange().getValues();
    const emailColumn = 0;
    const emailExists = existingData.some(row => row[emailColumn] && row[emailColumn].toString().toLowerCase() === email.toLowerCase());
    
    if (emailExists) {
      Logger.log('Email already exists: ' + email);
      return createResponse(false, 'Email already subscribed');
    }

    // Add to newsletter sheet
    const timestamp = new Date();
    sheet.appendRow([email, timestamp]);
    Logger.log('Added to newsletter sheet: ' + email);

    // Send welcome email
    try {
      sendNewsletterEmail(email);
      Logger.log('Welcome email sent to: ' + email);
    } catch (emailError) {
      Logger.log('Email send failed (non-critical): ' + emailError.toString());
      // Don't fail the request if email fails
    }

    return createResponse(true, 'Successfully subscribed to newsletter!');
  } catch (error) {
    Logger.log('Newsletter error: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return createResponse(false, 'Failed to process newsletter: ' + error.toString());
  }
}

// ============ EMAIL FUNCTIONS ============
function sendWaitlistEmail(email, userType) {
  try {
    const userTypeLabel = {
      'athlete': 'College Athlete',
      'brand': 'Brand/Business',
      'university': 'University/AD'
    }[userType] || 'User';

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; 
            line-height: 1.6; 
            color: #ffffff; 
            background-color: #0A0A0A;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 0;
            background-color: #0A0A0A;
          }
          .header { 
            background: linear-gradient(135deg, #F4B942 0%, #00D4FF 100%); 
            color: #0A0A0A; 
            padding: 40px 30px; 
            text-align: center; 
            border-radius: 12px 12px 0 0; 
          }
          .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 600;
            letter-spacing: -0.02em;
          }
          .content { 
            background: #1A1A1A; 
            padding: 40px 30px; 
            border-radius: 0 0 12px 12px; 
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-top: none;
          }
          .content p {
            color: #ffffff;
            margin: 0 0 16px 0;
            font-size: 16px;
          }
          .content p:last-of-type {
            margin-bottom: 0;
          }
          .content strong {
            color: #F4B942;
            font-weight: 600;
          }
          .content ul { 
            list-style: none; 
            padding-left: 0; 
            margin: 24px 0; 
          }
          .content ul li { 
            margin-bottom: 16px; 
            padding-left: 0; 
            color: #ffffff;
            font-size: 16px;
          }
          .content ul li strong { 
            color: #00D4FF; 
            margin-right: 10px; 
            font-weight: 600;
          }
          .button { 
            display: inline-block; 
            padding: 14px 28px; 
            background: linear-gradient(135deg, #F4B942 0%, #00D4FF 100%); 
            color: #0A0A0A; 
            text-decoration: none; 
            border-radius: 8px; 
            margin: 24px 0; 
            font-weight: 600;
            font-size: 16px;
          }
          .footer { 
            text-align: center; 
            margin-top: 40px; 
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.5); 
            font-size: 12px; 
          }
          .footer a {
            color: #00D4FF;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to DapUp!</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>Thank you for joining the DapUp waitlist as a <strong>${userTypeLabel}</strong>! We're excited to have you on board.</p>
            <p>You're now part of an exclusive group that will be the first to experience:</p>
            <ul>
              <li><strong>→</strong> Priority access when we launch</li>
              <li><strong>→</strong> Early access to new features</li>
              <li><strong>→</strong> Founding member benefits and special rates</li>
            </ul>
            <p>We'll keep you updated on our progress and notify you as soon as your cohort opens. In the meantime, you've also been automatically added to our newsletter to stay in the loop!</p>
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:hello@dapup.com" style="color: #00D4FF; text-decoration: none;">hello@dapup.com</a></p>
            <p>Best regards,<br><strong>The DapUp Team</strong></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} DapUp. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const plainBody = `
Welcome to DapUp!

Thank you for joining the DapUp waitlist as a ${userTypeLabel}! We're excited to have you on board.

You're now part of an exclusive group that will be the first to experience:

• Priority access when we launch
• Early access to new features
• Founding member benefits and special rates

We'll keep you updated on our progress and notify you as soon as your cohort opens. In the meantime, you've also been automatically added to our newsletter to stay in the loop!

If you have any questions, feel free to reach out to us at hello@dapup.com

Best regards,
The DapUp Team

© ${new Date().getFullYear()} DapUp. All rights reserved.
    `;

    GmailApp.sendEmail(
      email,
      WAITLIST_EMAIL_SUBJECT,
      plainBody,
      {
        htmlBody: htmlBody,
        name: FROM_NAME
        // Note: Emails are automatically sent from the Gmail account that authorized this script
        // The 'from' parameter is not supported in GmailApp.sendEmail
      }
    );
  } catch (error) {
    Logger.log('Email send error: ' + error.toString());
    // Don't fail the request if email fails
  }
}

function sendNewsletterEmail(email) {
  try {
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; 
            line-height: 1.6; 
            color: #ffffff; 
            background-color: #0A0A0A;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 0;
            background-color: #0A0A0A;
          }
          .header { 
            background: linear-gradient(135deg, #F4B942 0%, #00D4FF 100%); 
            color: #0A0A0A; 
            padding: 40px 30px; 
            text-align: center; 
            border-radius: 12px 12px 0 0; 
          }
          .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 600;
            letter-spacing: -0.02em;
          }
          .content { 
            background: #1A1A1A; 
            padding: 40px 30px; 
            border-radius: 0 0 12px 12px; 
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-top: none;
          }
          .content p {
            color: #ffffff;
            margin: 0 0 16px 0;
            font-size: 16px;
          }
          .content p:last-of-type {
            margin-bottom: 0;
          }
          .content strong {
            color: #F4B942;
            font-weight: 600;
          }
          .content ul { 
            list-style: none; 
            padding-left: 0; 
            margin: 24px 0; 
          }
          .content ul li { 
            margin-bottom: 16px; 
            padding-left: 0; 
            color: #ffffff;
            font-size: 16px;
          }
          .content ul li strong { 
            color: #00D4FF; 
            margin-right: 10px; 
            font-weight: 600;
          }
          .button { 
            display: inline-block; 
            padding: 14px 28px; 
            background: linear-gradient(135deg, #F4B942 0%, #00D4FF 100%); 
            color: #0A0A0A; 
            text-decoration: none; 
            border-radius: 8px; 
            margin: 24px 0; 
            font-weight: 600;
            font-size: 16px;
          }
          .footer { 
            text-align: center; 
            margin-top: 40px; 
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.5); 
            font-size: 12px; 
          }
          .footer a {
            color: #00D4FF;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to DapUp Newsletter</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>Thank you for subscribing to the DapUp newsletter! You'll now receive:</p>
            <ul>
              <li><strong>→</strong> Latest updates about our platform</li>
              <li><strong>→</strong> Tips and insights about NIL advertising</li>
              <li><strong>→</strong> Exclusive content and announcements</li>
              <li><strong>→</strong> Early access to new features</li>
            </ul>
            <p>We're building something special, and we're glad you're along for the journey!</p>
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:hello@dapup.com" style="color: #00D4FF; text-decoration: none;">hello@dapup.com</a></p>
            <p>Best regards,<br><strong>The DapUp Team</strong></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} DapUp. All rights reserved.</p>
            <p><a href="#" style="color: #00D4FF;">Unsubscribe</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const plainBody = `
Welcome to DapUp Newsletter!

Thank you for subscribing to the DapUp newsletter! You'll now receive:

• Latest updates about our platform
• Tips and insights about NIL advertising
• Exclusive content and announcements
• Early access to new features

We're building something special, and we're glad you're along for the journey!

If you have any questions, feel free to reach out to us at hello@dapup.com

Best regards,
The DapUp Team

© ${new Date().getFullYear()} DapUp. All rights reserved.
    `;

    GmailApp.sendEmail(
      email,
      NEWSLETTER_EMAIL_SUBJECT,
      plainBody,
      {
        htmlBody: htmlBody,
        name: FROM_NAME
        // Note: Emails are automatically sent from the Gmail account that authorized this script
        // The 'from' parameter is not supported in GmailApp.sendEmail
      }
    );
  } catch (error) {
    Logger.log('Email send error: ' + error.toString());
    // Don't fail the request if email fails
  }
}

// ============ UTILITY FUNCTIONS ============
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function createResponse(success, message) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: success,
      message: message
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ============ TEST FUNCTIONS ============
// Use these functions to test your script before deploying
// Run these functions directly from the script editor

/**
 * Test waitlist submission with JSON
 * Change the email and userType below, then run this function
 */
function testWaitlist() {
  const testData = {
    email: 'test@example.com', // Change this to your test email
    userType: 'athlete' // Options: 'athlete', 'brand', or 'university'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'waitlist',
        ...testData
      })
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test Result: ' + result.getContent());
}

/**
 * Test waitlist submission with form data (simulates HTML form submission)
 * Change the email and userType below, then run this function
 */
function testWaitlistForm() {
  const mockEvent = {
    parameter: {
      action: 'waitlist',
      email: 'test@example.com', // Change this to your test email
      userType: 'athlete' // Options: 'athlete', 'brand', or 'university'
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Form Test Result: ' + result.getContent());
}

/**
 * Test newsletter subscription with JSON
 * Change the email below, then run this function
 */
function testNewsletter() {
  const testData = {
    email: 'test@example.com' // Change this to your test email
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'newsletter',
        ...testData
      })
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test Result: ' + result.getContent());
}

/**
 * Test newsletter subscription with form data (simulates HTML form submission)
 * Change the email below, then run this function
 */
function testNewsletterForm() {
  const mockEvent = {
    parameter: {
      action: 'newsletter',
      email: 'test@example.com' // Change this to your test email
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Form Test Result: ' + result.getContent());
}

/**
 * Test email validation
 */
function testEmailValidation() {
  Logger.log('Valid email test: ' + isValidEmail('test@example.com')); // Should be true
  Logger.log('Invalid email test: ' + isValidEmail('invalid-email')); // Should be false
}
