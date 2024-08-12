import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";

const ControlButtons = ({ isPlaying, onPlayPause, onNext, onPrevious }) => (
    <View style={styles.controlButtonsContainer}>
        <Pressable>
            <Ionicons name="play-skip-back" size={30} color="white" onPress={onPrevious}/>
        </Pressable>
        <Pressable onPress={onPlayPause}>
            {isPlaying ? (
                <AntDesign name="pausecircle" size={60} color="white"/>
            ) : (
                <View style={styles.playButton}>
                    <Entypo name="controller-play" size={26} color="black"/>
                </View>
            )}
        </Pressable>
        <Pressable onPress={onNext}>
            <Ionicons name="play-skip-forward" size={30} color="white"/>
        </Pressable>
    </View>
);

export default ControlButtons;

const styles = StyleSheet.create({
    controlButtonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 17,
        marginHorizontal: 10
    },
    playButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    }
})
