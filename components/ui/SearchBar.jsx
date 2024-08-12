import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ value, onChangeText }) => (
    <Pressable style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="white"/>
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder="Find in Liked songs"
            placeholderTextColor={"white"}
            style={{ fontWeight: "500", color: "white" }}
        />
    </Pressable>
);

export default SearchBar;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#42275a",
        padding: 9,
        flex: 1,
        borderRadius: 3,
        height: 38,
    },
})