const { StyleSheet } = require("react-native");

const membersTableStyles  = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        margin: 10,
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingBottom: 8,
        marginBottom: 8,
    },
    dataRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerCell: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 12,
    },
    dataCell: {
        color: '#FFF',
        fontSize: 14,
        justifyContent: 'center',
    },
    memberName: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    memberTag: {
        color: '#AAA',
        fontSize: 12,
    },
    rankColumn: {
        width: 30,
        textAlign: 'center',
    },
    nameColumn: {
        width: 150,
        paddingLeft: 5,
    },
    roleColumn: {
        width: 80,
        textAlign: 'center',
    },
    trophiesColumn: {
        width: 80,
        textAlign: 'center',
    },
    levelColumn: {
        width: 60,
        textAlign: 'center',
    },
    donatedColumn: {
        width: 70,
        textAlign: 'center',
    },
    receivedColumn: {
        width: 70,
        textAlign: 'center',
    },
});

export default membersTableStyles;