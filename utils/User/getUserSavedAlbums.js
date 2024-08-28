import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getUserSavedAlbums = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/me/albums`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        console.log('Failed to fetch data:', err.message);
    }
}