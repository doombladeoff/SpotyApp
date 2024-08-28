import { FlatList, Image, Text, View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { getAlbum } from "../../utils";
import { useNavigation } from "@react-navigation/native";

const ReleasesScreen = ({ route }) => {
    const { artistId } = route.params;

    const navigation = useNavigation();
    const handleNavigation = (albumID, albumImage, albumName, artistName) => {
        navigation.navigate('Albums', {
            albumId: albumID,
            albumImage: albumImage,
            albumName: albumName,
            artistName: artistName
        });
    }

    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        const fetchAlbums = async () => {
            const albums = await getAlbum(artistId);
            setAlbums(albums);
        }

        fetchAlbums();
    }, [artistId]);

    const renderAlbums = ({ item }) => {
        return (
            <Pressable
                onPress={() => handleNavigation(item.id, item.images[0].url, item.name, item.artists[0].name)}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                })}>
                <Image source={{ uri: item.images[0].url }} width={64} height={64}/>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ color: '#7e7e7e', fontSize: 16 }}>{item.release_date.substring(0, 4)}</Text>
                </View>
            </Pressable>
        )
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 70, backgroundColor: '#131624' }}>
            <FlatList
                data={albums.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))}
                scrollEnabled={true}
                renderItem={({ item, index }) => renderAlbums({ item })}
                contentContainerStyle={{ gap: 20, paddingTop: 20, paddingBottom: 40 }}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default ReleasesScreen

const styles = StyleSheet.create({})