import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const useTokenChecker = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkTokenValidity = async () => {
            const accessToken = await AsyncStorage.getItem("token");
            const expirationDate = await AsyncStorage.getItem("expirationDate");
            console.log("access token", accessToken);
            console.log("expiration date", expirationDate);

            if (accessToken && expirationDate) {
                const currentTime = Date.now();
                if (currentTime < parseInt(expirationDate)) {
                    console.log("token still valid");
                    navigation.navigate("Main");
                } else {
                    await AsyncStorage.removeItem("token");
                    await AsyncStorage.removeItem("expirationDate");
                }
            }
        };

        checkTokenValidity();
    }, []);
};

export default useTokenChecker;
