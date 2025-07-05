import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { PlayersViewModel } from './PlayersViewModel';
import { Player } from '@/src/models/Player';
import { BattlePlayerLog } from '@/src/models/BattlePlayerLog';
import playerStyles from './playersStyles'

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
        <SafeAreaView style={playerStyles.container}>
            <StatusBar style="light" />

            <ScrollView
                style={playerStyles.container}
                contentContainerStyle={playerStyles.contentContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={playerStyles.searchContainer}>
                    <TextInput
                        style={playerStyles.searchInput}
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
                        style={playerStyles.searchButton}
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
                    <View style={playerStyles.centerContainer}>
                        <ActivityIndicator size="large" color="#FFF" />
                        <Text style={playerStyles.loadingText}>Buscando jugador...</Text>
                    </View>
                )}

                {error && !isLoading && (
                    <View style={playerStyles.centerContainer}>
                        <Text style={playerStyles.errorText}>{error}</Text>
                    </View>
                )}

                {!isLoading && player.tag && (
                    <View style={playerStyles.playerContainer}>
                        <Text style={playerStyles.playerName}>{player.name}</Text>
                        <Text style={playerStyles.playerTag}>{player.tag}</Text>
                        <Text style={playerStyles.playerInfo}>Nivel: {player.expLevel}</Text>
                        <Text style={playerStyles.playerInfo}>Trofeos: {player.trophies}</Text>

                        <Text style={playerStyles.sectionTitle}>Mazo Bélico:</Text>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                {player.currentDeck.map((card, index) => (
                                    <View key={index} style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                        <Image
                                            source={{ uri: (index === 0 || index === 1) && card.iconUrls.evolutionMedium ? card.iconUrls.evolutionMedium : card.iconUrls.medium }}
                                            style={{
                                                width: undefined, // Anular el width fijo
                                                height: 75,
                                                aspectRatio: 35 / 55, // Mantener relación de aspecto original (35/55)
                                                marginHorizontal: 1, // Pequeño margen entre cartas (opcional)
                                                resizeMode: 'contain',
                                                marginBottom: 0,
                                            }}
                                            resizeMode="contain"
                                        />
                                        <Text style={{ color: 'white', fontSize: 10, textAlign: 'center', marginTop: -4, }}>Lvl. {card.level ? viewModel.formatLevel(card.level, card.rarity) : ""}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={{ uri: player.currentDeckSupportCards[0].iconUrls.medium }}
                                    style={{
                                        flex: 1, // Esto distribuirá el espacio equitativamente
                                        width: undefined, // Anular el width fijo
                                        height: 55,
                                        aspectRatio: 35 / 55, // Mantener relación de aspecto original (35/55)
                                        marginHorizontal: 1, // Pequeño margen entre cartas (opcional)
                                        resizeMode: 'contain'
                                    }}
                                    resizeMode="contain"
                                />
                                <View style={{ flex: 3, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>{player.currentDeckSupportCards[0].name}</Text>
                                    <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>Lvl. {player.currentDeckSupportCards[0].level ? viewModel.formatLevel(player.currentDeckSupportCards[0].level, player.currentDeckSupportCards[0].rarity) : ""}</Text>
                                </View>
                            </View>
                        </View>


                        {playerBattleLog.battles.length > 0 && (
                            <View style={playerStyles.battleLogContainer}>
                                <Text style={playerStyles.sectionTitle}>Historial de Batallas</Text>

                                {playerBattleLog.battles.map((battle, index) => (
                                    <View key={`${battle.battleTime}-${index}`} style={playerStyles.battleCard}>
                                        <View style={playerStyles.battleHeader}>
                                            <Text style={playerStyles.battleMode}>{battle.gameMode.name}</Text>
                                            <Text style={playerStyles.battleTime}>
                                                {viewModel.formatBattleTime(battle.battleTime)}
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={playerStyles.battleMode}>{battle.team[0].crowns === battle.opponent[0].crowns ? "Empate" : battle.team[0].crowns > battle.opponent[0].crowns ? "Victoria" : "Derrota"}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    source={require("../../assets/images/crown.webp")}
                                                    style={{ height: 30, width: 30 }}
                                                />
                                                <Text style={[playerStyles.battleMode, {marginHorizontal: 5}]}>{battle.team[0].crowns} - {battle.opponent[0].crowns}</Text>
                                                <Image
                                                    source={require("../../assets/images/RedCrown.png")}
                                                    style={{ height: 27, width: 27 }}
                                                />
                                            </View>
                                            {battle.team[0].trophyChange &&
                                                <Text style={playerStyles.trophyChange}>
                                                    {battle.team[0].trophyChange > 0 ? '+' : ''}
                                                    {battle.team[0].trophyChange} trofeos
                                                </Text>
                                            }
                                        </View>


                                        <View style={[playerStyles.battleTeams]}>
                                            {/* Jugador (team) */}
                                            <View style={[playerStyles.teamContainer, { backgroundColor: '#2370b8' }]}>
                                                <Text style={playerStyles.teamTitle}>Tú</Text>
                                                <Text style={playerStyles.playerNameText} numberOfLines={1} ellipsizeMode="tail">
                                                    {battle.team[0].name}
                                                </Text>
                                                {/* Cartas usadas */}
                                                <View style={playerStyles.cardsContainer}>
                                                    <View style={playerStyles.cardsGrid}>
                                                        {battle.team[0].cards.map((card, i) => (
                                                            <View key={`${card.id}-${i}`} style={playerStyles.cardItem}>
                                                                <Image
                                                                    source={{ uri: (i === 0 || i === 1) && card.iconUrls.evolutionMedium ? card.iconUrls.evolutionMedium : card.iconUrls.medium }}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: undefined,
                                                                        aspectRatio: 35 / 55,
                                                                        marginHorizontal: 1,
                                                                        resizeMode: 'contain',
                                                                        marginBottom: 0,
                                                                    }}
                                                                    resizeMode="contain"
                                                                />
                                                                <Text style={playerStyles.cardLevel}>Lvl {card.level}</Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                </View>
                                            </View>

                                            {/* VS */}
                                            <Text style={playerStyles.vsText}>VS</Text>

                                            {/* Oponente */}
                                            <View style={[playerStyles.teamContainer, { backgroundColor: '#fd2926' }]}>
                                                <Text style={playerStyles.teamTitle}>Oponente</Text>
                                                <Text style={playerStyles.playerNameText} numberOfLines={1} ellipsizeMode="tail">
                                                    {battle.opponent[0].name}
                                                </Text>
                                                {/* Cartas usadas */}
                                                <View style={playerStyles.cardsContainer}>
                                                    <View style={playerStyles.cardsGrid}>
                                                        {battle.opponent[0].cards.map((card, i) => (
                                                            <View key={`${card.id}-${i}`} style={playerStyles.cardItem}>
                                                                <Image
                                                                    source={{ uri: (i === 0 || i === 1) && card.iconUrls.evolutionMedium ? card.iconUrls.evolutionMedium : card.iconUrls.medium }}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: undefined,
                                                                        aspectRatio: 35 / 55,
                                                                        marginHorizontal: 1,
                                                                        resizeMode: 'contain',
                                                                        marginBottom: 0,
                                                                    }}
                                                                    resizeMode="contain"
                                                                />
                                                                <Text style={playerStyles.cardLevel}>Nvl {card.level}</Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}

                        <Text style={playerStyles.sectionTitle}>Medallas:</Text>
                        <View style={playerStyles.badgeGrid}>
                            {player.badges.map((b, i) => (
                                <View key={i} style={{ width: '100%', flexDirection: 'column', backgroundColor: '#444', paddingTop: 10, margin: 5, borderRadius: 10 }}>
                                    <Text style={[playerStyles.cardsTitle, { textAlign: 'center', padding: 0, margin: 0, }]}>{b.name}</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                        <Image
                                            source={{ uri: b.iconUrls.large }}
                                            style={{
                                                flex: 1, // Esto distribuirá el espacio equitativamente
                                                width: undefined, // Anular el width fijo
                                                height: 300,
                                                aspectRatio: 55 / 55, // Mantener relación de aspecto original (35/55)
                                                marginHorizontal: 1, // Pequeño margen entre cartas (opcional)
                                                resizeMode: 'contain',
                                                marginVertical: 0,
                                                paddingVertical: 0,
                                            }}
                                            resizeMode="contain"
                                        />
                                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                                            {(b.level && b.maxLevel) && <Text style={playerStyles.cardName}>Level: {b.level}/{b.maxLevel}</Text>}
                                            {b.progress && <Text style={playerStyles.cardName}>Progress: {b.progress}</Text>}
                                            {b.target && <Text style={playerStyles.cardName}>Target: {b.target}</Text>}
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {!isLoading && !player.tag && !error && (
                    <View style={playerStyles.centerContainer}>
                        <Text style={playerStyles.placeholderText}>
                            Ingresa un tag de Clash Royale para buscar un jugador
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default PlayerScreen;