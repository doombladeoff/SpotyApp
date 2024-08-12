import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

/*
@param artistId - id of the artist
@param limit - number of albums to return
@param offset - number of albums to skip
*/
export const getAlbum = async (artistId, limit, offset) => {
    try {
        const accessToken = await AsyncStorage.getItem("token");
        const url = `https://api.spotify.com/v1/artists/${artistId}/albums${limit ? `?limit=${limit}` : ''}`;
        const response = await axios.get(
            url,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        //console.log(response.data)
        return response.data.items;
    } catch (err) {
        console.log('Failed to fetch artist albums:', err.message);
    }
}