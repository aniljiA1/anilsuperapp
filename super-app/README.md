# Super App 🚀

A multi-feature React dashboard combining registration, entertainment category onboarding,
live weather, rotating news, a countdown timer, persistent notes, and movie discovery —
built with **React + Vite**, **React Router**, **Zustand**, and **Tailwind CSS**.

## Features

- **Registration** — Name / Username / Email / Mobile with inline validation.
- **Category Onboarding** — pick at least 3 of 8 entertainment genres (toggleable chips/cards).
- **Dashboard**
  - User Profile widget (registration data + chosen categories)
  - Weather widget (OpenWeatherMap, geolocation with city fallback)
  - News widget (auto-rotates headlines every 2s)
  - Countdown Timer (custom H/M/S, start/pause/resume/reset, completion alert)
  - Notes widget (persisted to localStorage)
- **Entertainment Discovery** — movies grouped by your selected genres (OMDB), hover scale + shadow,
  click to open a details modal (poster, rating, runtime, plot, cast).
- Route guards: Categories requires registration; Dashboard/Movies require at least 3 categories.

## Tech Stack

- React 18 (Vite)
- React Router DOM v6
- Zustand (global state + localStorage persistence)
- Axios
- Tailwind CSS v4
- No prebuilt UI/component libraries — every component is hand-built.

## Getting Started

```bash
npm install
cp .env.example .env
# then fill in your API keys in .env
npm run dev
```

### Required API Keys (all free tiers)

| Variable | Provider | Get a key |
| --- | --- | --- |
| VITE_OPENWEATHER_API_KEY | OpenWeatherMap | https://openweathermap.org/api |
| VITE_NEWS_API_KEY | NewsAPI | https://newsapi.org |
| VITE_OMDB_API_KEY | OMDB | https://www.omdbapi.com/apikey.aspx |

If a key is missing, the relevant widget shows a friendly inline message instead of crashing.

Note: NewsAPI's free tier blocks requests from browsers in production (CORS/plan restriction) —
it works fine on localhost for development/demo purposes. For production, swap in World News API
or proxy the request through a serverless function.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/      # CategoryCard, UserProfileWidget, WeatherWidget,
│                       NewsWidget, TimerWidget, NotesWidget, MovieCard, MovieModal
├── pages/            # Register, Categories, Dashboard, Movies
├── services/         # weatherApi.js, newsApi.js, movieApi.js
├── store/            # useStore.js (Zustand)
├── routes/           # AppRoutes.jsx (route guards)
├── App.jsx
└── main.jsx
```

## Deployment

Deploy: https://anilsuperapp.vercel.app

## Design Reference

Figma: https://www.figma.com/design/8meikbND92bsdBPJQlE1XS/Super-App

## Author 
**Anil Kumar**


