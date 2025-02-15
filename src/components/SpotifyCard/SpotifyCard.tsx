"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "./SpotifyCard.module.scss";

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  trackUrl: string;
  uri: string;
}

const SpotifyCard = () => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/spotify");
        setTrack(response.data);
      } catch (error) {
        console.error("Failed to fetch Spotify data:", error);
        setTrack(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="spotify-card loading">
        <div className="shimmer-art" />
        <div className="shimmer-text" />
        <div className="shimmer-subtext" />
      </div>
    );
  }

  if (!track) return null;

  return (
    <div>
      <a
        href={track.trackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.spotifyCard}
      >
        <div className={styles.spotifyCard__albumArtContainer}>
          <Image
            src={track.albumArt}
            alt={track.album}
            width={80}
            height={80}
            className={styles.spotifyCard__albumArtContainer__albumArt}
          />
        </div>

        <div className={styles.spotifyCard__trackInfo}>
          <div className={styles.spotifyCard__trackInfo__playingIndicator}>
              <span
                className={
                  styles.spotifyCard__trackInfo__playingIndicator__soundWave
                }
              />
              <span
                className={
                  styles.spotifyCard__trackInfo__playingIndicator__soundWave
                }
              />
              <span
                className={
                  styles.spotifyCard__trackInfo__playingIndicator__soundWave
                }
              />
            {track.isPlaying ? (
                <p>&nbsp; Listening now</p>
            ) : (
              <p>Last played</p>
            )}
          </div>
          <p>
            {track.title}, {track.artist}
          </p>
        </div>
      </a>
    </div>
  );
};

export default SpotifyCard;
