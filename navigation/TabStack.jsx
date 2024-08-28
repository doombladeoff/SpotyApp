import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { ProfileStack } from "./ProfileStack";
import { MainStack } from "./HomeStack";

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
                borderTopWidth: 0
            }
        }}>
            <Tab.Screen
                name="Home"
                component={MainStack}
                options={{
                    lazy: false,
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
                component={ProfileStack}
                options={{
                    lazy: false,
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