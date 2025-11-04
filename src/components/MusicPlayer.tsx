import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useLocation } from "react-router-dom";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();

  // Determine which track to play based on route
  const currentTrack = location.pathname === '/projects' 
    ? '/music/nemzzz-track.mp3' 
    : '/music/mgmt-little-dark-age.mp3';

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      
      // Add error handler
      audioRef.current.addEventListener('error', () => {
        console.error(`Failed to load audio: ${currentTrack}`);
        setHasError(true);
        setIsPlaying(false);
      });
      
      // Add loaded handler
      audioRef.current.addEventListener('loadeddata', () => {
        setHasError(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle track changes
  useEffect(() => {
    if (audioRef.current && audioRef.current.src !== currentTrack) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = currentTrack;
      audioRef.current.load();
      
      setHasError(false); // Reset error state on track change
      
      if (wasPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Failed to play audio:', error);
          setHasError(true);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error('Failed to play audio:', error);
          setHasError(true);
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-4 shadow-glow">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:shadow-glow"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" fill="white" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" fill="white" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:shadow-glow"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium truncate">
              {location.pathname === '/projects' ? 'Nemzzz' : 'MGMT - Little Dark Age'}
            </span>
            <span className="text-xs text-muted-foreground">
              {hasError ? "Track unavailable" : isPlaying ? "Now Playing" : "Paused"}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
          />
        </div>

        {isPlaying && (
          <div className="mt-3 flex gap-1 items-end h-8">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-white/60 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "0.8s"
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
