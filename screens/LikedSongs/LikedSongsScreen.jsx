import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable, SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign, Feather, Entypo } from "@expo/vector-icons";
import SongItem from "../../components/SongItem";
import { Player } from "../../PlayerContext";

import { Audio } from "expo-av";
import { debounce } from "lodash";
import { ModalContent, BottomModal } from 'react-native-modals';
import { formatTimeProgressBar, getSavedTracks } from "../../utils";
import SearchBar from "../../components/ui/SearchBar";
import ProgressBar from "../../components/ui/ProgressBar";
import ControlButtons from "../../components/ui/ControlButtons";

const LikedSongsScreen = () => {
    const navigation = useNavigation();
    const { currentTrack, setCurrentTrack } = useContext(Player);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchedTracks, setSearchedTracks] = useState([]);
    const [input, setInput] = useState("");
    const [savedTracks, setSavedTracks] = useState([]);
    const [totalTracks, setTotalTracks] = useState(0);
    const [currentSound, setCurrentSound] = useState(null);
    const [progress, setProgress] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const value = useRef(0);
    const [trackLimit, setTrackLimit] = useState(10);


    useEffect(() => {
        fetchSavedTracks();
    }, []);

    useEffect(() => {
        if (savedTracks.length > 0) {
            handleSearch(input);
        }
    }, [savedTracks]);

    const fetchSavedTracks = async () => {
        const response = await getSavedTracks();
        setSavedTracks(response.items);
        setTotalTracks(response.total);
    };

    const playTrack = async () => {
        if (savedTracks.length > 0) {
            setCurrentTrack(savedTracks[0]);
            await play(savedTracks[0]);
        }
    };

    const play = async (nextTrack) => {
        const preview_url = nextTrack?.track?.preview_url;
        if (!preview_url) {
            console.log("Preview URL is not available");
            return;
        }

        try {
            if (currentSound) {
                await currentSound.stopAsync();
                await currentSound.unloadAsync();
            }
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: false,
                shouldDuckAndroid: false,
            });
            const { sound, status } = await Audio.Sound.createAsync(
                { uri: preview_url },
                { shouldPlay: true, isLooping: false },
                onPlaybackStatusUpdate
            );
            onPlaybackStatusUpdate(status);
            setCurrentSound(sound);
            setIsPlaying(status.isLoaded);
            await sound.playAsync();
        } catch (err) {
            console.log(err.message);
        }
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded && status.isPlaying) {
            const progress = status.positionMillis / status.durationMillis;
            setProgress(progress);
            setCurrentTime(status.positionMillis);
            setTotalDuration(status.durationMillis);
        }

        if (status.didJustFinish) {
            setCurrentSound(null);
            playNextTrack();
        }
    };

    const handlePlayPause = async () => {
        if (!currentSound) return;
        if (isPlaying) {
            await currentSound.pauseAsync();
        } else {
            await currentSound.playAsync();
        }
        setIsPlaying(!isPlaying);

    };

    const handleSearch = (text) => {
        const filteredTracks = savedTracks.filter((item) =>
            item.track.name.toLowerCase().includes(text.toLowerCase())
        );
        setSearchedTracks(filteredTracks);
    };

    const debouncedSearch = debounce(handleSearch, 800);

    const handleInputChange = (text) => {
        setInput(text);
        debouncedSearch(text);
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
            await play(nextTrack);
        } else {
            console.log("end of playlist");
        }
    };

    const playPreviousTrack = async () => {
        if (currentSound) {
            await currentSound.stopAsync();
            setCurrentSound(null);
        }
        value.current -= 1;
        if (value.current < savedTracks.length) {
            const nextTrack = savedTracks[value.current];
            setCurrentTrack(nextTrack);
            await play(nextTrack);
        } else {
            console.log("end of playlist");
        }
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
                <ScrollView style={{ flex: 1, marginBottom: currentTrack ? 100 : 50 }}>
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={{ marginHorizontal: 10 }}
                    >
                        <Ionicons name="arrow-back" size={24} color="white"/>
                    </Pressable>

                    <View style={styles.headerContainer}>
                        <SearchBar value={input} onChangeText={handleInputChange}/>
                        <Pressable style={styles.sortButton}>
                            <Text style={{ color: "white" }}>Sort</Text>
                        </Pressable>
                    </View>

                    <View style={{ height: 50 }}/>
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
                            Liked Songs
                        </Text>
                        <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
                            {totalTracks} songs
                        </Text>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <Pressable style={styles.downloadButton}>
                            <AntDesign name="arrowdown" size={20} color="white"/>
                        </Pressable>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Pressable onPress={playTrack} style={styles.playButton}>
                                <Entypo name="controller-play" size={24} color="white"/>
                            </Pressable>
                        </View>
                    </View>

                    {searchedTracks.length === 0 ? (
                        <ActivityIndicator size="large" color="gray"/>
                    ) : (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                            data={searchedTracks.slice(0, trackLimit)}
                            renderItem={({ item }) => (
                                <SongItem
                                    item={item}
                                    onPress={play}
                                    isPlaying={item === currentTrack}
                                />
                            )}
                            onEndReached={() => {
                                if (trackLimit < searchedTracks.length) {
                                    setTrackLimit((prevLimit) => prevLimit + 10);
                                }
                            }}
                            onEndReachedThreshold={1}
                            ListFooterComponent={
                                trackLimit < searchedTracks.length ?
                                    <ActivityIndicator size="large" color="gray"/> : null
                            }
                        />
                    )}
                </ScrollView>
            </SafeAreaView>
            {currentTrack && (
                <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.bottomModalContainer}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={{ uri: currentTrack?.track?.album?.images[0].url }}
                        />
                        <Text numberOfLines={1} style={styles.bottomModalText}>
                            {currentTrack?.track?.name} •{" "}
                            {currentTrack?.track?.artists[0].name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <AntDesign name="heart" size={24} color="#1DB954"/>
                        <Pressable onPress={handlePlayPause}>
                            <AntDesign name={isPlaying ? "pausecircle" : "play"} size={24} color="white"/>
                        </Pressable>
                    </View>
                </Pressable>
            )}
            <BottomModal
                visible={modalVisible}
                onHardwareBackPress={() => setModalVisible(false)}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
            >
                <ModalContent style={{ height: "100%", width: "100%", backgroundColor: '#0A2647' }}>
                    <View style={{ height: "100%", width: "100%", marginTop: 40 }}>
                        <Pressable style={styles.modalHeaderContainer}>
                            <AntDesign
                                onPress={() => setModalVisible(false)}
                                name="down"
                                size={24}
                                color="white"
                            />
                            <Feather name="more-vertical" size={24} color="white"/>
                        </Pressable>
                        <View style={styles.trackImageContainer}>
                            <Image
                                style={styles.trackImage}
                                source={{ uri: currentTrack?.track?.album?.images[0].url }}
                            />
                        </View>
                        <View style={styles.trackDetailsContainer}>
                            <View>
                                <Text numberOfLines={1} style={styles.trackTitleText}>
                                    {currentTrack?.track?.name}
                                </Text>
                                <Text numberOfLines={1} style={styles.trackArtistText}>
                                    {currentTrack?.track?.artists[0].name}
                                </Text>
                            </View>
                            <AntDesign name="heart" size={24} color="#1DB954"/>
                        </View>

                        <ControlButtons
                            isPlaying={isPlaying}
                            onPlayPause={handlePlayPause}
                            onNext={playNextTrack}
                            onPrevious={playPreviousTrack}
                        />

                        <ProgressBar
                            progress={progress}
                            currentTime={formatTimeProgressBar(currentTime)}
                            totalDuration={formatTimeProgressBar(totalDuration)}
                        />

                    </View>
                </ModalContent>
            </BottomModal>
        </>
    );
};

export default LikedSongsScreen;

const styles = StyleSheet.create({
    headerContainer: {
        marginHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 9,
    },
    sortButton: {
        marginHorizontal: 10,
        backgroundColor: "rgba(93,93,93,0.39)",
        padding: 10,
        borderRadius: 3,
        height: 38,
    },
    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 10,
    },
    downloadButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#1DB954",
        justifyContent: "center",
        alignItems: "center",
    },
    playButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1DB954",
    },
    bottomModalContainer: {
        backgroundColor: "#000000",
        width: "100%",
        padding: 10,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 75,
        position: "absolute",
        bottom: 0,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        shadowOpacity: 2,
        shadowRadius: 2,
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: -2
        },
    },
    bottomModalText: {
        fontSize: 13,
        width: 220,
        color: "white",
        fontWeight: "bold",
    },
    modalHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    trackImageContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    trackImage: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    trackDetailsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginTop: 30,
    },
    trackTitleText: {
        fontWeight: "600",
        fontSize: 18,
        color: "white",
        width: 180,
    },
    trackArtistText: {
        fontWeight: "500",
        fontSize: 16,
        color: "gray",
    },
});