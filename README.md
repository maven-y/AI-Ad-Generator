# AI Ad Generator


Created a Java-based AI Ad Generator. 

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the GPT-3.5 APIs
- Spring Boot framework
- React JS for Front End
