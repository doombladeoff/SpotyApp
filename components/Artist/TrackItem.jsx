import { Image, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

export const TrackItem = ({ item, index }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.trackContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={styles.trackName}>{index + 1}</Text>
                </View>
                <View style={styles.trackContainer}>
                    <Image source={{ uri: item.album.images[0].url }} style={styles.albumImage}/>
                    <View style={styles.trackInfo}>
                        <Text style={styles.trackName}>{item.name}</Text>
                        <Text style={styles.artistNameTrack}>{item.artists[0].name}</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.trackContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Entypo name="dots-three-vertical" size={24} color="#666"/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    trackContainer: {
        flexDirection: 'row',
        padding: 8,
        borderRadius: 8,
    },
    trackName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    trackInfo: {
        marginLeft: 16,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    artistNameTrack: {
        fontSize: 14,
        color: '#666',
    },
    albumImage: {
        width: 50,
        height: 50,
        borderRadius: 0,
    },
})