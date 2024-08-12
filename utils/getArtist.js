import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getArtist = async (artistId) => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log('DATA:', response.data)
        return response.data;
    } catch (err) {
        console.log('Failed to fetch artist:', err.message);
    }
}