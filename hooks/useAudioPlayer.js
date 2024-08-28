import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";

const useAudioPlayer = (savedTracks, setCurrentTrack, extractColors) => {
    const [currentSound, setCurrentSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const value = useRef(0);

    const play = async (track) => {
        const preview_url = track?.track?.preview_url;
        if (currentSound) {
            await currentSound.stopAsync();
        }
        const { sound, status } = await Audio.Sound.createAsync(
            { uri: preview_url },
            { shouldPlay: true, isLooping: false },
            onPlaybackStatusUpdate
        );
        setCurrentSound(sound);
        setIsPlaying(status.isLoaded);
        await sound.playAsync();
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded && status.isPlaying) {
            const progress = status.positionMillis / status.durationMillis;
            setProgress(progress);
            setCurrentTime(status.positionMillis);
            setTotalDuration(status.durationMillis);
        }

        if (status.didJustFinish) {
            playNextTrack();
        }
    };

    const playNextTrack = async () => {
        if (currentSound) {
            await currentSound.stopAsync();
            setCurrentSound(null);
        }
        value.current += 1;
        if (value.current < savedTracks.length) {
            const nextTrack = savedTracks[value.current];
            setCurrentTrack(nextTrack);
            extractColors();
            await play(nextTrack);
        }
    };

    const playPreviousTrack = async () => {
        if (currentSound) {
            await currentSound.stopAsync();
            setCurrentSound(null);
        }
        value.current -= 1;
        if (value.current >= 0) {
            const nextTrack = savedTracks[value.current];
            setCurrentTrack(nextTrack);
            await play(nextTrack);
        }
    };

    return {
        play,
        playNextTrack,
        playPreviousTrack,
        isPlaying,
        handlePlayPause: async () => {
            if (currentSound) {
                isPlaying ? await currentSound.pauseAsync() : await currentSound.playAsync();
                setIsPlaying(!isPlaying);
            }
        },
        progress,
        currentTime,
        totalDuration,
    };
};

export default useAudioPlayer;
