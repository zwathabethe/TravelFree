# TravelFree - Your Personal Travel Planning Assistant

TravelFree is a modern web application that helps users plan their perfect trip by providing personalized travel recommendations, budget planning, and detailed itineraries.

## Features

- **Destination Selection**: Choose from popular destinations or search for specific locations
- **Interest-Based Planning**: Select from various interest categories and add custom preferences
- **Budget Management**: Plan your daily expenses for accommodation, food, and activities
- **Duration Planning**: Select travel dates or choose from suggested trip durations
- **Group Management**: Specify the number of adults and children in your travel group
- **Detailed Summary**: Get a comprehensive overview of your travel plan
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- React Hook Form for form management
- Date-fns for date manipulation
- React DatePicker for date selection

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/zwathabethe/TravelFree.git
   cd TravelFree
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── forms/       # Form components
│   │   └── steps/   # Multi-step form components
│   ├── layout/      # Layout components
│   ├── ui/          # UI components
│   └── map/         # Map-related components
├── lib/             # Utility functions and constants
├── types/           # TypeScript type definitions
├── hooks/           # Custom React hooks
└── styles/          # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by popular travel planning platforms
- Built with modern web technologies
- Designed for optimal user experience 