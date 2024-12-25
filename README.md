# CSBSJU Dining Battle

A real-time dining comparison application for College of Saint Benedict and Saint John's University dining halls. Compare crowd levels, share feedback, and check weather conditions at both campuses.

## Overview

CSBSJU Dining Battle lets students check real-time crowd levels, share feedback, and compare dining conditions at both Gorecki (CSB) and Refectory (SJU) dining halls. Stay updated with weather conditions and make informed decisions about where to eat!

## 🚀 Features

- Real-time crowd level monitoring
- Weather conditions for both campuses
- User voting system
- Emoji reactions
- Feedback submission system
- Automatic updates every 20 minutes
- Mobile-responsive design
- Dark mode support
- Accessibility-focused UI
- Local storage persistence

## 💻 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: 
  - Tailwind CSS for utility-first styling
  - CSS Variables for theming
  - CSS Modules for component styles
- **UI Components**: 
  - shadcn/ui for base components
  - Custom React components
  - Lucide React for icons
- **State Management**: 
  - React Hooks
  - Local Storage
  - Custom hooks for shared logic
- **APIs & Data**: 
  - WeatherStack API for weather data
  - Local Storage for data persistence
  - Custom caching system
- **Development Tools**:
  - ESLint for code linting
  - PostCSS for CSS processing
  - TypeScript for type safety

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css         # Global styles and Tailwind directives
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Home page component
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── CampusCard.tsx      # Individual campus card component
│   ├── DiningVoteSystem.tsx# Main dining system component
│   └── WeatherDisplay.tsx  # Weather display component
├── lib/
│   ├── dining-hours.ts     # Dining schedule configuration
│   ├── storage.ts          # Local storage utilities
│   ├── utils.ts            # General utility functions
│   └── weather.ts          # Weather API integration
└── types/
    ├── dining.types.ts     # Dining-related type definitions
    ├── index.ts            # Type exports
    └── weather.types.ts    # Weather-related type definitions
```

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/nasirmirza/csbsju-dining.git
cd csbsju-dining
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Add your WeatherStack API key to `.env.local`:
```
NEXT_PUBLIC_WEATHERSTACK_API_KEY=your_api_key_here
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Configuration

### Dining Hours Configuration

Dining hours are configured in `src/lib/dining-hours.ts`. The schedule includes:
- Weekday/weekend hours for CSB (Gorecki)
- Breakfast, lunch, and dinner times for SJU (Refectory)
- Special Sunday hours and holiday schedules

### Weather Updates

Weather data management is handled through multiple systems:
- Data is cached for 5 minutes to minimize API calls
- Automatic updates every 10 minutes
- Supports both Fahrenheit and Celsius displays
- Error handling for API failures

### Crowd Level System

The crowd monitoring system includes:
- Resets every 20 minutes for fresh data
- Three levels: Low, Medium, High
- Anonymous voting to prevent manipulation
- Historical tracking for trend analysis

## 🎨 Styling System

The project uses a comprehensive styling system:
- Tailwind CSS for utility classes
- CSS Variables for theme customization
- Custom animations and transitions
- Responsive design breakpoints
- Dark mode support
- Custom component variants

### Custom Theme Variables
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
  /* Additional theme variables */
}
```

## 💾 Data Persistence

Local storage is used to persist:
- Vote counts and percentages
- User feedback and reactions
- Crowd level reports
- Daily statistics
- User preferences

## 📱 Responsive Design

The application is fully responsive across:
- Desktop monitors (1200px+)
- Laptops (1024px)
- Tablets (768px)
- Mobile phones (320px+)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain component modularity
- Write unit tests for new features
- Update documentation as needed
- Follow the established code style

## 📈 Future Enhancements

Planned features and improvements:
- User authentication system
- Menu integration
- Nutrition information
- Wait time estimations
- Special event notifications
- Push notifications

## 🐛 Known Issues

Current limitations and known bugs:
- Weather API rate limiting on free tier
- Local storage limitations
- Mobile performance optimization needs

## 👤 Author

- **Nasir Mirza**
  - GitHub: [@nasirmirza](https://github.com/nasirmirza)
  - LinkedIn: [Nasir Mirza](https://www.linkedin.com/in/nasir-mirzacs/)
  - Website: [nasirmirza.com](https://nasirmirza.com)

## 🙏 Acknowledgments

- College of Saint Benedict and Saint John's University for inspiration
- WeatherStack API for weather data
- shadcn/ui team for the component library
- Next.js team for the amazing framework
- The open source community for various tools and libraries

---

Made with ❤️ by Nasir Mirza for Johnnies & Bennies 
