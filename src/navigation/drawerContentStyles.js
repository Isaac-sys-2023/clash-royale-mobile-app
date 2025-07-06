const { StyleSheet } = require("react-native");

const drawerContentStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold'
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 10,
        borderBottomWidth: 1,
        padding: 5,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        textAlign: 'center'
    }
});

export default drawerContentStyles;