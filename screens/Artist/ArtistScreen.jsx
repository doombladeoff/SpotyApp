import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { checkFollowing, getAlbum, getArtist, getTopTracks, roundedFollowers } from "../../utils";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Pressable,
    FlatList,
} from 'react-native';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { Ionicons } from "@expo/vector-icons";
import { useBackIconAnimatedStyle, useHeaderAnimatedStyle, useImageAnimatedStyle } from "../../hooks/useAnimatedStyles";
import { TrackItem } from "../../components/Artist/TrackItem";
import { AlbumItem } from "../../components/Artist/AlbumItem";

const HEADER_HEIGHT = 400;
const { width, height } = Dimensions.get('window');

const ArtistScreen = ({ route, navigation }) => {
    const { artistId } = route.params;

    const [loading, setLoading] = useState(true);
    const [artist, setArtist] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const [artist, isFollowing, topTracks, albums] = await Promise.all([
                    getArtist(artistId),
                    checkFollowing(artistId),
                    getTopTracks(artistId),
                    getAlbum(artistId, 5)
                ]);

                setArtist(artist);
                setIsFollowing(isFollowing);
                setTopTracks(topTracks);
                setAlbums(albums);
            } catch (error) {
                console.error('Error fetching artist data:', error);
            }
        }
        fetchArtist();
    }, [artistId]);

    const scrollRef = useAnimatedRef();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const imageStyle = useImageAnimatedStyle(scrollOffset, HEADER_HEIGHT);
    const headerStyle = useHeaderAnimatedStyle(scrollOffset, HEADER_HEIGHT);
    const backIconStyle = useBackIconAnimatedStyle(scrollOffset, HEADER_HEIGHT);

    const handleNavigation = () => {
        navigation.navigate('Releases', { artistId });
    }

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                height: HEADER_HEIGHT,
            },
            headerLeft: () => (
                <>
                    <Ionicons name={'arrow-back'} color={'white'} size={24} onPress={() => navigation.goBack()}
                              style={{ position: 'absolute', zIndex: 10000 }}/>
                    <Animated.View style={[styles.backIcon, backIconStyle]}/>
                </>
            ),
            headerBackground: () => <Animated.View style={[styles.header, headerStyle]}/>
        })
    }, [navigation]);

    return (
        <LinearGradient colors={["#131624", "#040306"]} style={{ flex: 1 }}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} style={{ flex: 1 }}>
                <Animated.Image source={{ uri: artist?.images[0].url }} style={[styles.image, imageStyle]}/>
                <View style={styles.artistNameShadow}>
                    <Text style={styles.artistName}>{artist?.name}</Text>
                </View>
                <View style={{ paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "#040306" }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#fff",
                    }}>{roundedFollowers(artist?.followers?.total)} followers</Text>
                    <Pressable style={({ pressed }) => ([
                        { opacity: pressed ? 0.75 : 1, borderColor: isFollowing ? "#fff" : "#494949" },
                        styles.followButton
                    ])}
                    >
                        <Text style={styles.followText}>{isFollowing ? "Following" : "Follow"}</Text>
                    </Pressable>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 10 }}>Popular</Text>
                    {topTracks &&
                        <FlatList
                            data={topTracks.slice(0, 5)}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => <TrackItem item={item} index={index}/>}
                            contentContainerStyle={{ gap: 10 }}
                            keyExtractor={(item) => item.id}
                        />
                    }
                    <Text style={styles.popularReleasesText}>Popular releases</Text>
                    {albums &&
                        <>
                            <FlatList
                                data={albums}
                                scrollEnabled={false}
                                renderItem={({ item, index }) => <AlbumItem item={item} index={index}/>}
                                contentContainerStyle={{ gap: 20 }}
                                keyExtractor={(item) => item.id}
                            />
                            <View style={{ alignItems: "center", marginTop: 20 }}>
                                <Pressable
                                    onPress={() => handleNavigation()}
                                    style={({ pressed }) => ([
                                        { opacity: pressed ? 0.75 : 1 },
                                        styles.discographyButton
                                    ])}>
                                    <Text style={{ color: "#fff", padding: 10, fontSize: 16 }}>See
                                        discography</Text>
                                </Pressable>
                            </View>
                        </>
                    }
                </View>
            </Animated.ScrollView>
        </LinearGradient>
    );
}

export default ArtistScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    image: {
        width,
        height: HEADER_HEIGHT,
    },
    header: {
        height: HEADER_HEIGHT,
        backgroundColor: "#131624",
        borderWidth: StyleSheet.hairlineWidth
    },
    backIcon: {
        height: 40,
        width: 40,
        backgroundColor: '#131624',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    artistName: {
        width: "80%",
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
        left: 20,
        bottom: 20,
        position: "absolute",
    },
    artistNameShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.85,
        shadowRadius: 3.84,
        elevation: 5,
    },
    trackContainer: {
        flexDirection: 'row',
        padding: 8,
        borderRadius: 8,
    },
    albumImage: {
        width: 50,
        height: 50,
        borderRadius: 0,
    },
    trackInfo: {
        marginLeft: 16,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    trackName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    artistNameTrack: {
        fontSize: 14,
        color: '#666',
    },
    playButton: {
        marginTop: 8,
        color: '#1DB954',
        fontWeight: 'bold',
    },
    popularReleasesText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        paddingBottom: 20
    },
    followButton: {
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        width: 100,
        alignItems: "center",
        padding: 5
    },
    followText: {
        color: 'white',
        padding: 5,
        fontSize: 16
    },
    discographyButton: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "#494949",
        width: 170,
    }
});