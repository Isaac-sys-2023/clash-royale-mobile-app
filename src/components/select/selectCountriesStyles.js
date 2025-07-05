import { StyleSheet } from 'react-native';

const selectCountriesStyles = StyleSheet.create({
  container: {
        width: 50,
        height: 50
    },
    selectButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        height: '100%'
    },
    selectButtonText: {
        fontSize: 12,
        textAlign: 'center'
    },
    selectIconButtonText: {
        fontSize: 20,
        textAlign: 'center'
    },
    selectButtonImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        maxHeight: '70%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    loadingContainer: {
        padding: 20,
        alignItems: 'center',
    },
    countryItem: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    flagImage: {
        width: 30,
        height: 20,
    },
    countryName: {
        fontSize: 16,
    },
});

export default selectCountriesStyles;