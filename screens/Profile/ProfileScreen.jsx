import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getPlaylists, getProfile } from "../../utils";

const ProfileScreen = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [playlists, setPlaylists] = useState([]);

    const fetchData = async () => {
        try {
            const [profile, playlists] = await Promise.all([
                getProfile(),
                getPlaylists(),
            ]);
            setUserProfile(profile);
            setPlaylists(playlists);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    
    console.log(playlists);
    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <ScrollView style={{ marginTop: 50 }}>
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
                    {playlists.map((item, index) => (
                        <View style={styles.playlistContainer}>
                            <Image
                                source={{
                                    uri:
                                        item?.images[0]?.url ||
                                        "https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=800",
                                }}
                                style={{ width: 50, height: 50, borderRadius: 4 }}
                            />
                            <View>
                                <Text style={{ color: "white" }}>{item?.name}</Text>
                                <Text style={{ color: "white", marginTop: 7 }}>0 followers</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    playlistHeaderText: {
        color: "white",
        fontSize: 20,
        fontWeight: "500",
        marginHorizontal: 12,
    },
    playlistContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginVertical: 10,
    },
});