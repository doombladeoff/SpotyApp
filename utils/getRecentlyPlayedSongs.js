import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getRecentlyPlayedSongs = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
        const response = await axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me/player/recently-played?limit=4",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.items;
    } catch (err) {
        console.log('Failed to fetch recently played songs:', err.message);
    }
};