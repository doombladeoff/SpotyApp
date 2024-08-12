import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: "rgba(0,0,0,1)",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                shadowOpacity: 4,
                shadowRadius: 4,
                elevation: 4,
                shadowOffset: {
                    width: 0,
                    height: -4
                },
                borderTopWidth: 0
            }
        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" size={24} color="white"/>
                        ) : (
                            <AntDesign name="home" size={24} color="white"/>
                        ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="person" size={24} color="white"/>
                        ) : (
                            <Ionicons name="person-outline" size={24} color="white"/>
                        ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabs