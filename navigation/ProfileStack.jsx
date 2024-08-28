import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LikedSongsScreen from "../screens/LikedSongs/LikedSongsScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ProfileUser' component={ProfileScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Liked" component={LikedSongsScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}