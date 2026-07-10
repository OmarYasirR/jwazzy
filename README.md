\# Travel Booking Platform

  

\## Overview

  

This repository contains the source code for a modern travel booking platform that allows users to browse destinations, view tours, make bookings, and process secure payments. The application is built with a decoupled architecture, leveraging React for the frontend, Sanity as the headless CMS for content management, and Stripe for payment processing. Serverless functions handle payment confirmation and intent creation.

  

\## Features

  

\- User authentication (registration, login, password reset)

\- Browse tours and destinations with dynamic content from Sanity

\- Detailed tour pages with galleries, pricing, and itineraries

\- Booking system with date selection and availability

\- Secure payment processing via Stripe

\- User dashboard to view and manage bookings

\- Multilingual support (i18n)

\- Dark/light theme toggle

\- Responsive design with Tailwind CSS

\- Offline network status detection

\- Serverless API endpoints for payment operations

  

\## Technology Stack

  

\### Frontend

\- React 18

\- React Router v6

\- Tailwind CSS

\- Vite (build tool)

\- Context API for state management (Auth, Booking, Language, Theme, Stripe)

  

\### CMS / Backend

\- Sanity.io (headless CMS)

\- Sanity Studio for content management

  

\### Payments

\- Stripe API

\- Stripe Elements for secure card input

  

\### Serverless Functions

\- Netlify Functions (or similar) – located in \`/api\`

  

\### Additional Libraries

\- Axios for HTTP requests

\- React Hook Form (or similar) for forms

\- i18next for internationalization

\- jsPDF (or similar) for invoice generation

  

\## Project Structure

  

\`\`\`

├── api

│   ├── confirm-payment.js       # Serverless function to confirm payment

│   └── create-payment-intent.js # Serverless function to create Stripe PaymentIntent

├── config

│   ├── app.config.js            # App-wide configuration

│   └── stripe.config.js         # Stripe configuration

├── public

│   └── manifest.json

├── sanity-studio               # Sanity CMS studio

│   ├── components

│   ├── plugins

│   ├── schemas                 # Content schemas (documents & objects)

│   ├── sanity.cli.js

│   └── sanity.config.js

├── src

│   ├── components              # Reusable UI components

│   ├── config                  # Sanity client configuration

│   ├── contexts                # React contexts

│   ├── hooks                   # Custom hooks

│   ├── lib                     # Library utilities (Sanity client, Stripe)

│   ├── pages                   # Application pages

│   ├── services                # API and external service integrations

│   └── utils                   # Utility functions (i18n, constants, invoice)

├── index.html

├── package.json

├── tailwind.config.js

├── vite.config.js

└── README.md

\`\`\`

  

\## Prerequisites

  

\- Node.js (v16 or later)

\- npm or yarn

\- A Stripe account (for payment processing)

\- A Sanity account (for content management)

\- Netlify account (or similar) for serverless functions deployment (optional)

  

\## Installation

  

1\. Clone the repository:

   \`\`\`bash

   git clone https://github.com/your-username/travel-booking-platform.git

   cd travel-booking-platform

   \`\`\`

  

2\. Install dependencies for the main application:

   \`\`\`bash

   npm install

   \`\`\`

  

3\. Navigate to the Sanity studio and install its dependencies:

   \`\`\`bash

   cd sanity-studio

   npm install

   cd ..

   \`\`\`

  

\## Environment Variables

  

Create a \`.env\` file in the root directory with the following variables:

  

\`\`\`

\# Sanity

VITE\_SANITY\_PROJECT\_ID=your\_sanity\_project\_id

VITE\_SANITY\_DATASET=production

  

\# Stripe

VITE\_STRIPE\_PUBLISHABLE\_KEY=pk\_test\_...

STRIPE\_SECRET\_KEY=sk\_test\_...

  

\# API Base URL (if using Netlify functions locally)

VITE\_API\_BASE\_URL=http://localhost:8888/.netlify/functions

\`\`\`

  

For the Sanity studio, you can create a \`.env\` in the \`sanity-studio\` folder if needed (usually not required if using sanity init).

  

\## Running the Application

  

\### Development Mode

  

Start the frontend development server:

\`\`\`bash

npm run dev

\`\`\`

  

Start the Sanity studio (optional – for content editing):

\`\`\`bash

cd sanity-studio

npm run dev

\`\`\`

  

If using Netlify Functions locally, you can run:

\`\`\`bash

netlify dev

\`\`\`

This will serve functions from the \`/api\` folder.

  

\### Production Build

  

Build the frontend:

\`\`\`bash

npm run build

\`\`\`

  

Preview the production build:

\`\`\`bash

npm run preview

\`\`\`

  

\## Deployment

  

\### Frontend

The frontend can be deployed to any static hosting service (Netlify, Vercel, AWS S3). Configure the build command as \`npm run build\` and the publish directory as \`dist\`.

  

\### Serverless Functions

The \`/api\` folder contains functions that can be deployed as Netlify Functions. If using Netlify, include a \`netlify.toml\` file:

  

\`\`\`toml

\[build\]

  command = "npm run build"

  functions = "api"

  publish = "dist"

\`\`\`

  

\### Sanity Studio

The Sanity studio can be deployed using the Sanity CLI:

\`\`\`bash

cd sanity-studio

sanity deploy

\`\`\`

  

\## Content Management

  

Content (tours, destinations, categories, bookings, payments, users, reviews) is managed through the Sanity Studio. After deploying the studio, you can access it at your studio URL and create/edit content.

  

\## Payment Flow

  

1\. User selects a tour and proceeds to checkout.

2\. Frontend requests a PaymentIntent from the serverless function \`create-payment-intent\`.

3\. The function creates a PaymentIntent using Stripe and returns the client secret.

4\. The frontend uses Stripe Elements to collect card details and confirm the payment.

5\. On successful confirmation, the frontend calls \`confirm-payment\` to store booking details in Sanity.

6\. The user receives a booking confirmation.

  

\## Contributing

  

Contributions are welcome! Please follow these steps:

  

1\. Fork the repository.

2\. Create a feature branch (\`git checkout -b feature/your-feature\`).

3\. Commit your changes (\`git commit -m 'Add some feature'\`).

4\. Push to the branch (\`git push origin feature/your-feature\`).

5\. Open a pull request.

  

Please ensure your code follows the existing style and includes appropriate tests.

  

\## License

  

This project is licensed under the MIT License – see the \[LICENSE\](LICENSE) file for details.