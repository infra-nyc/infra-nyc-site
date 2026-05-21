# infra.nyc

Production Next.js 15 website for `infra.nyc`, a private infrastructure engineering community.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives
- Framer Motion
- Vercel-ready API route at `/api/apply`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Application Backend

The application form posts to `/api/apply`. Configure either Airtable or Google Sheets environment variables in Vercel.

Airtable is the simplest production option:

```bash
AIRTABLE_API_KEY=pat_xxxxxxxxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxxxxxx
AIRTABLE_TABLE_NAME=Applications
```

For Google Sheets, create a service account, share the sheet with the service account email, then set:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=infra-nyc-writer@example.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_SHEET_TAB=Applications
```

The sheet tab should include headers for timestamp, name, email, company, role, LinkedIn, city, and interests.

## Deploying To Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the environment variables from `.env.example`.
4. Deploy.

Vercel will run `next build` automatically.
