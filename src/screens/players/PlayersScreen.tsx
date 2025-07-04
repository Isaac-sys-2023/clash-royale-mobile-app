import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { PlayersViewModel } from './PlayersViewModel';
import { Player } from '@/src/models/Player';
import { BattlePlayerLog } from '@/src/models/BattlePlayerLog';

interface PlayerScreenProps {
    tag?: string;
}

const PlayerScreen = ({ tag }: PlayerScreenProps) => {
    const [viewModel] = useState(() => new PlayersViewModel());
    const [player, setPlayer] = useState<Player>(viewModel.createEmptyPlayer());
    const [playerBattleLog, setPlayerBattleLog] = useState<BattlePlayerLog>(viewModel.createEmptyPlayerBattleLog())
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
            
            console.log('Setting battle log:', JSON.stringify(viewModel.getPlayerBattleLog(), null, 2));
            
            setPlayerBattleLog(viewModel.getPlayerBattleLog());
            setError(viewModel.getError());
        } catch (error) {
            console.error('Search error:', error);
            setError('Error al buscar el jugador');
            setPlayer(viewModel.createEmptyPlayer());
            setPlayerBattleLog(viewModel.createEmptyPlayerBattleLog());
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

                    {playerBattleLog.battles.length > 0 && (
                        <View style={styles.battleLogContainer}>
                            <Text style={styles.sectionTitle}>Historial de Batallas</Text>

                            {playerBattleLog.battles.map((battle, index) => (
                                <View key={`${battle.battleTime}-${index}`} style={styles.battleCard}>
                                    <View style={styles.battleHeader}>
                                        <Text style={styles.battleMode}>{battle.gameMode.name}</Text>
                                        <Text style={styles.battleTime}>
                                            {new Date(battle.battleTime).toLocaleString()}
                                        </Text>
                                    </View>

                                    <View style={styles.battleTeams}>
                                        {/* Jugador (team) */}
                                        <View style={styles.teamContainer}>
                                            <Text style={styles.teamTitle}>Tú</Text>
                                            <Text style={styles.playerNameText}>
                                                {battle.team[0].name} ({battle.team[0].crowns} coronas)
                                            </Text>
                                            <Text style={styles.trophyChange}>
                                                {battle.team[0].trophyChange > 0 ? '+' : ''}
                                                {battle.team[0].trophyChange} trofeos
                                            </Text>
                                        </View>

                                        {/* VS */}
                                        <Text style={styles.vsText}>VS</Text>

                                        {/* Oponente */}
                                        <View style={styles.teamContainer}>
                                            <Text style={styles.teamTitle}>Oponente</Text>
                                            <Text style={styles.playerNameText}>
                                                {battle.opponent[0].name} ({battle.opponent[0].crowns} coronas)
                                            </Text>
                                            <Text style={styles.trophyChange}>
                                                {battle.opponent[0].trophyChange > 0 ? '+' : ''}
                                                {battle.opponent[0].trophyChange} trofeos
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Cartas usadas */}
                                    <View style={styles.cardsContainer}>
                                        <Text style={styles.cardsTitle}>Tus cartas:</Text>
                                        <View style={styles.cardsGrid}>
                                            {battle.team[0].cards.map((card, i) => (
                                                <View key={`${card.id}-${i}`} style={styles.cardItem}>
                                                    <Text style={styles.cardName}>{card.name}</Text>
                                                    <Text style={styles.cardLevel}>Nvl {card.level}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
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

    battleLogContainer: {
        marginTop: 20,
    },
    sectionTitle: {
        color: '#BB86FC',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    battleCard: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    battleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    battleMode: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    battleTime: {
        color: '#AAA',
        fontSize: 12,
    },
    battleTeams: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    teamContainer: {
        flex: 1,
    },
    teamTitle: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    playerNameText: {
        color: '#FFF',
    },
    trophyChange: {
        color: '#4CAF50', // Verde para ganancias, podrías cambiar a rojo si es negativo
    },
    vsText: {
        color: '#FFF',
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    cardsContainer: {
        marginTop: 10,
    },
    cardsTitle: {
        color: '#BB86FC',
        marginBottom: 5,
    },
    cardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardItem: {
        backgroundColor: '#444',
        borderRadius: 5,
        padding: 5,
        margin: 3,
        width: '23%', // Para que quepan 4 por fila
    },
    cardName: {
        color: '#FFF',
        fontSize: 12,
    },
    cardLevel: {
        color: '#AAA',
        fontSize: 10,
    },
});

export default PlayerScreen;