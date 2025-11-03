# Ryan Erick Portfolio

A modern, responsive portfolio website showcasing my work as a Full-Stack Developer, UI/UX Designer, and Software Engineer.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-purple)](https://vitejs.dev/)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 🌓 **Dark/Light Mode** - Theme switching for optimal viewing experience
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Fast Performance** - Built with Vite for lightning-fast load times
- 🎭 **Interactive Components** - Engaging animations using Framer Motion
- 🎵 **Spotify Integration** - Real-time now playing status
- 🤖 **AI Assistant** - Interactive AI-powered chat functionality
- 📝 **Blog & Guestbook** - Share thoughts and connect with visitors
- 💼 **Project Showcase** - Comprehensive portfolio of work
- 🎓 **Education & Experience** - Detailed career timeline
- 🏢 **NGO Gallery** - Highlighting community work and contributions

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+ recommended) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **bun** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Ryane23/Ryane23portfolio.git

# Navigate to project directory
cd Ryane23portfolio

# Install dependencies
npm install
# or with bun
bun install

# Start development server
npm run dev
# or with bun
bun dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe code for better development experience
- **Vite** - Next-generation frontend tooling
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icon library

### Backend & Services
- **Supabase** - Backend as a Service (authentication, database)
- **React Query** - Data fetching and state management
- **Vercel** - Deployment and hosting

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
ryan-erick-canvas-main/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, and other media
│   ├── components/     # React components
│   │   ├── ui/        # shadcn/ui components
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── AIAssistant.tsx
│   │   └── ...
│   ├── contexts/      # React contexts (Theme, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── integrations/  # Third-party integrations (Supabase)
│   ├── lib/           # Utility functions
│   ├── pages/         # Route pages
│   │   ├── Index.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   └── ...
│   ├── App.tsx        # Main App component
│   └── main.tsx       # Application entry point
├── supabase/          # Supabase configuration and functions
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

## 🎯 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## 🌐 Pages

- **Home (`/`)** - Landing page with hero section and overview
- **About (`/about`)** - Detailed information about skills and background
- **Projects (`/projects`)** - Portfolio of completed projects
- **Experience (`/experience`)** - Work history and professional experience
- **Contact (`/contact`)** - Get in touch form and contact information
- **Resume (`/resume`)** - Downloadable resume and credentials

## 🎨 Key Components

- **Hero** - Animated introduction section with typewriter effect
- **Navigation** - Responsive navigation with mobile menu
- **Projects** - Project cards with hover effects
- **AI Assistant** - Interactive chat interface
- **Spotify Now Playing** - Real-time music status
- **GitHub Profile** - Live GitHub statistics
- **Tech Stack** - Technologies and tools showcase
- **Guestbook** - Visitor comments and messages
- **Blog** - Articles and thoughts
- **NGO Gallery** - Community work showcase

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Tailwind Configuration

Customize the theme in `tailwind.config.ts` to match your brand colors and preferences.

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms

The project can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS Amplify

Simply run `npm run build` and deploy the `dist` folder.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Ryane23/Ryane23portfolio/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ryan Erick**
- Full-Stack Developer | UI/UX Designer | Software Engineer
- GitHub: [@Ryane23](https://github.com/Ryane23)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Lucide](https://lucide.dev/) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Supabase](https://supabase.com/) for backend services

---

<div align="center">
  Made with ❤️ by Ryan Erick
  <br />
  <sub>Built with React, TypeScript, and modern web technologies</sub>
</div>
