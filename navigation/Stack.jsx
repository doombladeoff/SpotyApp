import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/Login/LoginScreen";
import BottomTabs from "./TabStack";
import SongInfoScreen from "../screens/Song/SongInfoScreen";
import LikedSongsScreen from "../screens/LikedSongs/LikedSongsScreen";
import ArtistScreen from "../screens/Artist/ArtistScreen";
import ReleasesScreen from "../screens/Artist/ReleasesScreen";
import AlbumScreen from "../screens/Artist/AlbumScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }}/>
                <Stack.Screen name="Liked" component={LikedSongsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Info" component={SongInfoScreen} options={{ headerShown: false }}/>
                <Stack.Screen
                    name="Artist"
                    component={ArtistScreen}
                    options={{ title: '', headerTransparent: true }}
                />
                <Stack.Screen name="Releases" component={ReleasesScreen}
                              options={({ navigation }) => ({
                                  headerLeft: () => (
                                      <Ionicons
                                          name={'arrow-back'}
                                          color={'white'}
                                          size={24}
                                          onPress={() => navigation.goBack()}
                                          style={{ paddingLeft: 8 }}
                                      />
                                  ),
                                  headerTintColor: '#fff',
                                  headerBackTitleVisible: false,
                                  headerStyle: { backgroundColor: '#131624' }
                              })}
                />
                <Stack.Screen name="Albums" component={AlbumScreen}
                              options={{
                                  title: '',
                                  headerBackTitleVisible: false,
                                  headerTransparent: true
                              }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}