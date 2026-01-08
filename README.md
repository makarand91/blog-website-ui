# Strapi CMS Blog UI

A modern blog website UI built with React, Node.js, and Tailwind CSS that integrates with Strapi CMS.

## Features

- Responsive blog interface with Tailwind CSS
- Article listing with sponsored content support
- Individual article detail pages
- Category and tag support
- Author information display
- Markdown content rendering
- Modern, clean design

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Tailwind CSS for styling
- Vite for build tooling
- Axios for API calls
- React Markdown for content rendering

### Backend
- Node.js
- Express.js
- Axios for Strapi integration
- CORS enabled

## Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── index.js          # Express server
│   └── package.json
└── package.json          # Root package.json
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Running Strapi CMS instance

### Setup Steps

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blog-website-ui
```

2. Install all dependencies:
```bash
npm run install:all
```

Or install individually:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

3. Configure environment variables:

Create a `.env` file in the `server` directory:
```bash
cd server
cp .env.example .env
```

Edit `.env` with your Strapi configuration:
```
PORT=5000
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here
```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build

Build the frontend:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Strapi Configuration

Your Strapi CMS should have a `brands` collection with the following structure:

### Brands Collection
- `brandname` (String)
- `sponsor` (String)
- `logo` (Media - optional)
- `sponsor_logo` (Media - optional)
- `articles` (Relation - has many)

### Articles Collection (related to Brands)
- `title` (String)
- `slug` (String - unique)
- `content` (Rich Text/Markdown)
- `author` (String)
- `category` (JSON - array of strings)
- `tags` (String - optional)
- `is_sponsored` (Boolean)
- `publishedAt` (DateTime)

## API Endpoints

### Backend API (Express)

- `GET /api/brands` - Fetch all brands with their articles
- `GET /api/articles/:slug` - Fetch a specific article by slug
- `GET /health` - Health check endpoint

## Features

### Home Page
- Displays all articles from all brands
- Article cards with:
  - Title and excerpt
  - Author and publication date
  - Categories
  - Sponsored badge (if applicable)
  - Read more link

### Article Detail Page
- Full article content with Markdown rendering
- Author information
- Publication date
- Categories
- Sponsored content indicator
- Brand information

### Responsive Design
- Mobile-first approach
- Responsive grid layout
- Optimized for all screen sizes

## Customization

### Tailwind CSS

Customize the theme in `client/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
    },
  },
}
```

### API Configuration

Update the Strapi URL and API token in `server/.env`:
```
STRAPI_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your_token_here
```

## Troubleshooting

### Common Issues

1. **Cannot connect to Strapi**
   - Ensure Strapi is running
   - Check STRAPI_URL in server/.env
   - Verify API token permissions

2. **Port already in use**
   - Change PORT in server/.env
   - Update proxy configuration in client/vite.config.js

3. **Articles not displaying**
   - Verify Strapi collections structure matches expected format
   - Check browser console for errors
   - Verify API responses in Network tab

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC
