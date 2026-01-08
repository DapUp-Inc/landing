# DapUp Landing Page

This is a standalone landing page (marketing site) for DapUp. It can be easily moved to a separate repository.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
landing/
├── src/
│   ├── components/
│   │   ├── landing/      # Landing page components
│   │   ├── common/       # Shared components (Logo)
│   │   └── ui/           # UI components (LightRays, BlurText, SpotlightCard)
│   ├── pages/
│   │   └── landing/      # Landing pages (LandingPage, LoginPage, SignupPage, PricingPage)
│   ├── assets/           # Images and static assets
│   ├── context/          # AuthContext
│   ├── router/           # Router configuration
│   ├── api/              # API client and endpoints
│   ├── config/           # Firebase configuration
│   └── types/            # TypeScript types
├── public/               # Public assets
└── index.html            # HTML entry point
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# ReCAPTCHA (optional)
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key

# Backend API URL
VITE_API_URL=http://localhost:3001
```

### Routes

- `/` - Main landing page
- `/pricing` - Pricing page
- `/login` - Login page
- `/signup` - Signup page

## 📦 Dependencies

### Core Dependencies
- React 19.1.1
- React Router DOM 7.8.2
- Firebase 12.1.0 (for authentication)
- Framer Motion 12.23.22 (for animations)
- Lucide React (for icons)
- OGL (for WebGL effects)

### Development Dependencies
- Vite 7.1.7
- TypeScript 5.9.3
- Tailwind CSS 3.4.1

## 🎨 Styling

This project uses Tailwind CSS with a custom dark theme. The theme configuration is in `tailwind.config.js`.

## 🔐 Authentication

The landing pages include login and signup functionality that integrates with Firebase Authentication. After successful authentication, users are redirected to their role-specific dashboard in the main application.

## 📝 Notes

- This is a complete, standalone copy of the landing pages
- All imports have been adjusted to work in this structure
- The project can be moved to a separate repository without modification
- Authentication redirects to the main app after login/signup

## 🚢 Deployment

This project can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting

Make sure to set all environment variables in your deployment platform.
