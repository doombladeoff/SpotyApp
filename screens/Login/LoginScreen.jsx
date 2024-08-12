import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useTokenChecker from "../../hooks/tokenCheker";
import authenticate from "../../utils/spotyAuth";

const LoginScreen = () => {
    const navigation = useNavigation();
    useTokenChecker();

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={{ height: 80 }}/>
                <Entypo
                    style={{ textAlign: "center" }}
                    name="spotify"
                    size={100}
                    color="white"
                />
                <Text style={styles.mainText}>Millions of Songs Free on spotify!</Text>

                <View style={{ height: 80 }}/>
                <Pressable
                    onPress={() => authenticate(navigation)}
                    style={{ ...styles.button, backgroundColor: "#1DB954" }}
                >
                    <Text style={styles.buttonText}>Sign In with spotify</Text>
                </Pressable>

                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: "#131624",
                        flexDirection: "row",
                        borderColor: "#C0C0C0",
                        borderWidth: 0.8
                    }}
                >
                    <MaterialIcons name="phone-android" size={24} color="white"/>
                    <Text style={{ ...styles.buttonText, flex: 1 }}>Continue with phone number</Text>
                </Pressable>

            </SafeAreaView>
        </LinearGradient>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mainText: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 40,
    },
    button: {
        padding: 15,
        marginLeft: "auto",
        marginRight: "auto",
        width: 300,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
        textAlign: "center"
    }
})