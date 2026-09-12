# Dwellr

Dwellr is a full-stack accommodation marketplace built with Node.js, Express, MongoDB, Mongoose, and EJS. It allows guests to explore available stays and hosts to create, update, and manage property listings.

## Features

- Browse accommodation listings
- Search listings by location or country
- View listing details, images, prices, and reviews
- Create, edit, and delete listings
- Upload listing images through Cloudinary
- Local user registration and login
- Session-based authentication with Passport
- Protected host and review actions
- Create and delete listing reviews
- Flash messages for success and error states
- Privacy policy, terms of service, and company information pages
- Responsive Airbnb-inspired interface

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS and EJS Mate
- Passport and Passport Local
- Express Session
- Joi validation
- Multer and Cloudinary
- Bootstrap
- Font Awesome
- Leaflet

## Project Structure

```text
Dwellr/
├── app.js                 # Express application entrypoint
├── cloudConfig.js         # Cloudinary configuration
├── schema.js              # Joi validation schemas
├── controller/            # Route controller logic
├── models/                # Mongoose models
├── routes/                # Application routes
├── views/                 # EJS templates
├── public/                # CSS, JavaScript, and static assets
├── utils/                 # Middleware and utility helpers
└── init/                  # Database seed scripts
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB running locally or a MongoDB connection
- Cloudinary account for listing image uploads

## Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/dwellr.git
cd dwellr
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```env
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
```

Do not commit `.env` or any file containing credentials.

4. Make sure MongoDB is running. The application currently connects to:

```text
mongodb://localhost:27017/Dwellr
```

5. Start the application:

```bash
npm run dev
```

For a production-style start:

```bash
npm start
```

The application runs at:

```text
http://localhost:3000
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the application with Node.js |
| `npm run dev` | Start the application with Nodemon |
| `npm test` | Test command placeholder |

## Main Routes

| Route | Description |
| --- | --- |
| `/listings` | Browse listings |
| `/listings/new` | Create a listing for authenticated users |
| `/listings/:id` | View a listing |
| `/listings/:id/edit` | Edit an owned listing |
| `/signup` | Create an account |
| `/login` | Log in |
| `/logout` | Log out |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/company` | Company details |

## Security Notes

- Keep Cloudinary credentials in environment variables.
- Use a strong session secret before deploying to production.
- Replace the local MongoDB URL with a secure production connection string.
- Configure secure cookies and HTTPS in production.
- Review and update the privacy policy and terms before public launch.

## Author

Created and maintained by **Pulkit Sharma**.

## License

This project is released under the ISC License. See `package.json` for the current license declaration.
