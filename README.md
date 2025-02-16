This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environmebt Variables

First, add environment Variables.

Create a .env file and add the follwoing key with their corresponding values that you can get from Spotify API and Google Analytics

```bash
REACT_APP_SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
REACT_APP_SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
REACT_APP_SPOTIFY_REFRESH_TOKEN=YOUR_SPOTIFY_REFRESH_TOKEN
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback/spotify
GOOGlE_ANALYTICS_ID=G-YOUR_GOOGlE_ANALYTICS_ID
```

## Getting Started

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

