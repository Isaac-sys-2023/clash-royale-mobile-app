const { StyleSheet } = require("react-native");

const leaderboardPlayersStyles = StyleSheet.create({
    initSectionText: {
        color: 'white',
        fontSize: 16,
    },
    sectionTitle: {
        padding: 10,
        color: '#BB86FC',
        fontSize: 18,
        fontWeight: 'bold',
    },
    
    topPlayerContainer:{
        backgroundColor: '#666',
        borderRadius: 8,
        marginBottom: 10,
        padding: 10,
    },
    topPlayerContainerItem:{
        width: '32%',
        justifyContent: 'center'
    },
    playerInfo: {
        color: '#FFF',
        fontSize: 16,
    },
    topPlayerClanInfo:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    rankPlayer:{
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        padding: 0,
        margin: 0,
    },
    fondoTop:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 5
    }}
);

export default leaderboardPlayersStyles;