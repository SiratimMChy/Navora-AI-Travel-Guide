# 🌍 Navora - AI-Powered Travel Booking Platform

> Discover your next adventure with intelligent recommendations and seamless booking experiences powered by AI.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.1.7-000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.1.0-13AA52?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-20.4.1-635BFF?style=flat&logo=stripe&logoColor=white)](https://stripe.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.2.1-06B6D4?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Groq AI](https://img.shields.io/badge/Groq%20AI-LLaMA%203.3-FF6B35?style=flat&logo=ai&logoColor=white)](https://groq.com/)

<div align="center">

<a href="https://navora-five.vercel.app" target="_blank">
  <img 
    src="https://img.shields.io/badge/🚀%20NAVORA-LIVE%20DEMO-0EA5E9?style=for-the-badge&logo=vercel&logoColor=white&labelColor=0F172A"
    alt="NAVORA Live Demo"
  />
</a>

</div>

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About The Project

**Navora** is a full-stack travel booking platform that revolutionizes how travelers discover and book their next adventure. Powered by cutting-edge AI technology and built with modern web frameworks, Navora combines intelligent destination recommendations with seamless booking experiences.

### Core Value Proposition

- **AI-Powered Discovery**: Groq's LLaMA 3.3 70B model provides intelligent, context-aware destination recommendations
- **Secure Payments**: Stripe integration ensures PCI-compliant payment processing with 135+ currency support
- **Real-time Management**: Live booking queue, instant confirmations, and comprehensive admin analytics
- **Enterprise-Grade Security**: NextAuth.js with role-based access control and encrypted data storage
- **Mobile-First Design**: Responsive interface optimized for all devices with dark mode support
- **Scalable Architecture**: Cloud-native deployment on Vercel with MongoDB Atlas for global accessibility

### Why Choose Navora?

Unlike traditional travel booking platforms, Navora stands out by:
- Combining AI intelligence with human-centric design
- Providing real-time booking management with approval workflows
- Offering comprehensive admin tools for platform management
- Implementing modern security best practices throughout
- Delivering exceptional user experience across all devices

---

## ✨ Key Features

### 🤖 AI-Powered Recommendations Engine

- **Intelligent Chatbot**: Real-time conversational AI powered by Groq's LLaMA 3.3 70B model
- **Context-Aware Analysis**: Considers destination category, budget constraints, and group size
- **Smart Filtering**: Budget-aware destination matching with quality-based ranking
- **Natural Language Processing**: Understands user preferences and generates personalized suggestions
- **Graceful Fallbacks**: Ensures recommendations even with limited user data
- **Instant Responses**: Sub-second inference times for seamless user experience

### 💳 Booking & Payment Management

- **Secure Payment Processing**: Stripe integration with PCI DSS Level 1 compliance
- **Multi-Currency Support**: Accept payments in 135+ currencies
- **Booking Workflow**: Pending → Confirmed → Completed status tracking
- **Unique Reference Numbers**: Every booking gets a trackable reference ID
- **Admin Approval System**: Manual review and rejection workflow with reason tracking
- **Refund Processing**: Automated cancellation and refund handling with audit trails
- **Payment Webhooks**: Real-time payment status updates and reconciliation

### 📊 Comprehensive Admin Dashboard

- **Overview Tab**: Real-time KPIs, revenue analytics, and booking trends
- **Destinations Tab**: Full CRUD operations with image management and SEO optimization
- **Bookings Tab**: Queue management with approval workflow and bulk operations
- **Users Tab**: Account management, role assignment, and user analytics
- **Blog Tab**: Content creation with AI-assisted description generation
- **Settings Tab**: Platform configuration, business rules, and system management

### 🏠 User Dashboard & Personalization

- **Booking History**: Complete view of all bookings with status tracking
- **Profile Management**: User information, preferences, and account settings
- **Review System**: 5-star ratings with detailed reviews and photo uploads
- **Wishlist**: Save favorite destinations for later booking
- **Statistics**: Personal booking history and spending analytics
- **Notifications**: Real-time updates on booking status and special offers

### 🔐 Authentication & Security

- **Multi-Channel Auth**: Email/password and Google OAuth 2.0 integration
- **Role-Based Access Control**: Admin, user, and guest role management
- **Password Security**: bcryptjs hashing with salt rounds
- **Session Management**: Secure token-based sessions with NextAuth.js
- **Protected Routes**: Private dashboard accessible only to authenticated users
- **Data Encryption**: Sensitive data encrypted at rest and in transit

### 📱 Responsive & Accessible Design

- **Mobile-First Approach**: Optimized for smartphones, tablets, and desktops
- **Dark Mode Support**: Built-in theme switching with DaisyUI
- **Touch-Friendly UI**: Swiper carousels and gesture-optimized controls
- **WCAG 2.1 Compliance**: Semantic HTML and accessibility best practices
- **Performance Optimized**: Lazy loading, image optimization, and code splitting
- **Cross-Browser Support**: Works seamlessly on all modern browsers

---

## 🏗️ Architecture

Navora follows a modern full-stack architecture with clear separation of concerns:

<img width="1440" height="1480" alt="image" src="https://github.com/user-attachments/assets/147f209d-72e1-49e7-8545-5a4a2799ce5d" />

### Data Flow

1. **User Authentication**: NextAuth.js handles registration, login, and session management
2. **API Requests**: React frontend sends HTTP requests via Axios to Next.js API routes
3. **Data Processing**: API routes validate, process, and execute MongoDB operations
4. **External Services**: Stripe for payments, Groq for AI recommendations
5. **Response Delivery**: JSON data returns to frontend for rendering
6. **Real-time Updates**: UI updates immediately reflect database changes

## 🛠️ Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.1.7 | React framework with App Router and Server Components |
| **React** | 19.2.3 | Modern UI library with latest features |
| **TypeScript** | 5.x | Type-safe development with static type checking |
| **TailwindCSS** | 4.2.1 | Utility-first CSS framework for rapid UI development |
| **DaisyUI** | 5.5.19 | Beautiful component library built on Tailwind |
| **Swiper** | 12.1.2 | Touch-enabled carousel and slider components |
| **Recharts** | 3.8.0 | Composable charting library for data visualization |
| **Lucide React** | 0.577.0 | Beautiful, consistent icon library |
| **React Icons** | 5.6.0 | Popular icon library collection |
| **React Toastify** | 11.0.5 | Toast notifications for user feedback |
| **SweetAlert2** | 11.26.23 | Beautiful, responsive alert modals |
| **Axios** | 1.13.6 | Promise-based HTTP client for API requests |

### Backend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 20.x | JavaScript runtime for server-side execution |
| **Next.js API Routes** | 16.1.7 | Serverless API endpoints |
| **NextAuth.js** | 5.0.0-beta.30 | Complete authentication solution |
| **MongoDB** | 7.1.0 | NoSQL database with flexible schema |
| **Mongoose** | 9.3.1 | MongoDB object modeling and validation |
| **bcryptjs** | 3.0.3 | Password hashing with salt rounds |

### External Services

| Service | Purpose | Integration |
|---------|---------|-------------|
| **Stripe** | Payment processing | 135+ currencies, PCI DSS Level 1 |
| **Groq AI** | AI recommendations | LLaMA 3.3 70B model for inference |
| **Google OAuth** | Social authentication | One-click sign-in |
| **MongoDB Atlas** | Cloud database | Managed MongoDB hosting |
| **Vercel** | Deployment platform | Serverless hosting and CI/CD |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting and quality assurance |
| **TypeScript** | Static type checking |
| **PostCSS** | CSS transformation and optimization |
| **Git** | Version control system |
| **npm** | Node package manager |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for version control
- **MongoDB Atlas** account ([free tier](https://www.mongodb.com/cloud/atlas))
- **Stripe** account ([test mode](https://dashboard.stripe.com/register))
- **Groq API** key ([free tier](https://console.groq.com/))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/SiratimMChy/navora.git
cd navora
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/navora
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
GROQ_API_KEY=your_groq_api_key
```

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to `http://localhost:3000` to see the application running.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Optional |
| `NEXT_PUBLIC_IMGBB_API_KEY` | ImgBB API key for images | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `GROQ_API_KEY` | Groq AI API key | Yes |

---

## 📖 Usage

### Getting Started with Navora

1. **Create Your Account**
   - Navigate to the registration page
   - Sign up with email/password or use Google OAuth
   - Complete your profile setup

2. **Explore Destinations**
   - Browse curated destinations on the homepage
   - Use category filters: Beach, Mountain, City, Adventure, or Cruise
   - View featured and popular destinations
   - Check detailed destination pages with images and reviews

3. **Get AI Recommendations**
   - Click the AI Assistant floating button
   - Answer questions about your preferences
   - Receive personalized destination recommendations instantly

4. **Book Your Trip**
   - Select your desired destination
   - Enter travel details (date, number of travelers)
   - Review total price and booking summary
   - Complete payment through Stripe's secure interface

5. **Manage Your Bookings**
   - Access your dashboard
   - View all bookings with status tracking
   - Check booking details and payment information
   - Cancel bookings if needed

### Key Pages

- **`/`** - Landing page with features and destinations
- **`/login`** - User authentication
- **`/register`** - New user registration
- **`/explore`** - Browse all destinations with filters
- **`/destinations/[id]`** - Detailed destination page
- **`/dashboard`** - User dashboard overview
- **`/dashboard/admin`** - Admin control panel
- **`/blog`** - Travel guides and tips
- **`/about`** - About Navora
- **`/contact`** - Contact information

---

## 📁 Project Structure

```
navora/
├── public/                      # Static assets
│   ├── file.svg
│   ├── globe.svg
│   └── ...
├── src/
│   ├── actions/                 # Server Actions
│   │   └── server/
│   │       └── auth.ts
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/              # Auth route group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── api/                 # API endpoints
│   │   │   ├── admin/
│   │   │   ├── ai/
│   │   │   ├── auth/
│   │   │   ├── blog/
│   │   │   ├── bookings/
│   │   │   ├── destinations/
│   │   │   ├── reviews/
│   │   │   ├── stats/
│   │   │   ├── stripe/
│   │   │   └── users/
│   │   ├── dashboard/           # User & Admin dashboards
│   │   ├── destinations/        # Destination pages
│   │   ├── blog/                # Blog pages
│   │   ├── explore/             # Explore page
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── auth/                # Auth components
│   │   ├── dashboard/           # Dashboard components
│   │   ├── home/                # Home page sections
│   │   ├── layouts/             # Layout components
│   │   └── shared/              # Reusable components
│   ├── lib/                     # Utilities & configurations
│   │   ├── controllers/         # Business logic
│   │   ├── auth.ts              # NextAuth configuration
│   │   ├── mongoose.ts          # MongoDB connection
│   │   └── categoryColors.ts    # UI utilities
│   ├── models/                  # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Destination.ts
│   │   ├── Booking.ts
│   │   ├── Review.ts
│   │   └── BlogPost.ts
│   └── types/                   # TypeScript definitions
│       ├── index.ts
│       └── app.ts
├── .env.local                   # Environment variables
├── .gitignore                   # Git ignore rules
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

---

## � API Documentation

Navora provides a comprehensive REST API built with Next.js API Routes. All endpoints follow RESTful conventions and return JSON responses.

### Base URL

- **Production**: `https://navora-five.vercel.app`
- **Development**: `http://localhost:3000`

### Authentication

Most endpoints require authentication via NextAuth.js session. Include the session token in request headers or use cookies for browser-based requests.

### Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Destinations Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/destinations` | Fetch all destinations with filters | No |
| `POST` | `/api/destinations` | Create a new destination | Admin |
| `GET` | `/api/destinations/:id` | Get destination details | No |
| `PUT` | `/api/destinations/:id` | Update destination | Admin |
| `DELETE` | `/api/destinations/:id` | Delete destination | Admin |

**Query Parameters** (GET /api/destinations):
- `category` - Filter by category (Beach, Mountain, City, Adventure, Cruise)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `search` - Search by destination name

### Bookings Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/bookings` | Fetch user's bookings | User |
| `POST` | `/api/bookings` | Create a new booking | User |
| `GET` | `/api/admin/bookings` | Fetch all bookings | Admin |
| `PATCH` | `/api/admin/bookings` | Approve/reject booking | Admin |

**Booking Status Flow**: `pending` → `confirmed` → `completed` or `cancelled`

### Reviews Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/reviews` | Fetch reviews | No |
| `POST` | `/api/reviews` | Create a review | User |

### Blog Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/blog` | Fetch blog posts | No |
| `POST` | `/api/blog` | Create blog post | Admin |
| `DELETE` | `/api/blog/:id` | Delete blog post | Admin |

### AI Services Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/ai/recommend` | Get AI recommendations | User |
| `POST` | `/api/ai/generate-description` | Generate content | Admin |

**AI Recommendation Request**:
```json
{
  "category": "Beach",
  "budget": 5000,
  "travelers": 2,
  "preferences": "relaxation"
}
```

### Payment Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/stripe/checkout` | Create checkout session | User |

### Users Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/users` | Fetch all users | Admin |
| `GET` | `/api/users/:email` | Get user profile | User |
| `PUT` | `/api/users/:email` | Update user profile | User |
| `PATCH` | `/api/users/:email` | Update user role | Admin |
| `DELETE` | `/api/users/:email` | Delete user | Admin |

### Analytics Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/stats` | Fetch dashboard statistics | Admin |

**Response includes**:
- Total users
- Total bookings
- Total revenue
- Booking trends
- Popular destinations

---

## 🌐 Deployment

### Vercel (Recommended)

Navora is optimized for deployment on Vercel, which provides serverless hosting, automatic scaling, and CI/CD integration.

#### Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository and click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all required environment variables:
     - `MONGODB_URI`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL`
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`
     - `NEXT_PUBLIC_IMGBB_API_KEY`
     - `STRIPE_SECRET_KEY`
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `GROQ_API_KEY`

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically builds and deploys your application
   - Your app is live at `your-project.vercel.app`

5. **Automatic Deployments**
   - Every push to `main` branch triggers automatic deployment
   - Preview deployments for pull requests
   - Rollback to previous versions if needed

#### Production Checklist

- [ ] All environment variables configured
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Stripe production keys configured
- [ ] Google OAuth redirect URIs updated
- [ ] NEXTAUTH_URL set to production domain
- [ ] SSL certificate enabled (automatic on Vercel)
- [ ] Custom domain configured (optional)
- [ ] Analytics and monitoring enabled

### Alternative Deployment Options

#### Docker Deployment

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t navora .
docker run -p 3000:3000 --env-file .env.local navora
```

#### Self-Hosted (VPS/Dedicated Server)

1. **Install Node.js and npm**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and setup**
   ```bash
   git clone https://github.com/SiratimMChy/navora.git
   cd navora
   npm install
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "navora" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

#### AWS Deployment

- **EC2**: Deploy on virtual servers with full control
- **Lambda**: Serverless deployment with API Gateway
- **Amplify**: Managed hosting with Git integration
- **RDS**: Managed MongoDB alternative with DocumentDB

#### Other Platforms

- **Railway**: Simple Git-based deployment
- **Render**: Free tier with automatic deployments
- **Heroku**: Classic PaaS (paid tier)
- **DigitalOcean**: App Platform for managed deployment

### Environment Variables for Production

```env
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/navora

# Authentication
NEXTAUTH_SECRET=your_very_secure_random_string_here
NEXTAUTH_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Image Storage
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

# Payment Processing
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# AI Services
GROQ_API_KEY=your_groq_api_key

# Node Environment
NODE_ENV=production
```

### Monitoring & Maintenance

- **Error Tracking**: Set up Sentry for error monitoring
- **Performance**: Use Vercel Analytics for performance insights
- **Uptime**: Configure uptime monitoring with UptimeRobot
- **Backups**: Enable MongoDB Atlas automated backups
- **Logs**: Monitor application logs in Vercel dashboard

---

## 🔒 Security & Best Practices

### Security Features

#### Authentication & Authorization
- **NextAuth.js**: Industry-standard authentication with session management
- **Role-Based Access Control**: Admin, user, and guest roles with permission checks
- **Password Security**: bcryptjs hashing with configurable salt rounds
- **Session Tokens**: Secure, HTTP-only cookies for session management
- **Protected Routes**: Private pages accessible only to authenticated users

#### Data Protection
- **HTTPS Only**: All production traffic encrypted with TLS/SSL
- **Environment Variables**: Sensitive credentials stored securely outside codebase
- **MongoDB Security**: Connection string with authentication and IP whitelist
- **Stripe PCI Compliance**: Level 1 compliance for payment processing
- **Data Encryption**: Sensitive data encrypted at rest and in transit

#### API Security
- **Input Validation**: Server-side validation for all endpoints
- **CORS Configuration**: Controlled cross-origin access
- **Rate Limiting**: Prevent abuse and DDoS attacks
- **Error Handling**: Secure error messages without exposing system details
- **API Keys**: Groq and ImgBB API keys never exposed to client

### Best Practices

#### Development
- Never commit `.env.local` or `.env` files to version control
- Use strong, unique passwords for all services
- Enable two-factor authentication on cloud accounts
- Regularly update dependencies for security patches
- Use TypeScript for type safety and error prevention
- Follow ESLint rules for code quality

#### Deployment
- Use environment variables for all sensitive configuration
- Enable HTTPS/SSL on all production domains
- Configure MongoDB Atlas IP whitelist
- Set up automated backups for database
- Monitor application logs for suspicious activity
- Implement rate limiting on API endpoints
- Use Content Security Policy (CSP) headers

#### Maintenance
- Keep Node.js and npm updated
- Review and update dependencies monthly
- Monitor security advisories
- Implement automated security scanning
- Conduct regular security audits
- Test authentication and authorization flows

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
   ```bash
   # Click the Fork button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/navora.git
   cd navora
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style and conventions
   - Add comments for complex logic
   - Update documentation as needed

5. **Test Your Changes**
   ```bash
   npm run dev
   npm run lint
   ```

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m 'Add some AmazingFeature'
   ```

7. **Push to Your Fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

8. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your feature branch
   - Provide a clear description of your changes

### Contribution Guidelines

- **Code Style**: Follow existing code conventions and formatting
- **Commit Messages**: Write clear, descriptive commit messages
- **Documentation**: Update README and comments for new features
- **Testing**: Ensure all features work as expected
- **Pull Requests**: Keep PRs focused on a single feature or fix
- **Issues**: Check existing issues before creating new ones

### Areas for Contribution

- 🐛 Bug fixes and error handling improvements
- ✨ New features and enhancements
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage improvements
- 🌐 Internationalization (i18n)
- ♿ Accessibility improvements

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

### MIT License Summary

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

---

## 📧 Contact

**Project Maintainer**: Siratim Mustakim Chowdhury

- 📧 **Email**: [chowdhurysiratimmustakim@gmail.com](mailto:chowdhurysiratimmustakim@gmail.com)
- 🐙 **GitHub**: [@SiratimMChy](https://github.com/SiratimMChy)
- 💼 **LinkedIn**: [Siratim Mustakim Chowdhury](https://www.linkedin.com/in/siratim-mustakim-chowdhury/)

### Support & Questions

For questions, issues, or feature requests:

1. **Check Existing Issues**: Browse the [Issues](https://github.com/SiratimMChy/navora/issues) page
2. **Create New Issue**: Open a new issue with detailed information
3. **Email Support**: Contact via email for urgent matters
4. **Discussions**: Join discussions for general questions

---

## 🙏 Acknowledgments

### Technologies & Libraries

- [Next.js](https://nextjs.org/) - React framework with App Router
- [React](https://react.dev/) - UI library for building interfaces
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [NextAuth.js](https://next-auth.js.org/) - Authentication solution
- [Stripe](https://stripe.com/) - Payment processing
- [Groq](https://groq.com/) - AI inference engine
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [DaisyUI](https://daisyui.com/) - Component library
- [Recharts](https://recharts.org/) - Data visualization
- [Swiper](https://swiperjs.com/) - Carousel library

### Resources & Documentation

- [MDN Web Docs](https://developer.mozilla.org/) - Web development documentation
- [Stack Overflow](https://stackoverflow.com/) - Developer community
- [GitHub](https://github.com/) - Code hosting and collaboration
- [Vercel](https://vercel.com/) - Deployment platform
- [MongoDB University](https://university.mongodb.com/) - Database learning

### Special Thanks

- To all contributors who help improve this project
- The open-source community for amazing tools and libraries
- Users who provide valuable feedback and suggestions
- The Next.js and React communities for excellent documentation

---

## 📊 Project Statistics

- **Stack**: Next.js + React + TypeScript + MongoDB + Stripe + Groq AI
- **Total Lines of Code**: 15,000+
- **React Components**: 30+
- **API Endpoints**: 20+
- **MongoDB Collections**: 5
- **Supported Devices**: Desktop, Tablet, Mobile
- **Deployment Platforms**: Vercel, Docker, Self-hosted
- **Authentication Methods**: Email/Password, Google OAuth
- **Payment Currencies**: 135+

---

<div align="center">

**Made with ❤️ by Siratim Mustakim Chowdhury**

⭐ **Star this repository if you find it helpful!**

**[🌍 Visit Navora](https://navora-five.vercel.app)** | **[📧 Contact Me](mailto:chowdhurysiratimmustakim@gmail.com)** | **[🐙 GitHub](https://github.com/SiratimMChy)**

</div>
