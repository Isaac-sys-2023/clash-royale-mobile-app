import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
    logo: {
        height: 32,
        width: 32,
    },
    text: {
        paddingLeft: 10,
        color: 'white'
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'red'
    }
});

export default homeStyles;