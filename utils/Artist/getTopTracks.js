import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getTopTracks = async (artistId) => {
    try {
        const accessToken = await AsyncStorage.getItem("token");
        if (!accessToken) {
            console.error("No access token found");
            return;
        }

        const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.tracks;
    } catch (error) {
        if (error.response) {
            console.error(`Error retrieving top tracks: ${error.response.status} - ${error.response.data.error.message}`);
        } else {
            console.error("Error retrieving top tracks:", error.message);
        }
    }
}