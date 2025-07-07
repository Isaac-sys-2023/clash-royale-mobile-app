import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '@/src/navigation/navigation';
import connectionStyles from './connectionStyles'
import { Animated, Easing } from 'react-native';

type HomeNavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export const ConnectionGuard = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState(true);
    const navigation = useNavigation<HomeNavigationProp>();

    const scaleValue = React.useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(!!state.isConnected);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const heartbeat = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.2, // Escala al 120%
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1, // Vuelve al tamaño original
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        );

        heartbeat.start();
        return () => heartbeat.stop();
    }, []);

    const handleRetry = async () => {
        const state = await NetInfo.fetch();
        if (state.isConnected) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
    };

    if (!isConnected) {
        return (
            <View style={connectionStyles.blackScreen}>
                <Text style={connectionStyles.connectionStatusText}>LOST CONNECTION</Text>
                <Text style={connectionStyles.reconnectMessage}>Please check your internet connection and try again.</Text>
                <Animated.Image
                    source={require('../../assets/images/nowifi.png')}
                    style={[connectionStyles.lagIcon, { transform: [{ scale: scaleValue }] }]}
                />
                <TouchableOpacity onPress={handleRetry} style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontSize: 30, marginRight: 5 }}>Retry</Text>
                    <Image
                        source={require('../../assets/images/icons8-retry-64.png')}
                        style={connectionStyles.retryIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    return <>{children}</>;
};