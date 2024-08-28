import { Image, StyleSheet, Text, View } from "react-native";

export const ProfileItems = ({ data, type }) => {
    return (
        <>
            {data.map((item, index) => (
                <View style={styles.playlistContainer} key={`${type}-${index}`}>
                    <Image
                        source={{ uri: item?.images[0]?.url }}
                        style={{ width: 50, height: 50, borderRadius: type === "playlist" ? 5 : 50 }}
                    />
                    <View>
                        <Text style={{ color: "white" }}>{item?.name}</Text>
                        <Text style={{
                            color: "white",
                            marginTop: 7
                        }}>{type === "playlist" ? `${item?.type.toUpperCase()} ${item?.owner?.display_name}` : `${item?.type.toUpperCase()}`}</Text>
                    </View>
                </View>
            ))}
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