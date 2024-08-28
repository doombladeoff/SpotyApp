import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getFollowedArtists, getPlaylists, getProfile } from "../../utils";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ProfileItems } from "../../components/ProfileItems";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [userProfile, setUserProfile] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [followedArtists, setFollowedArtists] = useState([]);

    const fetchData = async () => {
        try {
            const [profile, playlists, followedArt] = await Promise.all([
                getProfile(),
                getPlaylists(),
                getFollowedArtists()
            ]);
            setUserProfile(profile);
            setPlaylists(playlists);
            setFollowedArtists(followedArt?.artists?.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <LinearGradient colors={["#131624"]} style={{ flex: 1 }}>
            <ScrollView style={{ marginTop: 50, marginBottom: 70 }}>
                <View style={{ padding: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 20,
                                resizeMode: "cover",
                            }}
                            source={{ uri: userProfile?.images[0].url }}
                        />
                        <View>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                                {userProfile?.display_name}
                            </Text>
                            <Text style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>
                                {userProfile?.email}
                            </Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.playlistHeaderText}>Your Playlists</Text>
                <View style={{ padding: 15 }}>
                    <Pressable
                        onPress={() => navigation.navigate("Liked")}
                        style={styles.likedSongsContainer}
                    >
                        <LinearGradient colors={["#33006F", "#FFFFFF"]}>
                            <Pressable style={styles.likedSongsGradientContainer}>
                                <AntDesign name="heart" size={24} color="white"/>
                            </Pressable>
                        </LinearGradient>

                        <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>Liked Songs</Text>
                    </Pressable>
                    <ProfileItems data={playlists} type="playlist"/>
                    <ProfileItems data={followedArtists} type="artist"/>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    likedSongsContainer: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
        marginVertical: 8,
        borderRadius: 4,
        elevation: 3,
    },
    likedSongsGradientContainer: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    playlistHeaderText: {
        color: "white",
        fontSize: 20,
        fontWeight: "500",
        marginHorizontal: 12,
    },
});