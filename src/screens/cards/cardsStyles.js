import { StyleSheet } from "react-native";

const cardsStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212',
    },
    flatListContent: {
        padding: 12,
        paddingBottom: 20,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#1E1E1E',
    },
    gradientBackground: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 2,
        flex: 1,
        borderRadius: 10
    },
    cardIcon: {
        width: 75,
        height: 95,
        marginRight: 15,
        borderRadius: 6,
    },
    cardDetails: {
        flex: 1,
    },
    cardName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    cardText: {
        color: 'white',
        fontSize: 14,
        opacity: 0.9,
    },
    elixirContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
    elixirBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    elixirText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,

        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default cardsStyles