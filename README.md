# AI Ad Generator


Created a Java-based AI Ad Generator. 



![Details Screen](https://github.com/maven-y/AI-Ad-Generator/blob/f2f014b24803d465d63b867809aad3830f559bf0/1.png)




# AI Ad Generator Backend

Using Spring Boot for the backend and integrating with AI services for text and image generation.

An AI-powered advertisement generator that produces new, on-brand ads from reference ads. This application uses OpenAI's GPT-3.5 to generate creative advertisements while maintaining brand consistency.


## Features

- Generate new ads from reference ads while maintaining brand consistency
- Support for multiple ad formats (social media, banners, email)
- Image generation using DALL-E
- Brand guideline integration
- Ad refinement capabilities
- Multiple variation generation

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/maven-y/AI-Ad-Generator.git
cd AI-Ad-Generator
```

2. Configure OpenAI API key:
   - Open `src/main/resources/application.properties`
   - Replace `your-api-key-here` with your actual OpenAI API key

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The application will be available at `http://localhost:8080`

## Usage

1. Create a Brand:
   - Define brand guidelines including colors, fonts, tone of voice, and target audience
   - Add style keywords and brand personality traits

2. Add Reference Ads:
   - Upload existing ads as references
   - Specify ad type, platform, and content
   - Include images if available

3. Generate New Ads:
   - Select a reference ad
   - Choose generation parameters
   - Get multiple variations
   - Refine generated ads as needed

## API Endpoints

- `POST /api/brands` - Create a new brand
- `POST /api/reference-ads` - Add a reference ad
- `POST /api/generate` - Generate new ads
- `POST /api/refine` - Refine an existing ad

# AI Ad Generator Frontend

A modern React application for generating AI-powered advertisements using Material-UI components and a responsive design.

## Features

- 🎨 **Ad Generation**: Create custom ads using AI with brand-specific styling
- 🏢 **Brand Management**: Manage and organize brands with their unique attributes
- 📑 **Reference Ads**: Store and use reference ads for better AI generation
- 📱 **Responsive Design**: Fully responsive layout that works on all screen sizes
- 🎯 **Category-based Generation**: Generate ads for specific business categories

## Tech Stack

- **React**: Frontend library for building user interfaces
- **Material-UI (MUI)**: React component library for consistent design
- **React Router**: Navigation and routing
- **Axios**: HTTP client for API requests
- **TypeScript**: Type-safe JavaScript

## Project Structure

```
front_end/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   │   └── GenerateAd.tsx  # Main ad generation page
│   ├── types/         # TypeScript interfaces and types
│   │   └── Category.ts     # Category-related types
│   ├── theme/         # Material-UI theme customization
│   ├── services/      # API services and utilities
│   ├── App.tsx        # Main application component
│   └── index.tsx      # Application entry point
├── public/           # Static assets
└── package.json      # Project dependencies
```

## Key Components

### GenerateAd Page
- Main interface for ad generation
- Features:
  - Brand selection
  - Reference ad selection
  - Category-based generation
  - Customization options (text, colors, position)
  - Real-time preview
  - API response display

### Theme Customization
- Custom breakpoints (up to 2000px)
- Responsive container settings
- Material-UI component overrides
- 

### Both servers are :
- The Spring Boot backend server will be accessible at http://localhost:8084
- The React frontend server will be accessible at http://localhost:3000

## Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Development Guidelines

1. **Component Structure**
   - Use TypeScript interfaces for props
   - Implement responsive design
   - Follow Material-UI best practices

2. **State Management**
   - Use React hooks for local state
   - Implement proper error handling
   - Maintain loading states

3. **Styling**
   - Use Material-UI's `sx` prop for styling
   - Follow theme customization
   - Ensure responsive behavior

4. **API Integration**
   - Use axios for API calls
   - Handle loading and error states
   - Validate response data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the GPT-3.5 APIs
- Spring Boot framework
- React JS for Front End
