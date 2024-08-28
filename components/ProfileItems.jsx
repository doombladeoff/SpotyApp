import { Image, StyleSheet, Text, View } from "react-native";

export const ProfileItems = ({ data, type }) => {
    return (
        <>
            {data.map((item, index) => {
                const imageUrl = item?.images?.[0]?.url || item?.album?.images?.[0]?.url || '';
                const typeName = (t) => {
                    switch (t) {
                        case "album":
                            return `${item?.album.type.toUpperCase()} ${item?.album?.artists[0]?.name}`;
                        case "playlist":
                            return `${item?.type.toUpperCase()} ${item?.owner?.display_name}`;
                        case "artist":
                            return `${item?.type.toUpperCase()}`;
                    }
                }
                return (
                    <View style={styles.playlistContainer} key={`${type}-${index}`}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: type === 'album' || type === 'playlist' ? 5 : 50
                            }}
                        />
                        <View>
                            <Text style={{ color: "white" }}>{item?.name || item?.album?.name}</Text>
                            <Text style={{ color: "white", marginTop: 7 }}>{typeName(type)}</Text>
                        </View>
                    </View>
                )
            })}
        </>
    )
}

const styles = StyleSheet.create({
    playlistContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginVertical: 10,
    },
})