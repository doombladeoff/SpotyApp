import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const checkFollowing = async (artistId) => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log('FOLLOWING:', response.data)
        return response.data[0];
    } catch (err) {
        console.log('Failed to check if artist is following:', err.message);
    }
}