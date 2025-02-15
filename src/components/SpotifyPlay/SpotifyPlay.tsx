import { useEffect, useRef } from "react";
import { Draggable } from "gsap/Draggable";
import { gsap } from "gsap";
import styles from "./SpotifyPlay.module.scss";

// Register GSAP plugins
gsap.registerPlugin(Draggable);

const SpotifyPlay = () => {
  const playlistId = "1RteAEMwIufI0mJ5pjYxwq";
  const draggableRef = useRef(null);
  const dragHandleRef = useRef(null);

  useEffect(() => {
    Draggable.create(draggableRef.current, {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: "body",
      trigger: dragHandleRef.current, // Use the handle as trigger
    });

    return () => {
      // Clean up Draggable instance
      if (Draggable.get(draggableRef.current)) {
        Draggable.get(draggableRef.current).kill();
      }
    };
  }, []);

  return (
    <div className={styles.spotifyPlay} ref={draggableRef}>
      <div className={styles.dragHandle} ref={dragHandleRef}>
        ⠿ What I listened to recently
      </div>
      <iframe
        title="Spotify Embed: Recommendation Playlist "
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        style={{ minHeight: "360px" }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
};

export default SpotifyPlay;