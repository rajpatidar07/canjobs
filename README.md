# CanJobs

A comprehensive job portal application built with React, providing features for job seekers, employers, and administrators to manage job postings, applications, and related functionalities.

## Project Overview

CanJobs is a full-featured job portal that includes:
- Job posting and management
- Applicant tracking and management
- Admin dashboard with various management tools
- Partner management system
- Payment integrations (PayPal, Stripe, Braintree)
- Document generation and viewing capabilities
- Real-time notifications and messaging

## Latest Branch

**june2024** - This is the latest stable branch containing all recent updates and features.

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 16.x or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git** for version control

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended for development)
- **Storage**: At least 2GB free space

## Quick Setup Steps

| Step No.| Category             | Description                  | Command/Link                            | Working Branch |
|---------|----------------------|------------------------------|-----------------------------------------|----------------|
| 1       | Prerequisite         | Install Node.js              | https://nodejs.org/en                   |                |
| 2       | Prerequisite         | Install Git                  | https://git-scm.com                     |                |
| 3       | Prerequisite         | Install VS Code              | https://code.visualstudio.com/          |                |
| 4       | Clone Repository     | Clone a starter React.js repo| https://github.com/rajpatidar07/canjobs | June2025       |
| 5       | Install Dependencies | Install npm packages         | npm install                             |                |
| 6       | Start Project        | Run local dev server         | npm start                               |                |

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rajpatidar07/canjobs.git
   cd canjobs
   ```

2. **Switch to the latest branch:**
   ```bash
   git checkout june2024
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **API Configuration:**
   - Ensure the API URL is correctly configured in your environment (see API Configuration section below)

## Running the Application

### Development Mode

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

### Production Build

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

### Serving the Production Build

To serve the production build locally:

```bash
npm run serve
```

The production build will be served at `http://localhost:5000` (or the port specified by serve)

## Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Creates a production build
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (irreversible)
- `npm run serve` - Serves the production build locally
- `npm run webviewer-server` - Runs the PDF viewer server

## Project Structure

```
canjobs/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── api/               # API configuration and calls
│   ├── components/        # React components
│   │   ├── admin/        # Admin-specific components
│   │   ├── common/       # Shared components
│   │   └── forms/        # Form components
│   ├── json/             # Static JSON data
│   └── utils/            # Utility functions
├── build/                 # Production build output
├── node_modules/          # Dependencies
├── package.json           # Project configuration
├── server.js             # Server configuration
└── README.md             # This file
```

## Key Features

### For Job Seekers
- Browse and search job listings
- Apply to jobs with resume upload
- Track application status
- Profile management

### For Employers
- Post and manage job listings
- Review and manage applications
- Communication with candidates
- Analytics and reporting

### For Administrators
- User management (admins, managers, executives)
- Content management (categories, filters)
- System configuration
- Payment management
- Reporting and analytics

## Technology Stack

### Frontend
- **React** 18.2.0 - UI framework
- **React Router** - Client-side routing
- **Bootstrap** 4.5.2 - CSS framework
- **React Bootstrap** - Bootstrap components for React
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React Select** - Select components

### Integrations
- **PayPal** - Payment processing
- **Stripe** - Payment processing
- **Braintree** - Payment processing
- **PDFTron** - PDF viewing and manipulation
- **Google OAuth** - Social login
- **LinkedIn OAuth** - Social login

### Document Processing
- **PDF-lib** - PDF generation
- **JSZip** - File compression
- **html2pdf.js** - HTML to PDF conversion
- **Docx** - Word document processing

## API Configuration

The application uses different API endpoints based on the environment:

### Local Development
```
const API_URL = "https://api-dev.canpathwaysjobs.com/"
```

### Production (New AWS Backend)
```
const API_URL = "https://api.canpathwaysjobs.com/canjobs/";
```

All API calls are configured in the `src/api/` directory. Ensure the proxy URL is correctly set in your environment.

## Deployment

### Build for Production

1. Create production build:
   ```bash
   npm run build
   ```

2. The build artifacts will be stored in the `build/` directory.

3. Deploy the contents of the `build/` directory to your web server.

### Server Configuration

The application includes a `server.js` file for server-side configuration. Make sure to configure your production server accordingly.

## Testing

Run the test suite:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## Support

For support and questions:
- Check the documentation in this README
- Review the code comments in the source files
- Contact the development team

## License

This project is proprietary software. All rights reserved.

## Version History

- **v0.1.3** - Current version
  - Latest updates and bug fixes
  - Responsive design improvements
  - New admin features

---

**Note:** Always ensure you're working on the latest branch (`june2024`) for the most recent features and bug fixes.
