import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { PlayersViewModel } from './PlayersViewModel';
import { Badge, Player } from '@/src/models/Player';
import { BattleLog, BattlePlayerLog } from '@/src/models/BattlePlayerLog';
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
    const [displayedBattles, setDisplayedBattles] = useState<BattleLog[]>([]);
    const [displayedBadges, setDisplayedBadges] = useState<Badge[]>([]);

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
            viewModel.resetPagination();
        } catch (error) {
            console.error('Search error:', error);
            setError('Error al buscar el jugador');
            setPlayer(viewModel.createEmptyPlayer());
            setPlayerBattleLog(viewModel.createEmptyPlayerBattleLog());
        } finally {
            setIsLoading(false);
        }
    }, [searchInput, viewModel]);

    useEffect(() => {
        if (playerBattleLog.battles.length > 0) {
            setDisplayedBattles(viewModel.getPaginatedBattles());
        }
        if (player.badges.length > 0) {
            setDisplayedBadges(viewModel.getPaginatedBadges());
        }
    }, [playerBattleLog, player]);

    const loadMoreBattles = () => {
        viewModel.loadMoreBattles();
        setDisplayedBattles(viewModel.getPaginatedBattles());
    };

    const loadMoreBadges = () => {
        viewModel.loadMoreBadges();
        setDisplayedBadges(viewModel.getPaginatedBadges());
    };

    const loadPrevBattles = () => {
        viewModel.loadPrevBattles();
        setDisplayedBattles(viewModel.getPaginatedBattles());
    };

    const loadPrevBadges = () => {
        viewModel.loadPrevBadges();
        setDisplayedBadges(viewModel.getPaginatedBadges());
    };

    // Componente memoizado para las tarjetas de batalla
    const BattleCard = React.memo(({ battle }: { battle: BattleLog }) => (
        <View style={playerStyles.battleCard}>
            <View style={playerStyles.battleHeader}>
                <Text style={playerStyles.battleMode}>{battle.gameMode.name}</Text>
                <Text style={playerStyles.battleTime}>
                    {viewModel.formatBattleTime(battle.battleTime)}
                </Text>
            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={playerStyles.battleMode}>{battle.team[0].crowns === battle.opponent[0].crowns ? "Draw" : battle.team[0].crowns > battle.opponent[0].crowns ? "Win" : "Loss"}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={require("../../assets/images/crown.webp")}
                        style={{ height: 30, width: 30 }}
                    />
                    <Text style={[playerStyles.battleMode, { marginHorizontal: 5 }]}>{battle.team[0].crowns} - {battle.opponent[0].crowns}</Text>
                    <Image
                        source={require("../../assets/images/RedCrown.png")}
                        style={{ height: 27, width: 27 }}
                    />
                </View>
                {battle.team[0].trophyChange &&
                    <Text style={playerStyles.trophyChange}>
                        {battle.team[0].trophyChange > 0 ? '+' : ''}
                        {battle.team[0].trophyChange} trophies
                    </Text>
                }
            </View>


            <View style={[playerStyles.battleTeams]}>
                {/* Jugador (team) */}
                <View style={[playerStyles.teamContainer, { backgroundColor: '#2370b8' }]}>
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
                                    <Text style={playerStyles.cardLevel}>Lvl {card.level}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    ));

    // Componente memoizado para las medallas
    const BadgeItem = React.memo(({ badge }: { badge: Badge }) => (
        <View style={{ width: '100%', flexDirection: 'column', backgroundColor: '#444', paddingTop: 10, margin: 5, borderRadius: 10 }}>
            <Text style={[playerStyles.cardsTitle, { textAlign: 'center', padding: 0, margin: 0, }]}>{badge.name}</Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Image
                    source={{ uri: badge.iconUrls.large }}
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
                    {(badge.level && badge.maxLevel) && <Text style={playerStyles.cardName}>Level: {badge.level}/{badge.maxLevel}</Text>}
                    {badge.progress && <Text style={playerStyles.cardName}>Progress: {badge.progress}</Text>}
                    {badge.target && <Text style={playerStyles.cardName}>Target: {badge.target}</Text>}
                </View>
            </View>
        </View>
    ));

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
                        <Text style={playerStyles.loadingText}>Searching for player...</Text>
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

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <Image
                                source={
                                    require('../../assets/images/XP.webp')
                                }
                                style={{
                                    width: 24,
                                    height: undefined,
                                    aspectRatio: 26 / 23,
                                    marginRight: 5,
                                }}
                            />
                            <Text style={playerStyles.playerInfo}>Level: {player.expLevel}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <Image
                                source={
                                    require('../../assets/images/rating.png')
                                }
                                style={{
                                    width: 24,
                                    height: undefined,
                                    aspectRatio: 48 / 64,
                                    marginRight: 5,
                                }}
                            />
                            <Text style={[playerStyles.playerInfo]}>{player.currentPathOfLegendSeasonResult.trophies}  {player.currentPathOfLegendSeasonResult.rank !== null && <>Rank: {player.currentPathOfLegendSeasonResult.rank}</>}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <Image
                                source={
                                    require('../../assets/images/trophy.png')
                                }
                                style={{
                                    width: 24,
                                    height: 24,
                                    marginRight: 5,
                                }}
                            />
                            <Text style={[playerStyles.playerInfo]}>{player.trophies}/{player.bestTrophies} {player.arena.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <Text style={[playerStyles.playerInfo]}>Current Favorite Card: </Text>
                            <Image
                                source={{ uri: player.currentFavouriteCard.iconUrls.medium }}
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
                        </View>


                        <Text style={playerStyles.sectionTitle}>Battle Deck:</Text>
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
                                <Text style={playerStyles.sectionTitle}>Battles {viewModel.getCurrentBattleRange()}</Text>
                                {displayedBattles.map((battle, index) => (
                                    <BattleCard key={`${battle.battleTime}-${index}`} battle={battle} />
                                ))}
                                <View style={playerStyles.paginationControls}>
                                    <TouchableOpacity
                                        style={[
                                            playerStyles.paginationButton,
                                            !viewModel.hasPrevBattles() && playerStyles.disabledButton
                                        ]}
                                        onPress={loadPrevBattles}
                                        disabled={!viewModel.hasPrevBattles()}
                                    >
                                        <Text style={playerStyles.paginationText}>Previous</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            playerStyles.paginationButton,
                                            !viewModel.hasMoreBattles() && playerStyles.disabledButton
                                        ]}
                                        onPress={loadMoreBattles}
                                        disabled={!viewModel.hasMoreBattles()}
                                    >
                                        <Text style={playerStyles.paginationText}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        <Text style={playerStyles.sectionTitle}>Achievement Badges {viewModel.getCurrentBadgeRange()}</Text>
                        <View style={playerStyles.badgeGrid}>
                            {displayedBadges.map((badge, index) => (
                                <BadgeItem key={`${badge.name}-${index}`} badge={badge} />
                            ))}
                            <View style={[playerStyles.paginationControls, { width: '100%' }]}>
                                <TouchableOpacity
                                    style={[
                                        playerStyles.paginationButton,
                                        !viewModel.hasPrevBadges() && playerStyles.disabledButton
                                    ]}
                                    onPress={loadPrevBadges}
                                    disabled={!viewModel.hasPrevBadges()}
                                >
                                    <Text style={playerStyles.paginationText}>Previous</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        playerStyles.paginationButton,
                                        !viewModel.hasMoreBadges() && playerStyles.disabledButton
                                    ]}
                                    onPress={loadMoreBadges}
                                    disabled={!viewModel.hasMoreBadges()}
                                >
                                    <Text style={playerStyles.paginationText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={playerStyles.sectionTitle}>Stats</Text>
                        <View style={{
                            backgroundColor: "#444",
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 5
                        }}>
                            <Text style={[playerStyles.sectionSubTitle]}>Path of Legends Stats</Text>
                            <View style={{
                                backgroundColor: "#666",
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 5
                            }}>
                                <Text style={playerStyles.sectionSubSubTitle}>Best Season</Text>
                                <View>
                                    <Text style={playerStyles.sectionText}>Rank: {player.bestPathOfLegendSeasonResult.rank == null ? "Unranked" : player.bestPathOfLegendSeasonResult.rank}</Text>
                                    <Text style={playerStyles.sectionText}>League: {!player.bestPathOfLegendSeasonResult.leagueNumber ? "Not League" : player.bestPathOfLegendSeasonResult.leagueNumber}</Text>
                                    {player.bestPathOfLegendSeasonResult.trophies > 0 && <Text style={playerStyles.sectionText}>Rattings: {player.bestPathOfLegendSeasonResult.trophies}</Text>}
                                </View>
                            </View>

                            <View style={{
                                backgroundColor: "#666",
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 5
                            }}>
                                <Text style={playerStyles.sectionSubSubTitle}>Current Season</Text>
                                <View>
                                    <Text style={playerStyles.sectionText}>Rank: {player.currentPathOfLegendSeasonResult.rank == null ? "Unranked" : player.currentPathOfLegendSeasonResult.rank}</Text>
                                    <Text style={playerStyles.sectionText}>League: {!player.currentPathOfLegendSeasonResult.leagueNumber ? "Not League" : player.currentPathOfLegendSeasonResult.leagueNumber}</Text>
                                    {player.currentPathOfLegendSeasonResult.trophies > 0 && <Text style={playerStyles.sectionText}>Rattings: {player.currentPathOfLegendSeasonResult.trophies}</Text>}
                                </View>
                            </View>

                            <View style={{
                                backgroundColor: "#666",
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 5
                            }}>
                                <Text style={playerStyles.sectionSubSubTitle}>Last Season</Text>
                                <View>
                                    <Text style={playerStyles.sectionText}>Rank: {player.lastPathOfLegendSeasonResult.rank == null ? "Unranked" : player.lastPathOfLegendSeasonResult.rank}</Text>
                                    <Text style={playerStyles.sectionText}>League: {!player.lastPathOfLegendSeasonResult.leagueNumber ? "Not League" : player.lastPathOfLegendSeasonResult.leagueNumber}</Text>
                                    {player.lastPathOfLegendSeasonResult.trophies > 0 && <Text style={playerStyles.sectionText}>Rattings: {player.lastPathOfLegendSeasonResult.trophies}</Text>}
                                </View>
                            </View>

                            {player.leagueStatistics.bestSeason.trophies > 0 && <View style={{
                                backgroundColor: "#666",
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 5
                            }}>
                                <Text style={playerStyles.sectionSubSubTitle}>Best Legacy Ladder Season</Text>
                                <View>
                                    <Text style={playerStyles.sectionText}>Rank: {player.leagueStatistics.bestSeason.rank == null ? "Unranked" : player.lastPathOfLegendSeasonResult.rank}</Text>
                                    <Text style={playerStyles.sectionText}>Trophies: {player.leagueStatistics.bestSeason.trophies}</Text>
                                </View>
                            </View>}
                        </View>


                        <View style={{
                            backgroundColor: "#444",
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 5
                        }}>
                            <Text style={[playerStyles.sectionSubTitle]}>Battle Stats</Text>
                            <View style={{
                                backgroundColor: "#666",
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 5
                            }}>
                                <Text style={playerStyles.sectionSubSubTitle}>Clan Wars</Text>
                                <View>
                                    <Text style={playerStyles.sectionText}>Clan Cards Collected: {player.clanCardsCollected}</Text>
                                    <Text style={playerStyles.sectionText}>War Day Wins: {player.warDayWins}</Text>
                                </View>
                            </View>

                            <View style={{
                                backgroundColor: "#666",
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 5
                            }}>
                                <Text style={playerStyles.sectionSubSubTitle}>Games</Text>
                                <View>
                                    <Text style={playerStyles.sectionText}>Wins: {player.wins} - {((player.wins / player.battleCount) * 100).toFixed(2)}% de victoria</Text>
                                    <Text style={playerStyles.sectionText}>Losses: {player.losses} - {((player.losses / player.battleCount) * 100).toFixed(2)}%  de derrota</Text>
                                    <Text style={playerStyles.sectionText}>Total Games: {player.battleCount}</Text>
                                    <Text style={playerStyles.sectionText}>Three crown wins: {player.threeCrownWins}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            backgroundColor: "#444",
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 5
                        }}>
                            <Text style={[playerStyles.sectionSubTitle]}>Challenge Stats</Text>
                            <View style={{
                                backgroundColor: "#666",
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 5
                            }}>
                                <Text style={playerStyles.sectionSubSubTitle}>Challenges</Text>
                                <View>
                                    <Text style={playerStyles.sectionText}>Max wins: {player.challengeMaxWins}</Text>
                                    <Text style={playerStyles.sectionText}>Cards Won: {player.challengeCardsWon}</Text>
                                    <Text style={playerStyles.sectionText}>Grand Challenge 12-wins: {player.badges.find(badge => badge.name === "Grand12Wins")?.progress || 0}</Text>
                                </View>
                            </View>

                            <View style={{
                                backgroundColor: "#666",
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 5
                            }}>
                                <Text style={playerStyles.sectionSubSubTitle}>Tournaments</Text>
                                <View>
                                    <Text style={playerStyles.sectionText}>Total Games: {player.tournamentBattleCount}</Text>
                                    <Text style={playerStyles.sectionText}>Cards Won: {player.tournamentCardsWon}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            backgroundColor: "#444",
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 5
                        }}>
                            <Text style={[playerStyles.sectionSubTitle]}>Misc Stats</Text>
                            <View style={{
                                backgroundColor: "#666",
                                borderRadius: 10,
                                padding: 10,
                                marginBottom: 5
                            }}>
                                <Text style={playerStyles.sectionText}>Experience: {player.expLevel}</Text>
                                <Text style={playerStyles.sectionText}>Total donations: {player.totalDonations}</Text>
                                <Text style={playerStyles.sectionText}>Star points: {player.starPoints}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {!isLoading && !player.tag && !error && (
                    <View style={playerStyles.centerContainer}>
                        <Text style={playerStyles.placeholderText}>
                            Enter a Clash Royale tag to search for a player
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView >
    );
};

export default PlayerScreen;