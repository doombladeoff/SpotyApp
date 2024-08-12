import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { getAlbumTracks } from "../../utils";

const SongInfoScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    console.log(route.params);

    const albumUrl = route?.params?.item?.track?.album?.uri;
    const [tracks, setTracks] = useState([]);

    const albumId = albumUrl.split(":")[2];
    useEffect(() => {
        async function fetchSongs() {
            const response = await getAlbumTracks(albumId);
            setTracks(response);
        }

        fetchSongs();
    }, [albumId]);

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <ScrollView style={{ marginTop: 50 }}>
                <View style={{ flexDirection: "row", padding: 12 }}>
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        name="arrow-back"
                        size={24}
                        color="white"
                    />
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Image
                            style={{ width: 200, height: 200 }}
                            source={{ uri: route?.params?.item?.track?.album?.images[0].url }}
                        />
                    </View>
                </View>
                <Text style={styles.trackName}>{route?.params?.item?.track?.name}</Text>
                <View style={styles.trackArtist}>
                    {route?.params?.item?.track?.artists?.map((item, index) => (
                        <Text style={{ color: "#909090", fontSize: 13, fontWeight: "500" }}>
                            {item.name}
                        </Text>
                    ))}
                </View>
                <View style={styles.buttonsContainer}>
                    <Pressable style={styles.downloadButton}>
                        <AntDesign name="arrowdown" size={20} color="white"/>
                    </Pressable>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Pressable style={styles.playButton}>
                            <Entypo name="controller-play" size={24} color="white"/>
                        </Pressable>
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: 10, marginHorizontal: 12 }}>
                        {tracks?.map((track, index) => (
                            <Pressable
                                style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                <View>
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "500", color: "white" }}>{track?.name}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 5 }}>
                                        {track?.artists?.map((item, index) => (
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: "500",
                                                color: "gray"
                                            }}>{item?.name}</Text>
                                        ))}
                                    </View>
                                </View>
                                <Entypo name="dots-three-vertical" size={24} color="white"/>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default SongInfoScreen;

const styles = StyleSheet.create({
    trackName: {
        color: "white",
        marginHorizontal: 12,
        marginTop: 10,
        fontSize: 22,
        fontWeight: "bold",
    },
    trackArtist: {
        marginHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 10,
        gap: 7,
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
});