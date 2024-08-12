import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getTopItems = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("token");
        if (!accessToken) {
            console.log("Access token not found");
            return;
        }
        const type = "artists";
        const response = await axios.get(
            `https://api.spotify.com/v1/me/top/${type}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data.items;
    } catch (err) {
        console.log(err.message);
    }
};