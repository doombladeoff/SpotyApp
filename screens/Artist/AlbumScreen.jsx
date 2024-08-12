import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getAlbumTracks } from "../../utils";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useBackIconAnimatedStyle, useHeaderAnimatedStyle, useImageAnimatedStyle } from "../../hooks/useAnimatedStyles";


const AlbumScreen = ({ route, navigation }) => {
    const { albumId, albumImage, albumName, artistName } = route.params;

    const [album, setAlbum] = useState([]);
    const totalTimeMs = album.reduce((total, track) => total + track.duration_ms, 0);

    const minutes = Math.floor(totalTimeMs / 60000);
    const seconds = Math.floor((totalTimeMs % 60000) / 1000);

    useEffect(() => {
        const fetchAlbumTracks = async () => {
            const album = await getAlbumTracks(albumId);
            setAlbum(album);

            console.log(album);
        }
        fetchAlbumTracks();
    }, [albumId]);


    const scrollRef = useAnimatedRef();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const HEADER_HEIGHT = 200;

    const imageStyle = useImageAnimatedStyle(scrollOffset, HEADER_HEIGHT);
    const headerStyle = useHeaderAnimatedStyle(scrollOffset, HEADER_HEIGHT);
    const backIconStyle = useBackIconAnimatedStyle(scrollOffset, HEADER_HEIGHT);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                height: 600,
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
    }, []);

    return (
        <LinearGradient colors={["#41829f", "#040306", "#040306"]} style={{ flex: 1 }}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} style={{ flex: 1 }}>
                <Animated.Image source={{ uri: albumImage }} style={[styles.image, imageStyle]}/>
                <FlatList
                    data={album}
                    scrollEnabled={false}
                    ListHeaderComponentStyle={{ marginTop: 20 }}
                    ListHeaderComponent={() => (
                        <>
                            <Text style={{
                                color: '#fff',
                                fontSize: 24,
                                fontWeight: 'bold',
                            }}>{albumName}</Text>
                            <Text style={{ color: "#fff" }}>{artistName}</Text>
                        </>
                    )}
                    renderItem={({ item, index }) => (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.trackContainer}>
                                    <View style={styles.trackInfo}>
                                        <Text style={styles.trackName}>{item.name}</Text>
                                        <Text style={styles.artistNameTrack}>{item.artists[0].name}</Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={[styles.trackContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                                <Entypo name="dots-three-horizontal" size={24} color="#666"/>
                            </View>
                        </View>
                    )}
                    ListFooterComponent={() => <Text
                        style={{ color: "#fff", fontSize: 16 }}>{album.length} songs
                        | {minutes} min {seconds} sec</Text>}
                    style={{ paddingHorizontal: 20 }}
                    contentContainerStyle={{ gap: 20, paddingBottom: 40 }}
                    keyExtractor={(item) => item.id}
                />
            </Animated.ScrollView>
        </LinearGradient>
    )
}

export default AlbumScreen;

const styles = StyleSheet.create({
    image: {
        width: 640 / 2.5,
        height: 640 / 2.5,
        resizeMode: 'cover',
        alignSelf: 'center',
        marginTop: 70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
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
    trackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    trackName: {
        color: '#fff',
        fontSize: 16
    },
    albumImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    trackInfo: {
        flexDirection: 'column'
    },
    artistNameTrack: {
        color: '#666',
        fontSize: 14
    }
})