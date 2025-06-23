# TPO-Mockup

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) or local MongoDB instance

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/TPO-Mockup.git
cd TPO-Mockup/tpomockup
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the `tpomockup` directory with the following content:

```
MONGODB_URI=your-mongodb-connection-string
NODE_ENV=development
```

- Replace `your-mongodb-connection-string` with your actual MongoDB URI.

### 4. Add required assets

Place your logo image at:  
`tpomockup/public/image/logo.png`  
If the `image` folder does not exist, create it.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

- `app/` - Next.js app directory (pages, components, etc.)
- `components/` - Reusable React components (e.g., sidebar, header)
- `models/` - Mongoose models
- `pages/api/` - API routes (e.g., `/api/save`)
- `public/` - Static assets (images, etc.)
- `utils/` - Utility functions (e.g., MongoDB connection)

## Common Issues

- **MongoDB connection error:**  
  Make sure your `.env.local` is in the `tpomockup` folder and contains the correct `MONGODB_URI`.

- **Logo not showing:**  
  Ensure your logo is at `tpomockup/public/image/logo.png`.

- **Validation errors on form submit:**  
  All required fields must be filled in the form.

## Useful Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm start` - Start the production server

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

---

If you have any questions or issues, please open an issue or contact the maintainer.
