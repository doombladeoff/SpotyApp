import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import LikedSongsScreen from "../screens/LikedSongs/LikedSongsScreen";
import SongInfoScreen from "../screens/Song/SongInfoScreen";
import ArtistScreen from "../screens/Artist/ArtistScreen";
import ReleasesScreen from "../screens/Artist/ReleasesScreen";
import AlbumScreen from "../screens/Artist/AlbumScreen";
import { Ionicons } from "@expo/vector-icons";


const Stack = createNativeStackNavigator();

export const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainHome" component={HomeScreen} options={{ headerShown: false }}/>
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
    );
}