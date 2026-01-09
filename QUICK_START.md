 Quick Start Guide - Waitlist & Newsletter

# Quick Start Guide - Waitlist & Newsletter

## 🚀 Fastest Setup (Google Apps Script - 10 minutes)

> **Note**: You need **ONE Google Spreadsheet** with **TWO tabs** (not two separate spreadsheets):
> - Tab 1: "Waitlist" 
> - Tab 2: "Newsletter"

### Step 1: Create Google Sheet (2 min)

**Option A: Manual Setup**
1. Go to [Google Sheets](https://sheets.google.com) → Create new spreadsheet
2. **Important**: Create ONE spreadsheet with TWO tabs (sheets) inside it:
   - Tab 1: Name it **"Waitlist"** (rename the default "Sheet1")
   - Tab 2: Click the "+" button to add a new sheet, name it **"Newsletter"**
3. Add headers in Row 1 for each tab:
   - **Waitlist tab**: 
     - Column A: `Email`
     - Column B: `UserType`
     - Column C: `Timestamp`
   - **Newsletter tab**:
     - Column A: `Email`
     - Column B: `Timestamp`
4. Copy the Sheet ID from URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/ABC123XYZ456/edit`
   - Sheet ID is: `ABC123XYZ456`

**Option B: Use Google Gemini (Recommended for beginners)**
1. Open [Google Gemini](https://gemini.google.com)
2. Use the prompts in `gemini-prompts/` folder:
   - First: Copy prompt from `gemini-prompts/waitlist-sheet-prompt.md` → Create Waitlist tab
   - Then: Copy prompt from `gemini-prompts/newsletter-sheet-prompt.md` → Create Newsletter tab
3. Follow Gemini's step-by-step instructions
4. Copy the Sheet ID when done

### Step 2: Deploy Google Apps Script (5 min)
1. Go to [Google Apps Script](https://script.google.com) → New Project
2. Paste code from `google-apps-script/Code.gs`
3. Update these lines:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SHEET_ID_HERE';
   const FROM_EMAIL = 'your-email@gmail.com';
   ```
4. Deploy → New deployment → Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web app URL

### Step 3: Configure Frontend (2 min)
1. Create `.env` file:
   ```bash
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

2. Update imports in:
   - `src/components/landing/EarlyAccessSignup.tsx`:
     ```typescript
     import { submitWaitlist } from '../../services/googleAppsScript';
     ```
   - `src/components/landing/Footer.tsx`:
     ```typescript
     import { submitNewsletter } from '../../services/googleAppsScript';
     ```

### Step 4: Authorize & Test (1 min)
1. In Google Apps Script: Run → `doPost` → Authorize
2. Test the forms on your site
3. Check Google Sheet and email inbox

**Done! ✅**

---

## 📋 What Happens When Users Sign Up

### Waitlist Signup:
1. ✅ Email saved to "Waitlist" sheet
2. ✅ Automatically added to "Newsletter" sheet
3. ✅ Welcome email sent automatically
4. ✅ Duplicate emails prevented

### Newsletter Signup:
1. ✅ Email saved to "Newsletter" sheet
2. ✅ Welcome email sent automatically
3. ✅ Duplicate emails prevented

---

## 🔧 Troubleshooting

**Emails not sending?**
- Check Gmail authorization in Google Apps Script
- Verify FROM_EMAIL is correct
- Check spam folder

**Sheet not updating?**
- Verify SPREADSHEET_ID is correct
- Check sheet names match exactly
- Review execution logs in Google Apps Script

**CORS errors?**
- Ensure deployment is set to "Anyone"

---

## 📚 Full Documentation

See `SETUP.md` for detailed instructions and alternative setup options.
