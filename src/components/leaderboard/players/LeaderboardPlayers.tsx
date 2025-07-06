import { Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import leaderboardPlayersStyles from './leaderboardsPlayers'
import { RootDrawerParamList } from "@/src/navigation/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { LeaderboardPlayersViewModel } from "./LeaderboardPlayersViewModel";
import { SelectCountries } from "@/src/components/select/SelectCountries";
import { Location, PathOfLegendsPlayer } from "@/src/models/Location";

type HomeNavigationProp = DrawerNavigationProp<RootDrawerParamList>;

interface LeaderboardPlayersProps {
    title: string;
    limit: number;
}

export default function LeaderboardPlayers({ title, limit }: LeaderboardPlayersProps) {
    const navigation = useNavigation<HomeNavigationProp>();

    const [viewModel] = useState(() => new LeaderboardPlayersViewModel());
    const [selectedCountry, setSelectedCountry] = useState<Location | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [topPlayers, setTopPlayers] = useState<PathOfLegendsPlayer[]>([]);

    useEffect(() => {
        const init = async () => {
            try {
                await viewModel.initialize();
                const defaultCountry = viewModel.getMyCountry();
                setSelectedCountry(defaultCountry);
                await viewModel.getTopRankLocalPlayers(defaultCountry.id, limit);
                setTopPlayers(viewModel.getLocalHomeRankPlayers())
            } catch (error) {
                console.error("Initialization error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, []);

    return (
        <View>
            {isLoading ? (
                <>
                    <ActivityIndicator size="large" color="#BB86FC" />
                    <Text style={[leaderboardPlayersStyles.initSectionText, { textAlign: 'center' }]}>Cargando...</Text>
                </>

            ) : (
                <>
                    <Text style={leaderboardPlayersStyles.sectionTitle}>{title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <Text style={[leaderboardPlayersStyles.initSectionText, { marginRight: 5 }]}>Select clan's country:</Text>
                        {selectedCountry && (
                            <SelectCountries
                                selectedCountry={selectedCountry}
                                onSelect={async (country) => {
                                    setSelectedCountry(country);
                                    await viewModel.getTopRankLocalPlayers(country.id, limit);
                                    setTopPlayers(viewModel.getLocalHomeRankPlayers())
                                }}
                            />
                        )}
                    </View>
                    {topPlayers.length > 0 ? (
                        <>
                            {topPlayers.map((p, i) => (
                                <View key={i} style={[leaderboardPlayersStyles.topPlayerContainer, p.rank === 1 ? { backgroundColor: '#D4AF37' } : p.rank === 2 ? { backgroundColor: '#E6E8FA' } : p.rank === 3 ? { backgroundColor: '#B1560F' } : null]}>
                                    <View style={leaderboardPlayersStyles.fondoTop}>
                                        <TouchableOpacity 
                                            style={leaderboardPlayersStyles.topPlayerContainerItem}
                                            onPress={() => navigation.navigate('Player', { tag: p.tag })}
                                        >
                                            <Text style={[leaderboardPlayersStyles.initSectionText]}>{p.name}</Text>
                                            <Text style={[leaderboardPlayersStyles.initSectionText]}>{p.tag}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <Image
                                                    source={
                                                        require('../../../assets/images/XP.webp')
                                                    }
                                                    style={{
                                                        width: 24,
                                                        height: undefined,
                                                        aspectRatio: 26 / 23,
                                                        marginRight: 5,
                                                    }}
                                                />
                                                <Text style={leaderboardPlayersStyles.playerInfo}>Level: {p.expLevel}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={leaderboardPlayersStyles.topPlayerContainerItem}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    source={
                                                        require('../../../assets/images/rating.png')
                                                    }
                                                    style={{
                                                        width: 24,
                                                        height: undefined,
                                                        aspectRatio: 48 / 64,
                                                        marginRight: 5,
                                                    }}
                                                />
                                                <Text style={leaderboardPlayersStyles.playerInfo}>{p.eloRating}</Text>
                                            </View>
                                            {p.clan
                                                ? <TouchableOpacity 
                                                    style={leaderboardPlayersStyles.topPlayerClanInfo}
                                                    onPress={() => navigation.navigate('Clans', { tag: p.clan.tag })}
                                                >
                                                    <Text style={[leaderboardPlayersStyles.initSectionText, { textAlign: 'center' }]}>Clan: {p.clan.name}</Text>
                                                    <Text style={[leaderboardPlayersStyles.initSectionText, { textAlign: 'center' }]}>{p.clan.tag}</Text>
                                                </TouchableOpacity>
                                                : <Text style={[leaderboardPlayersStyles.initSectionText, { textAlign: 'center' }]}>No Clan</Text>
                                            }
                                        </View>
                                        <View style={[leaderboardPlayersStyles.topPlayerContainerItem, { alignItems: 'center' }]}>
                                            <View style={{
                                                position: 'relative',
                                                width: '75%',
                                                aspectRatio: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Image
                                                    source={require('../../../assets/images/league10.png')}
                                                    style={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        resizeMode: 'contain'
                                                    }}
                                                />
                                                <Text style={[
                                                    leaderboardPlayersStyles.rankPlayer,
                                                    {
                                                        position: 'relative',
                                                        zIndex: 1,
                                                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                                        textShadowOffset: { width: 1, height: 1 },
                                                        textShadowRadius: 2
                                                    }
                                                ]}>
                                                    {p.rank}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </>
                    ) : (
                        <>
                            <Text style={[leaderboardPlayersStyles.initSectionText, { textAlign: 'center' }]}>No hay jugadores top en tu pais.</Text>
                        </>
                    )}
                </>
            )}
        </View>
    )
}