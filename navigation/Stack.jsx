import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/Login/LoginScreen";
import BottomTabs from "./TabStack";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}