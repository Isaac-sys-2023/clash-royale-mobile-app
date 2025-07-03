import { StyleSheet } from 'react-native';

const filterButtonStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filterBar: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    typeFilters: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
    filterButton: {
        padding: 10,
        marginHorizontal: 3,
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
    },
    smallButton: {
        padding: 6,
        marginHorizontal: 2,
    },
    activeFilter: {
        backgroundColor: '#4CAF50',
    },
    filterText: {
        color: '#333',
    },
    activeFilterText: {
        color: 'white',
        fontWeight: 'bold',
    },
    currentParam: {
        padding: 8,
        backgroundColor: '#e3f2fd',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default filterButtonStyles;