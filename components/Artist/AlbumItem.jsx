import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AlbumItem = ({ item, index }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => navigation.navigate("Albums", {
                albumId: item.id,
                albumImage: item.images[0].url,
                albumName: item.name,
                artistName: item.artists[0].name
            })}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
        >
            <Image source={{ uri: item.images[0].url }} width={64} height={64}/>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={styles.artistNameTrack}>{item.release_date.substring(0, 4)} Album</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    artistNameTrack: {
        fontSize: 14,
        color: '#666',
    },
})