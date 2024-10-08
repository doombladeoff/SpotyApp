import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppAuth from 'expo-app-auth';
import { SPOTIFY_CLIENT_ID, REDIRECT_URI } from 'react-native-dotenv'

const authenticate = async (navigation) => {
    const config = {
        issuer: "https://accounts.spotify.com",
        clientId: SPOTIFY_CLIENT_ID,
        scopes: [
            "user-read-email",
            "user-library-read",
            "user-read-recently-played",
            "user-top-read",
            'user-follow-read',
            "playlist-read-private",
            "playlist-read-collaborative",
            "playlist-modify-public"
        ],
        redirectUrl: REDIRECT_URI,
    };

    const result = await AppAuth.authAsync(config);
    console.log(result);

    if (result.accessToken) {
        const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
        await AsyncStorage.setItem("token", result.accessToken);
        await AsyncStorage.setItem("expirationDate", expirationDate.toString());
        navigation.navigate("Main");
    }
};

export default authenticate;
