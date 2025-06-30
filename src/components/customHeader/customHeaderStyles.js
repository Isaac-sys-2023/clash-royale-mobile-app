import { StyleSheet } from 'react-native';

const customHeaderStyles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#121212',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  leftSection: {
    width: 60,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#aaaaaa',
    fontSize: 14,
  },
  backButton: {
    padding: 8,
  },
  iconButton: {
    padding: 8,
    marginLeft: 12,
  },
  icon: {
    color: '#ffffff',
    fontSize: 20,
  },
});

export default customHeaderStyles;