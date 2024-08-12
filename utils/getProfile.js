import AsyncStorage from "@react-native-async-storage/async-storage";

export const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        return await response.json();
    } catch (err) {
        console.error("Error fetching profile:", err.message);
        throw err;
    }
};