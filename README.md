# StudioSpace - Creative Studio Marketplace

StudioSpace is a creative studio marketplace where photographers, filmmakers,
podcasters, musicians, and other creators can discover and book professional
creative spaces. Studio owners can also list their spaces and manage bookings
through a user-friendly dashboard.

## 🚀 Live Website

[Visit StudioSpace](https://studio-space-platform.vercel.app/)

## ✨ Features

- Fully responsive design for mobile, tablet, and desktop.
- User authentication with Better Auth.
- Google social login.
- JWT-based authentication and token verification.
- Browse studios by category.
- Explore detailed studio information.
- Book studios by selecting date, start time, and duration.
- User dashboard with booking statistics.
- Add new studio listings.
- Edit and manage studio listings.
- View personal studio bookings.
- Manage booking statuses.
- Protected routes for authenticated users.
- Loading skeletons for better user experience.
- Light and dark theme support.
- Toast notifications for success and error messages.
- Dynamic studio details pages.
- REST API integration.

## 🛠️ Technologies Used

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React
- Sonner
- Swiper.js

### Authentication & Security

- Better Auth
- JWT (JSON Web Token)
- Jose

### Backend & Database

- Node.js
- Express.js
- MongoDB
- REST API

### Deployment

- Vercel

## 📦 Dependencies

- next
- react
- typescript
- better-auth
- jose
- tailwindcss
- lucide-react
- sonner
- swiper

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd studiospace-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_API_URL=your_backend_api_url

BETTER_AUTH_SECRET=your_auth_secret

BETTER_AUTH_URL=http://localhost:3000
```

Add any additional environment variables required by your Google authentication
configuration.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
src/
├── app/
│   ├── dashboard/
│   ├── studios/
│   │   ├── [slug]/
│   │   ├── edit/
│   │   └── page.tsx
│   ├── my-bookings/
│   ├── my-listings/
│   ├── add-studio/
│   ├── sign-in/
│   ├── sign-up/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── shared/
│   └── ...
│
├── lib/
│   ├── auth.ts
│   └── auth-client.ts
│
└── proxy.ts
```

## 📄 Main Routes

| Page            | Route             |
| --------------- | ----------------- |
| Home            | `/`               |
| Explore Studios | `/studios`        |
| Studio Details  | `/studios/[slug]` |
| Add Studio      | `/add-studio`     |
| Dashboard       | `/dashboard`      |
| My Bookings     | `/my-bookings`    |
| My Listings     | `/my-listings`    |
| Sign In         | `/sign-in`        |
| Sign Up         | `/sign-up`        |

## 🔐 Authentication & Security

StudioSpace uses Better Auth for user authentication and Jose for JWT-related
token handling.

- Email and password authentication.
- Google social authentication.
- Secure session management.
- JWT generation and verification.
- Protected routes.
- Authenticated API requests.
- User-specific booking and listing management.

## 🎯 Project Goal

The goal of StudioSpace is to connect creative professionals with studio owners
through a modern and user-friendly marketplace.

It makes discovering, booking, and managing creative spaces easier and more
convenient.

---

## 👨‍💻 Developer

**Tarek Rahman**

- GitHub: [tarekcodes62](https://github.com/tarekcodes62)
- LinkedIn: [Tarek Rahman](https://www.linkedin.com/in/tarek-rahman1/)

---

**Developed with ❤️ by Tarek Rahman**
