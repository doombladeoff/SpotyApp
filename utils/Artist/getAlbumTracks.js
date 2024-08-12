import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getAlbumTracks = async (albumId) => {
    try {
        const accessToken = await AsyncStorage.getItem("token");
        const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
        const response = await axios.get(
            url,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data.items;
    } catch (err) {
        console.log('Failed to fetch album tracks:', err.message);
    }
}