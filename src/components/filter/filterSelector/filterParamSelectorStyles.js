import { StyleSheet } from 'react-native';

const filterParamSelectorStyles = StyleSheet.create({
  paramContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    zIndex: 100,

    borderWidth: 2,
    borderColor: 'black',
  },
  paramBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  paramButton: {
    padding: 8,
    margin: 3,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: '#000',
    marginTop: 10,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
    width: '100%'
  },
});

export default filterParamSelectorStyles;