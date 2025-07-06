import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerViewModel } from './DrawerViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextStyle } from 'react-native';
import { useNavigationState, useRoute } from '@react-navigation/native';

interface DrawerContentProps {
    navigation: any;
}

const DrawerContent: React.FC<DrawerContentProps> = ({
    navigation
}) => {
    const state = useNavigationState(state => state);
    
    const [currentRoute, setCurrentRoute] = useState(state?.routeNames[state.index] || 'Home');
    useEffect(() => {
        if (state) {
            setCurrentRoute(state.routeNames[state.index]);
        }
    }, [state]);

    const viewModel = new DrawerViewModel(navigation, currentRoute, setCurrentRoute);

    const getItemStyle = (routeName: string) => ({
        backgroundColor: viewModel.isActive(routeName) ? 'red' : 'transparent',
        borderLeftWidth: viewModel.isActive(routeName) ? 4 : 0,
        borderLeftColor: viewModel.isActive(routeName) ? '#fff' : 'transparent'
    });

    const getTextStyle = (routeName: string): TextStyle => {
        const isActive = viewModel.isActive(routeName);
        return {
            color: isActive ? '#fff' : '#aaa',
            fontWeight: isActive ? 'bold' : 'normal'
        };
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <Text style={styles.title}>Menú</Text>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.menuItem, getItemStyle('Home')]}
                    onPress={() => viewModel.navigateTo('Home')}
                >
                    <Text style={[styles.text, getTextStyle('Home')]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.menuItem, getItemStyle('Decks')]}
                    onPress={() => viewModel.navigateTo('Decks')}
                >
                    <Text style={[styles.text, getTextStyle('Decks')]}>Decks</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.menuItem, getItemStyle('Player')]}
                    onPress={() => viewModel.navigateTo('Player')}
                >
                    <Text style={[styles.text, getTextStyle('Player')]}>Player</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.menuItem, getItemStyle('Cards')]}
                    onPress={() => viewModel.navigateTo('Cards')}
                >
                    <Text style={[styles.text, getTextStyle('Cards')]}>Cards</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.menuItem, getItemStyle('Clans')]}
                    onPress={() => viewModel.navigateTo('Clans')}
                >
                    <Text style={[styles.text, getTextStyle('Clans')]}>Clans</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold'
    },
    menuItem: {
        paddingVertical: 15,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 5,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        textAlign: 'center'
    }
});

export default DrawerContent;