import { StyleSheet } from "react-native";

const clanStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 16,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    instruction: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    sectionContainer: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 10,
    },
    sectionTitle: {
        color: '#BB86FC',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    defaultTextColor: {
        color: 'white',
        fontSize: 14,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    clanFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    searchFilterInput: {
        width: 150,
        backgroundColor: '#2D2D2D',
        color: '#FFF',
        borderRadius: 8,
        padding: 10,
        marginLeft: 10,
        fontSize: 14,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#2D2D2D',
        color: '#FFF',
        borderRadius: 8,
        padding: 12,
        marginRight: 10,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#4A148C',
        borderRadius: 8,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navbarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 5,
    },
    navbarItem: {
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
    },
    activeNavbarItem: {
        backgroundColor: '#555',
    },
    navbarText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    retryButton: {
        backgroundColor: '#4A148C',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center',
    },
    retryButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },


    clanItem: {
        backgroundColor: '#1E1E1E',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
    },
    clanName: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    clanTag: {
        color: '#AAA',
    },
    clanScore: {
        color: '#FFD700', // Dorado para el score
    },
    clanWarScore: {
        color: '#BB86FC',
    },
    clanMembers: {
        color: '#FFF',
    },
    clansList: {
        paddingBottom: 0,
    },

    currentClanName: {
        textAlign: 'center',
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
    },
    currentClanTag: {
        color: '#BB86FC',
        fontSize: 16,
        textAlign: 'center'
    },
    currentClanText: {
        color: '#FFF',
        fontSize: 14,
    },

    gridContainer: {
        marginVertical: 10,
    },
    gridRow: {
        flexDirection: 'row',
        marginBottom: 10,
        width:'100%',
        justifyContent: 'space-between'
    },
    gridItemContainer: {
        flex: 1,
        paddingHorizontal: 5,
    },
    gridItem: {
        backgroundColor: '#666',
        borderRadius: 8,
        padding: 10,
        width:'100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
    },
    gridImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    gridTextContent: {
        flex: 1,
        minWidth: 0,
        flexDirection: 'column',
    },
    gridTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        flexWrap: 'wrap',
    },
    gridValue: {
        color: 'white',
        fontSize: 14,
        marginTop: 4,
    },
});

export default clanStyles;