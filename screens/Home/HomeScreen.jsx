import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Pressable,
    FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ArtistCard from "../../components/ArtistCard";
import RecentlyPlayedCard from "../../components/RecentlyPlayedCard";
import { useNavigation } from "@react-navigation/native";
import {
    greetingMessage,
    getRecentlyPlayedSongs,
    getTopItems,
    getProfile,
} from "../../utils";

const HomeScreen = () => {
    const navigation = useNavigation();

    const [userProfile, setUserProfile] = useState();
    const [recentlyplayed, setRecentlyplayed] = useState([]);
    const [topArtists, setTopArtists] = useState([]);

    const message = greetingMessage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profile, recentlyPlayed, topItems] = await Promise.all([
                    getProfile(),
                    getRecentlyPlayedSongs(),
                    getTopItems(),
                ]);
                setUserProfile(profile);
                setRecentlyplayed(recentlyPlayed);
                setTopArtists(topItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);


    const renderItem = ({ item }) => {
        return (
            <Pressable style={itemStyles.itemContainer}>
                <Image
                    style={{ height: 55, width: 55 }}
                    source={{ uri: item.track.album.images[0].url }}
                />
                <View style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}>
                    <Text
                        numberOfLines={2}
                        style={{ fontSize: 13, fontWeight: "bold", color: "white" }}
                    >
                        {item.track.name}
                    </Text>
                </View>
            </Pressable>
        );
    };

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <ScrollView style={{ marginTop: 50 }} horizontal={false}>
                <View style={styles.headerContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {userProfile?.images[0]?.url ? (
                            <Image
                                style={styles.userImage}
                                source={{ uri: userProfile?.images[0]?.url }}
                            />
                        ) : (
                            <View style={styles.userProfileContainer}>
                                <Text style={styles.userProfileText}>{`${userProfile?.display_name[0]}`}</Text>
                            </View>
                        )}
                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                            <Text style={styles.headerText}>{message}</Text>
                        </View>
                    </View>

                    <MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="white"/>
                </View>

                <View style={styles.categoriesContainer}>
                    <Pressable style={styles.categoriesItem}>
                        <Text style={{ fontSize: 15, color: "white" }}>Music</Text>
                    </Pressable>

                    <Pressable style={styles.categoriesItem}>
                        <Text style={{ fontSize: 15, color: "white" }}>Podcasts & Shows</Text>
                    </Pressable>
                </View>

                <View
                    style={{
                        marginTop: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
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

                    <View
                        style={{
                            marginBottom: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            flex: 1,
                            marginHorizontal: 10,
                            marginVertical: 8,
                            backgroundColor: "#202020",
                            borderRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Image
                            style={{ width: 55, height: 55 }}
                            source={{ uri: "https://i.pravatar.cc/100" }}
                        />
                        <View style={styles.randomArtist}>
                            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
                                Hiphop Tamhiza
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ gap: 5 }}>
                    <FlatList
                        data={recentlyplayed}
                        renderItem={renderItem}
                        horizontal={false}
                        scrollEnabled={false}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                    />

                    <Text style={styles.topArtistText}>Your Top Artists</Text>
                    <FlatList
                        data={topArtists}
                        horizontal
                        renderItem={({ item, index }) => (
                            <Pressable onPress={() => navigation.navigate("Artist", { artistId: item.id })}>
                                <ArtistCard item={item} key={index}/>
                            </Pressable>
                        )}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <Text style={styles.recentlyPlayedText}>Recently Played</Text>
                    <FlatList
                        data={recentlyplayed}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <RecentlyPlayedCard item={item} key={index}/>
                        )}
                    />
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 20,
        resizeMode: "cover",
    },
    headerText: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    userProfileContainer: {
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'red',
    },
    userProfileText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    categoriesContainer: {
        marginHorizontal: 12,
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    categoriesItem: {
        backgroundColor: "#282828",
        padding: 10,
        borderRadius: 30,
    },
    likedSongsContainer: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: "#202020",
        borderRadius: 4,
        elevation: 3,
    },
    likedSongsGradientContainer: {
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
    },
    topArtistText: {
        color: "white",
        fontSize: 19,
        fontWeight: "bold",
        marginHorizontal: 10,
        marginTop: 5,
    },
    recentlyPlayedText: {
        color: "white",
        fontSize: 19,
        fontWeight: "bold",
        marginHorizontal: 10,
        marginTop: 5,
    },
});

const itemStyles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: "#282828",
        borderRadius: 4,
        elevation: 3,
    },
    itemText: {
        fontSize: 13,
        fontWeight: "500",
        color: "white",
    },
})