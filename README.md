# 🎬 Vidrate

**Vidrate** is a modern, beautifully designed web application that calculates YouTube video watch times at different playback speeds. Built with Next.js 16, React 19, and Tailwind CSS 4, it features a stunning dark/light mode interface with smooth animations and a premium user experience.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🎥 **YouTube Video Analysis** - Paste any YouTube URL and get instant video details
- ⚡ **Playback Speed Calculator** - See watch times at different speeds (0.25x to 2x)
- 🌓 **Dark/Light Mode** - Beautiful theme switching with smooth transitions
- 🎨 **Premium Design** - Modern UI with gradient meshes, glassmorphism, and micro-animations
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🚀 **Lightning Fast** - Built with Next.js App Router and React Server Components
- 🎭 **Smooth Animations** - Powered by Motion (Framer Motion)

## 🎯 Live Demo

Experience Vidrate in action by clicking this [Link](https://vidrate.vercel.app).

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16.1.6 (App Router)
- **UI Library:** React 19.2.3
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x
- **Animations:** Motion 12.29.2 (Framer Motion)
- **Icons:** React Icons 5.5.0

### Backend
- **API Routes:** Next.js API Routes
- **HTTP Client:** Axios 1.13.4
- **External API:** YouTube Data API v3

### Development Tools
- **Linting:** ESLint 9.x with Next.js config
- **Compiler:** Babel React Compiler 1.0.0
- **Package Manager:** npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm** or **bun**
- **YouTube Data API Key** (from Google Cloud Console)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vidrate.git
cd vidrate
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp sample.env .env
```

Add your YouTube API key to the `.env` file:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
```

> **Note:** To get a YouTube API key:
> 1. Go to [Google Cloud Console](https://console.cloud.google.com/)
> 2. Create a new project or select an existing one
> 3. Enable the **YouTube Data API v3**
> 4. Create credentials (API Key)
> 5. Copy the API key to your `.env` file

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
vidrate/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── video-fetching/
│   │   │       └── route.ts          # YouTube API endpoint
│   │   ├── globals.css               # Global styles & Tailwind theme
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   └── components/
│       ├── Home.tsx                  # Main component
│       ├── DayNightMode.tsx          # Theme toggle
│       ├── DisplayWatchTime.tsx      # Watch time calculator
│       └── ErrorMessage.tsx          # Error display
├── public/                           # Static assets
├── .env                              # Environment variables (not in git)
├── sample.env                        # Environment template
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind config
├── next.config.ts                    # Next.js config
└── README.md                         # This file
```

## 🎨 Design System

Vidrate uses a custom design system with:

- **Color Palette:**
  - Obsidian (Dark theme): `#0a0a0a` to `#3a3a3a`
  - Pearl (Light theme): `#fafafa` to `#d4d4d4`
  - Cinematic Red: `#dc2626`
  - Accent Cyan: `#06b6d4`

- **Typography:**
  - Display Font: Instrument Sans
  - Monospace Font: Space Mono

- **Effects:**
  - Gradient meshes
  - Glassmorphism
  - Glow shadows
  - Smooth transitions

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## 🌐 API Endpoints

### GET `/api/video-fetching`

Fetches YouTube video details.

**Query Parameters:**
- `url` (required): YouTube video URL

**Response:**
```json
{
  "title": "Video Title",
  "thumbnail": "https://...",
  "duration": "PT10M30S"
}
```

**Supported URL Formats:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`
- Mobile URLs (`m.youtube.com`)

## 🎯 Features in Detail

### Video Analysis
- Paste any YouTube URL
- Automatic video ID extraction
- Fetches title, thumbnail, and duration
- Displays original video duration

### Watch Time Calculator
- Calculates watch time at speeds: 0.25x, 0.5x, 0.75x, 1x, 1.25x, 1.5x, 1.75x, 2x
- Shows time saved/added compared to normal speed
- Color-coded speed indicators
- Responsive grid layout

### Theme System
- Smooth dark/light mode toggle
- Animated background gradients
- Floating orb effects
- Theme-aware components

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy Vidrate is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your `YOUTUBE_API_KEY` environment variable
4. Deploy!

### Other Platforms

Vidrate can be deployed to any platform that supports Next.js:
- **Netlify**
- **Railway**
- **AWS Amplify**
- **Google Cloud Run**
- **Docker**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Manish Kumar**
- Website: [manishmk.netlify.app](https://manishmk.netlify.app)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Motion](https://motion.dev/) - Animation library
- [YouTube Data API](https://developers.google.com/youtube/v3) - Video data
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## 📧 Support

If you have any questions or need help, please open an issue or contact me through my website.

---

<div align="center">
  Made with ❤️ by <a href="https://manishmk.netlify.app">Manish Kumar</a> · © 2026
</div>
