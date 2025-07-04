import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { PlayersViewModel } from './PlayersViewModel';
import { Player } from '@/src/models/Player';

interface PlayerScreenProps {
    tag?: string;
}

const PlayerScreen = ({ tag }: PlayerScreenProps) => {
    const [viewModel] = useState(() => new PlayersViewModel());
    const [player, setPlayer] = useState<Player>(viewModel.createEmptyPlayer());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState(tag ? tag.trim().replace('#', '') : '');

    useEffect(() => {
        if (tag && tag.trim()) {
            handleSearch();
        }
    }, []);

    const handleSearch = useCallback(async () => {
        if (!searchInput.trim()) {
            setError("Por favor ingresa un tag válido");
            return;
        }

        Keyboard.dismiss();
        viewModel.setCurrentTag(searchInput);
        setIsLoading(true);
        setError(null);

        try {
            viewModel.setCurrentTag(searchInput);
            await viewModel.searchPlayer();
            setPlayer(viewModel.getPlayer());
            setError(viewModel.getError());
        } catch (error) {
            console.error('Search error:', error);
            setError('Error al buscar el jugador');
            setPlayer(viewModel.createEmptyPlayer());
        } finally {
            setIsLoading(false);
        }
    }, [searchInput, viewModel]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Ingresa el tag del jugador (ej: RVCQ2CQGJ)"
                    placeholderTextColor="#999"
                    value={searchInput}
                    onChangeText={setSearchInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}
                    disabled={isLoading || !searchInput.trim()}
                >
                    <MaterialIcons
                        name="search"
                        size={24}
                        color={isLoading || !searchInput.trim() ? "#666" : "#FFF"}
                    />
                </TouchableOpacity>
            </View>

            {isLoading && (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#FFF" />
                    <Text style={styles.loadingText}>Buscando jugador...</Text>
                </View>
            )}

            {error && !isLoading && (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            {!isLoading && player.tag && (
                <View style={styles.playerContainer}>
                    <Text style={styles.playerName}>{player.name}</Text>
                    <Text style={styles.playerTag}>{player.tag}</Text>
                    <Text style={styles.playerInfo}>Nivel: {player.expLevel}</Text>
                    <Text style={styles.playerInfo}>Trofeos: {player.trophies}</Text>
                </View>
            )}

            {!isLoading && !player.tag && !error && (
                <View style={styles.centerContainer}>
                    <Text style={styles.placeholderText}>
                        Ingresa un tag de Clash Royale para buscar un jugador
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#2D2D2D',
        color: '#FFF',
        borderRadius: 8,
        padding: 12,
        marginRight: 10,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#4A148C',
        borderRadius: 8,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#FFF',
        marginTop: 10,
        fontSize: 16,
    },
    errorText: {
        color: '#FF5252',
        fontSize: 16,
        textAlign: 'center',
    },
    placeholderText: {
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
    },
    playerContainer: {
        backgroundColor: '#2D2D2D',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
    },
    playerName: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    playerTag: {
        color: '#BB86FC',
        fontSize: 16,
        marginBottom: 12,
    },
    playerInfo: {
        color: '#FFF',
        fontSize: 16,
        marginBottom: 8,
    },
});

export default PlayerScreen;