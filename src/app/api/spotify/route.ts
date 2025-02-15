import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get access token using refresh token
    const { access_token } = await refreshAccessToken();

    // Get currently playing track
    const nowPlaying = await fetchNowPlaying(access_token);
    if (nowPlaying) return NextResponse.json(nowPlaying);

    // Fallback to last played track
    const lastPlayed = await fetchLastPlayed(access_token);
    if (lastPlayed) return NextResponse.json(lastPlayed);

    // Fallback to top track
    const topTrack = await fetchTopTrack(access_token);
    return NextResponse.json(topTrack);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Spotify data" },
      { status: 500 }
    );
  }
}

async function refreshAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  const data = await response.json();
  return { access_token: data.access_token };
}

async function fetchNowPlaying(accessToken: string) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    // return formatTrackResponse(data, true)
    return {
      isPlaying: true,
      title: data.item.name,
      artist: data.item.artists.map((a: any) => a.name).join(", "),
      album: data.item.album.name,
      albumArt: data.item.album.images[0].url,
      trackUrl: data.item.external_urls.spotify,
    };
  }
}

async function fetchTopTrack(accessToken: string) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=1",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const data = await response.json();
  const track = data.items[0];

  return {
    isPlaying: false,
    title: track.name,
    artist: track.artists.map((a: any) => a.name).join(", "),
    album: track.album.name,
    albumArt: track.album.images[0].url,
    trackUrl: track.external_urls.spotify,
  };
}
async function fetchLastPlayed(accessToken: string) {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Missing required scope: user-read-recently-played");
      }
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.items?.length) return null;

    const track = data.items[0].track;
    //   return formatTrackResponse(track, false);
    return {
      isPlaying: false,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      album: track.album.name,
      albumArt: track.album.images[0].url,
      trackUrl: track.external_urls.spotify,
    };
  } catch (error) {
    console.error("Failed to fetch last played:", error);
    return null;
  }
}

//   function formatTrackResponse(track: any, isPlaying: boolean) {
//     return {
//       isPlaying,
//       title: track.item.name || track.name,
//       artist: track.item.artists.map((a: any) => a.name).join(', '),
//       album: track.item.album.name,
//       albumArt: track.item.album.images[0]?.url || '/default-album.png',
//       trackUrl: track.item.external_urls.spotify,
//       uri: track.item.uri
//     };
//   }
