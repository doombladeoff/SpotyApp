import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getPlaylists = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("token");
        const response = await axios.get(
            "https://api.spotify.com/v1/me/playlists",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data.items;
    } catch (error) {
        console.error("Error retrieving playlists:", error);
    }
};