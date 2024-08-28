import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getFollowedArtists = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/me/following?type=artist`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        console.log('Failed to fetch data FOLLOWING ARTIST:', err.message);
    }
}