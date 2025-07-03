import { StyleSheet } from 'react-native';

const filterParamSelectorStyles = StyleSheet.create({
  paramContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    zIndex: 100,
  },
  paramBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  paramButton: {
    padding: 8,
    margin: 3,
    backgroundColor: '#ddd',
    borderRadius: 3,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
    padding: 5,
  },
});

export default filterParamSelectorStyles;