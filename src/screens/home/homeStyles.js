import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    initSectionContainer: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 5,
        borderRadius: 8,
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.7,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    initSection: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        // backgroundColor: '#2370b8',
        borderRadius: 8,
        width: '100%',
        marginBottom: 10,
    },
    initSectionTitle: {
        padding: 10,
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    initSectionText: {
        color: 'white',
        fontSize: 16,
    },
    initSectionImage: {
        width: 170,
        height: undefined,
        aspectRatio: 70 / 90,
        marginRight: 10,
    },
    section: {
        alignSelf: 'flex-start',
        padding: 10,
        backgroundColor: '#444',
        borderRadius: 8,
        width: '100%',
        marginBottom: 10,
    },
    sectionTitle: {
        padding: 10,
        color: '#BB86FC',
        fontSize: 18,
        fontWeight: 'bold',
    },
    gridContainer: {
        padding: 10,
    },
    gridRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    gridItem: {
        flex: 1,
        backgroundColor: '#666',
        borderRadius: 8,
        padding: 10,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
    },
    gridImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    gridTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default homeStyles;