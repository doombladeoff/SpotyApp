import { View, Text, StyleSheet } from "react-native";

const ProgressBar = ({ progress, currentTime, totalDuration }) => (
    <View>
        <View style={styles.progressBarContainer}>
            <View style={[styles.progressbar, { width: `${progress * 100}%` }]}/>
            <View
                style={{
                    position: "absolute",
                    top: -5,
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "white",
                    left: `${progress * 100}%`,
                    marginLeft: -6,
                }}
            />
        </View>
        <View style={styles.progressBarTimeContainer}>
            <Text style={{ fontSize: 15, color: "#D3D3D3" }}>{currentTime}</Text>
            <Text style={{ fontSize: 15, color: "#D3D3D3" }}>{totalDuration}</Text>
        </View>
    </View>
);

export default ProgressBar;

const styles = StyleSheet.create({
    progressBarContainer: {
        width: "95%",
        marginTop: 20,
        marginHorizontal: 10,
        height: 3,
        backgroundColor: "gray",
        borderRadius: 5,
    },
    progressbar: {
        height: "100%",
        backgroundColor: "white",
    },
    progressBarTimeContainer: {
        marginTop: 12,
        marginHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
})
