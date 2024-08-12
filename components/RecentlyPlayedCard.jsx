import { StyleSheet, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RecentlyPlayedCard = ({ item }) => {
    const navigation = useNavigation();

    const navigateToInfo = () => {
        navigation.navigate("Info", {
            item: item,
        });
    };
    return (
        <Pressable
            onPress={() => navigateToInfo()}
            style={{ margin: 10 }}
        >
            <Image
                style={{ width: 130, height: 130, borderRadius: 5 }}
                source={{ uri: item.track.album.images[0].url }}
            />
            <Text
                numberOfLines={2}
                style={styles.trackName}
            >
                {item?.track?.name}
            </Text>
        </Pressable>
    );
};

export default RecentlyPlayedCard;

const styles = StyleSheet.create({
    trackName: {
        fontSize: 14,
        fontWeight: "500",
        color: "white",
        marginTop: 5,
        width: 130,
    },
});