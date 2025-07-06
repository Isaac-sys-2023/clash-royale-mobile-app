import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerViewModel } from './DrawerViewModel';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextStyle } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

import drawerContentStyles from './drawerContentStyles'

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
        backgroundColor: viewModel.isActive(routeName) ? '#2370b8' : 'transparent',
        borderLeftWidth: viewModel.isActive(routeName) ? 4 : 0,
        borderLeftColor: viewModel.isActive(routeName) ? '#FFD700' : 'transparent',
        borderBottomColor: viewModel.isActive(routeName) ? '#FFD700' : "#eee",
    });

    const getTextStyle = (routeName: string): TextStyle => {
        const isActive = viewModel.isActive(routeName);
        return {
            color: isActive ? '#fff' : '#aaa',
            fontWeight: isActive ? 'bold' : 'normal'
        };
    };

    const getImage = (routeName: string) => {
        const isActive = viewModel.isActive(routeName);
        return (
            <>
                {isActive && <Image
                    source={require("../assets/images/crown.webp")}
                    style={{ height: 30, width: 30, marginRight: 5 }}
                />}
            </>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <Text style={drawerContentStyles.title}>Menú</Text>
            <View style={drawerContentStyles.container}>
                <TouchableOpacity
                    style={[drawerContentStyles.menuItem, getItemStyle('Home')]}
                    onPress={() => viewModel.navigateTo('Home')}
                >
                    {getImage('Home')}
                    <Text style={[drawerContentStyles.text, getTextStyle('Home')]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[drawerContentStyles.menuItem, getItemStyle('Decks')]}
                    onPress={() => viewModel.navigateTo('Decks')}
                >
                    {getImage('Decks')}
                    <Text style={[drawerContentStyles.text, getTextStyle('Decks')]}>Decks</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[drawerContentStyles.menuItem, getItemStyle('Player')]}
                    onPress={() => viewModel.navigateTo('Player')}
                >
                    {getImage('Player')}
                    <Text style={[drawerContentStyles.text, getTextStyle('Player')]}>Player</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[drawerContentStyles.menuItem, getItemStyle('Cards')]}
                    onPress={() => viewModel.navigateTo('Cards')}
                >
                    {getImage('Cards')}
                    <Text style={[drawerContentStyles.text, getTextStyle('Cards')]}>Cards</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[drawerContentStyles.menuItem, getItemStyle('Clans')]}
                    onPress={() => viewModel.navigateTo('Clans')}
                >
                    {getImage('Clans')}
                    <Text style={[drawerContentStyles.text, getTextStyle('Clans')]}>Clans</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default DrawerContent;