import { ModalPortal } from "react-native-modals/src";
import { StackNavigator } from "./navigation/Stack";
import { PlayerContext } from "./PlayerContext";

export default function App() {
    return (
        <>
            <PlayerContext>
                <StackNavigator/>
                <ModalPortal/>
            </PlayerContext>
        </>
    );
};

