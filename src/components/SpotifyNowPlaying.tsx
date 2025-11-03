import { motion } from "framer-motion";
import { Music2, Play } from "lucide-react";

// This component displays a static "Now Playing" widget
// To make it dynamic, you would need to integrate the Spotify API
const SpotifyNowPlaying = () => {
  const isPlaying = false; // Set to true when integrated with Spotify API
  const currentTrack = {
    name: "Not currently playing",
    artist: "",
    albumArt: null
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="fixed bottom-24 left-8 z-40 hidden lg:block"
    >
      <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-4 shadow-glow max-w-xs">
        <div className="flex items-center gap-3 mb-2">
          <Music2 className={`w-5 h-5 ${isPlaying ? 'text-green-500' : 'text-muted-foreground'}`} />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isPlaying ? 'Now Playing on Spotify' : 'Spotify'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {currentTrack.albumArt ? (
            <img 
              src={currentTrack.albumArt} 
              alt="Album art" 
              className="w-12 h-12 rounded-lg"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              <Play className="w-6 h-6 text-muted-foreground" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="font-medium truncate text-sm">
              {currentTrack.name}
            </p>
            {currentTrack.artist && (
              <p className="text-xs text-muted-foreground truncate">
                {currentTrack.artist}
              </p>
            )}
          </div>
        </div>

        {!isPlaying && (
          <p className="text-xs text-muted-foreground mt-3">
            Connect Spotify API to display live playback
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default SpotifyNowPlaying;
