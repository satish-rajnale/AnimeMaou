# AnimeMaou - Modern Anime Discovery Platform

A modern, responsive anime discovery platform built with React and the Jikan REST API v4. Discover, search, and track your favorite anime with a beautiful, user-friendly interface.

## ✨ Features

### 🎯 Core Functionality
- **Modern Jikan API v4 Integration**: Fully updated to use the latest Jikan REST API endpoints
- **Advanced Search**: Debounced search with filters for type, status, rating, and sorting options
- **Comprehensive Anime Details**: Full anime information including synopsis, trailer, relations, and recommendations
- **Watchlist Management**: Save and manage your favorite anime locally
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 User Experience
- **Loading Skeletons**: Beautiful loading states for better perceived performance
- **Error Handling**: User-friendly error messages with retry functionality
- **Dark/Light Theme**: Toggle between light and dark themes
- **Smooth Animations**: Modern hover effects and transitions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### 📱 Pages & Navigation
- **Home**: Featured content with hero section and trending anime
- **Top Anime**: Browse popular anime with multiple filter options
- **Seasonal**: Currently airing anime for the current season
- **Upcoming**: Anime scheduled to release soon
- **Search Results**: Advanced search with filters and pagination
- **Watchlist**: Personal collection of saved anime
- **Anime Details**: Comprehensive information pages with trailers and related content

### 🔧 Technical Improvements
- **React Query**: Efficient data fetching with caching and background updates
- **Modern React**: Updated to React 18 with hooks and functional components
- **Axios**: Robust HTTP client with interceptors for rate limiting
- **CSS Variables**: Dynamic theming with CSS custom properties
- **Component Architecture**: Reusable, modular components
- **Performance**: Lazy loading, image optimization, and efficient rendering

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AnimeMaou
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── api/                 # API layer and Jikan integration
│   └── jikanApi.js     # Jikan v4 API functions
├── components/          # Reusable UI components
│   └── ui/             # Modern UI components
│       ├── AnimeCard.js
│       ├── Header.js
│       ├── LoadingSkeleton.js
│       ├── Pagination.js
│       └── SearchBar.js
├── hooks/              # Custom React hooks
│   └── useAnime.js     # Data fetching hooks
├── pages/              # Page components
│   ├── Home.js
│   ├── AnimeDetail.js
│   ├── TopAnime.js
│   ├── Seasonal.js
│   ├── Upcoming.js
│   ├── Watchlist.js
│   └── SearchResults.js
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions and constants
└── App.js              # Main application component
```

## 🔌 API Integration

### Jikan v4 Endpoints Used
- `GET /anime` - Search anime with filters
- `GET /top/anime` - Get top anime lists
- `GET /anime/{id}/full` - Get detailed anime information
- `GET /anime/{id}/pictures` - Get anime images
- `GET /anime/{id}/relations` - Get related anime
- `GET /anime/{id}/recommendations` - Get anime recommendations
- `GET /seasons/now` - Current season anime
- `GET /seasons/upcoming` - Upcoming anime
- `GET /genres/anime` - Get anime genres

### Rate Limiting
The application includes built-in rate limiting to respect Jikan API limits (1 request per second).

## 🎨 Theming

The application supports both light and dark themes with CSS variables:

```css
:root {
  --primary-color: #6366f1;
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
  /* ... more variables */
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  /* ... dark theme variables */
}
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **React Router v6** - Client-side routing
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **Lucide React** - Modern icon library
- **CSS3** - Custom styling with CSS variables

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. Build the application:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Jikan API](https://docs.api.jikan.moe/) - Unofficial MyAnimeList API
- [MyAnimeList](https://myanimelist.net/) - Anime database
- [Lucide](https://lucide.dev/) - Beautiful icons
- [React Query](https://tanstack.com/query) - Powerful data fetching

---

**Note**: This application uses the Jikan API which is an unofficial MyAnimeList API. Please respect their rate limits and terms of service.
