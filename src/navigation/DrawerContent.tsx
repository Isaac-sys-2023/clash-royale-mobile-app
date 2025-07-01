import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerViewModel } from '../components/customHeader/DrawerViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DrawerContentProps {
    navigation: any;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ navigation }) => {
    const viewModel = new DrawerViewModel(navigation);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => viewModel.navigateTo('Home')}
                >
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => viewModel.navigateTo('Decks')}
                >
                    <Text style={styles.text}>Decks</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => viewModel.navigateTo('Clans')}
                >
                    <Text style={styles.text}>Clans</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    text: {
        color: 'white'
    }
});

export default DrawerContent;