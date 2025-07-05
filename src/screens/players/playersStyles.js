const { StyleSheet } = require("react-native");

const playerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
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
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#FFF',
        marginTop: 10,
        fontSize: 16,
    },
    errorText: {
        color: '#FF5252',
        fontSize: 16,
        textAlign: 'center',
    },
    placeholderText: {
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
    },
    playerContainer: {
        backgroundColor: '#2D2D2D',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
    },
    playerName: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center'
    },
    playerTag: {
        color: '#BB86FC',
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center'
    },
    playerInfo: {
        color: '#FFF',
        fontSize: 16,
        marginBottom: 8,
    },

    battleLogContainer: {
        marginTop: 20,
    },
    sectionTitle: {
        color: '#BB86FC',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    battleCard: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    battleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    battleMode: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    battleTime: {
        color: '#AAA',
        fontSize: 12,
    },
    battleTeams: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: "#444",
        padding: 10,
        borderRadius: 10
    },
    teamContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    teamTitle: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    playerNameText: {
        color: '#FFF',
        fontSize: 14, // o el tamaño que prefieras
        overflow: 'hidden',
        flexShrink: 1,
        padding: 5
    },
    trophyChange: {
        color: '#4CAF50',
    },
    vsText: {
        color: '#FFF',
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    cardsContainer: {
        padding: 5,
        borderRadius: 10
    },
    cardsTitle: {
        color: '#BB86FC',
        marginBottom: 5,
    },
    badgeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#444',
    },
    cardItem: {
        borderRadius: 5,
        width: '24%', // 4 cartas por fila (100%/4 = 25%, pero dejamos 24% para margen)
        alignItems: 'center',
    },
    cardName: {
        color: '#FFF',
        fontSize: 12,
    },
    cardLevel: {
        color: '#AAA',
        fontSize: 8,
        padding: 0,
        margin: 0,
        marginTop: -10,
    },
    loadMoreButton: {
        backgroundColor: '#4A148C',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    loadMoreText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    badgeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    paginationControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    paginationButton: {
        backgroundColor: '#4A148C',
        padding: 10,
        borderRadius: 5,
        minWidth: 120,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#2D2D2D',
        opacity: 0.5,
    },
    paginationText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default playerStyles;