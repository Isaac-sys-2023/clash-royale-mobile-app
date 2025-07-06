import { Text, FlatList, ActivityIndicator, StyleSheet, View, Image, TouchableOpacity, ScrollView, TextInput, Keyboard } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClansViewModel } from "./ClansViewModel";
import { useCallback, useEffect, useState } from "react";
import { Location } from "@/src/models/Location";
import { Clan, Clans, Members } from "@/src/models/Clan";
import { CurrentRiverRace, War } from "@/src/models/RiverRaceLog";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SelectCountries } from "@/src/components/select/SelectCountries";
import clanStyles from './clanStyles'
import MembersTable from "@/src/components/table/MembersTable";
import { RootDrawerParamList } from "@/src/navigation/navigation";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";

interface ClanScreenProps {
    tag?: string;
}

enum ClanSection {
    CLANS = 'Clans',
    DETAILS = 'Details'
}

export default function ClansScreen({ tag: propTag }: ClanScreenProps) {
    const route = useRoute<RouteProp<RootDrawerParamList, 'Clans'>>();

    const [viewModel] = useState(() => new ClansViewModel());

    const [clans, setClans] = useState<Clans>({ items: [] });

    const navigationTag = route.params?.tag;
    const initialTag = navigationTag || propTag || '';
    const [searchInput, setSearchInput] = useState(initialTag);
    // const [searchInput, setSearchInput] = useState(tag ? tag.trim().replace('#', '') : '');

    // const [currentTagClan, setCurrentTagClan] = useState<string>(tag || '');
    const [currentTagClan, setCurrentTagClan] = useState<string>('');
    const [currentClan, setCurrentClan] = useState<Clan>(viewModel.createEmptyClan());
    const [currentClanMembers, setCurrentClanMembers] = useState<Members>({ items: [] });
    const [currentClanWarsLog, setCurrentClanWarsLog] = useState<War>({ items: [] });
    const [currentClanCurrentWar, setCurrentClanCurrentWar] = useState<CurrentRiverRace>(viewModel.createEmptyCurrentWar());

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedCountry, setSelectedCountry] = useState<Location | null>(null);

    const [minMembers, setMinMembers] = useState<string>('0');
    const [maxMembers, setMaxMembers] = useState<string>('50');
    const [minScore, setMinScore] = useState<string>('0');

    // const [activeSection, setActiveSection] = useState<ClanSection>(tag ? ClanSection.DETAILS : ClanSection.CLANS);
    const [activeSection, setActiveSection] = useState<ClanSection>(ClanSection.CLANS);

    // useEffect(() => {
    //     if (tag && tag.trim()) {
    //         handleSearch();
    //     }
    // }, []);
    useFocusEffect(
        useCallback(() => {
            const currentTag = route.params?.tag || propTag || '';
            const loadClan = async () => {
                setSearchInput(currentTag);
                setActiveSection(ClanSection.DETAILS);
                if (currentTag) {
                    Keyboard.dismiss();
                    setIsLoading(true);
                    setError(null);

                    try {
                        await viewModel.loadClan(currentTag);
                        const clan = viewModel.getCurrentClan()
                        console.log('Search results:', clan);
                        setCurrentClan(clan);
                        setCurrentTagClan(clan.tag)
                        setCurrentClanCurrentWar(viewModel.getCurrentWarClan());
                        setCurrentClanMembers(viewModel.getMembersClan());
                        setCurrentClanWarsLog(viewModel.getWarsClan());
                    } catch (error) {
                        console.error('Search error:', error);
                        setError('Error al buscar el clan');
                        setCurrentClan(viewModel.createEmptyClan());
                        setCurrentClanCurrentWar(viewModel.createEmptyCurrentWar());
                    } finally {
                        setIsLoading(false);
                    }
                }
            };

            loadClan();
        }, [route.params?.tag, propTag, viewModel])
    );

    const handleSearch = useCallback(async () => {
        if (activeSection === ClanSection.CLANS && searchInput.trim().length < 3) {
            setError("Por favor ingresa al menos 3 caracteres");
            return;
        }

        if (activeSection === ClanSection.DETAILS && !searchInput.trim()) {
            setError("Por favor ingresa un tag válido");
            return;
        }

        Keyboard.dismiss();
        setIsLoading(true);
        setError(null);

        try {
            const params = {
                name: searchInput,
                locationId: selectedCountry?.id || 0,
                minMembers: parseInt(minMembers, 10) || 0,
                maxMembers: parseInt(maxMembers, 10) || 50,
                minScore: parseInt(minScore, 10) || 0,
                limit: 50
            };

            if (activeSection === ClanSection.CLANS) {
                await viewModel.loadClans(
                    params.name,
                    params.locationId,
                    params.minMembers,
                    params.maxMembers,
                    params.minScore,
                    params.limit
                );
                const results = viewModel.getClans();
                setClans(results);
            }
            if (activeSection === ClanSection.DETAILS) {
                await viewModel.loadClan(searchInput.toUpperCase());
                const clan = viewModel.getCurrentClan();
                setCurrentClan(clan);
                setCurrentTagClan(clan.tag)
                setCurrentClanCurrentWar(viewModel.getCurrentWarClan());
                setCurrentClanMembers(viewModel.getMembersClan());
                setCurrentClanWarsLog(viewModel.getWarsClan());
            }
        } catch (error) {
            console.error('Search error:', error);
            setError('Error al buscar el clan');
            setCurrentClan(viewModel.createEmptyClan());
            setCurrentClanCurrentWar(viewModel.createEmptyCurrentWar());
        } finally {
            setIsLoading(false);
        }
    }, [searchInput, minMembers, maxMembers, minScore, viewModel, activeSection, selectedCountry]);

    const SectionNavbar = () => (
        <View style={clanStyles.navbarContainer}>
            {Object.values(ClanSection).map((section) => (
                <TouchableOpacity
                    key={section}
                    style={[
                        clanStyles.navbarItem,
                        activeSection === section && clanStyles.activeNavbarItem
                    ]}
                    onPress={() => {
                        setActiveSection(section)
                        setSearchInput('')
                    }}
                >
                    <Text style={clanStyles.navbarText}>{section}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    if (isLoading) {
        return (
            <SafeAreaView style={clanStyles.container}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={[clanStyles.defaultTextColor, { textAlign: 'center' }]}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={clanStyles.container}>
                <Text style={clanStyles.errorText}>{error}</Text>
                <TouchableOpacity
                    style={clanStyles.retryButton}
                    onPress={() => {
                        setError(null)
                        setCurrentTagClan('');
                        setCurrentClan(viewModel.createEmptyClan());
                        setCurrentClanMembers({ items: [] });
                        setCurrentClanWarsLog({ items: [] });
                        setCurrentClanCurrentWar(viewModel.createEmptyCurrentWar());
                    }} // Limpia el error
                >
                    <Text style={clanStyles.retryButtonText}>OK</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={clanStyles.container}
            edges={['bottom', 'left', 'right']}
        >
            <StatusBar style="light" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <Text style={clanStyles.title}>SEARCH YOUR CLAN</Text>

                {activeSection === ClanSection.CLANS && <Text style={clanStyles.instruction}>Insert clan's name {'(Min 3 letters)'}</Text>}
                {activeSection === ClanSection.DETAILS && <Text style={clanStyles.instruction}>Insert clan's tag {'(Ej: #R98PPYPL)'}</Text>}

                <View style={clanStyles.searchContainer}>
                    <TextInput
                        style={clanStyles.searchInput}
                        value={searchInput}
                        onChangeText={setSearchInput}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="search"
                        onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity
                        style={clanStyles.searchButton}
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

                <SectionNavbar />

                {activeSection === ClanSection.CLANS && (
                    <View style={clanStyles.sectionContainer}>
                        <Text style={clanStyles.sectionTitle}>Advanced Filters</Text>
                        <View>
                            <View style={clanStyles.clanFilter}>
                                <Text style={clanStyles.defaultTextColor}>Select clan's country:</Text>
                                <SelectCountries
                                    selectedCountry={selectedCountry}
                                    onSelect={(country) => setSelectedCountry(country)}
                                />
                            </View>
                            <View style={clanStyles.clanFilter}>
                                <Text style={clanStyles.defaultTextColor}>Select clan's Min. Members:</Text>
                                <TextInput
                                    style={clanStyles.searchFilterInput}
                                    value={minMembers}
                                    onChangeText={(text) => {
                                        if (/^\d*$/.test(text)) {
                                            setMinMembers(text);
                                        }
                                    }}
                                    keyboardType="number-pad"
                                    placeholder="0-49"
                                    maxLength={2}
                                />
                            </View>
                            <View style={clanStyles.clanFilter}>
                                <Text style={clanStyles.defaultTextColor}>Select clan's Max. Members:</Text>
                                <TextInput
                                    style={clanStyles.searchFilterInput}
                                    value={maxMembers}
                                    onChangeText={(text) => {
                                        if (/^\d*$/.test(text)) {
                                            setMaxMembers(text);
                                        }
                                    }}
                                    keyboardType="number-pad"
                                    placeholder="1-50"
                                    maxLength={2}
                                />
                            </View>
                            <View style={clanStyles.clanFilter}>
                                <Text style={clanStyles.defaultTextColor}>Select clan's Min. Score:</Text>
                                <TextInput
                                    style={clanStyles.searchFilterInput}
                                    value={minScore}
                                    onChangeText={(text) => {
                                        if (/^\d*$/.test(text)) {
                                            setMinScore(text);
                                        }
                                    }}
                                    keyboardType="number-pad"
                                    placeholder="0-9000"
                                    maxLength={4}
                                />
                            </View>
                        </View>

                        {clans.items.length > 0 ? (
                            <View style={clanStyles.clansList}>
                                {clans.items.map((item, index) => (
                                    <View key={index} style={clanStyles.clanItem}>
                                        <Text style={clanStyles.clanName}>{item.name}</Text>
                                        <Text style={clanStyles.clanTag}>{item.tag}</Text>
                                        <Text style={clanStyles.clanScore}>Score: {item.clanScore}</Text>
                                        <Text style={clanStyles.clanMembers}>Members: {item.members}/50</Text>
                                    </View>
                                ))}
                            </View>
                        ) : searchInput && (
                            <Text style={clanStyles.defaultTextColor}>No clans found. Try other filters.</Text>
                        )}
                    </View>
                )}

                {activeSection === ClanSection.DETAILS && (
                    <>
                        <View style={clanStyles.sectionContainer}>
                            {searchInput && !currentTagClan && (
                                <Text style={clanStyles.defaultTextColor}>No clans found with other tag. Try again.</Text>
                            )}
                            {!currentTagClan ? (
                                <Text style={clanStyles.defaultTextColor}>Don't forget the # at the beginning.</Text>
                            ) : (
                                <View>
                                    <Text style={clanStyles.currentClanName}>{currentClan.name}</Text>
                                    <Text style={clanStyles.currentClanTag}>{currentClan.tag}</Text>
                                    <Text style={[clanStyles.currentClanText]}>Description: {currentClan.description === '' ? 'None' : currentClan.description}</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingVertical: 5, justifyContent: 'space-around' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                                            <Text style={[clanStyles.clanScore]}>{currentClan.clanScore}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                            <Image
                                                source={
                                                    require('../../assets/images/cw-trophy.webp')
                                                }
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                    marginRight: 5,
                                                }}
                                            />
                                            <Text style={[clanStyles.clanWarScore]}>{currentClan.clanWarTrophies}</Text>
                                        </View>
                                    </View>

                                    <View style={clanStyles.gridContainer}>
                                        {/* Fila 1 */}
                                        <View style={clanStyles.gridRow}>
                                            <View style={clanStyles.gridItemContainer}>
                                                <View style={clanStyles.gridItem}>
                                                    <Image source={require('../../assets/images/trophy.png')} style={clanStyles.gridImage} />
                                                    <View style={clanStyles.gridTextContent}>
                                                        <Text style={clanStyles.gridTitle}>Trophies</Text>
                                                        <Text style={clanStyles.gridValue}>{currentClan.clanScore}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={clanStyles.gridItemContainer}>
                                                <View style={clanStyles.gridItem}>
                                                    <Image source={require('../../assets/images/trophy.png')} style={clanStyles.gridImage} />
                                                    <View style={clanStyles.gridTextContent}>
                                                        <Text style={clanStyles.gridTitle}>Required Trophies</Text>
                                                        <Text style={clanStyles.gridValue}>{currentClan.requiredTrophies}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Fila 2 */}
                                        <View style={clanStyles.gridRow}>
                                            <View style={clanStyles.gridItemContainer}>
                                                <View style={clanStyles.gridItem}>
                                                    <Image source={require('../../assets/images/donatedcards.webp')} style={clanStyles.gridImage} />
                                                    <View style={clanStyles.gridTextContent}>
                                                        <Text style={clanStyles.gridTitle}>Donations Per Week</Text>
                                                        <Text style={clanStyles.gridValue}>{currentClan.donationsPerWeek}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={clanStyles.gridItemContainer}>
                                                <View style={clanStyles.gridItem}>
                                                    <Image source={require('../../assets/images/social.webp')} style={clanStyles.gridImage} />
                                                    <View style={clanStyles.gridTextContent}>
                                                        <Text style={clanStyles.gridTitle}>Members</Text>
                                                        <Text style={clanStyles.gridValue}>{currentClan.members}/50</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Fila 3 */}
                                        <View style={clanStyles.gridRow}>
                                            <View style={clanStyles.gridItemContainer}>
                                                <View style={clanStyles.gridItem}>
                                                    <Image source={require('../../assets/images/people.webp')} style={clanStyles.gridImage} />
                                                    <View style={clanStyles.gridTextContent}>
                                                        <Text style={clanStyles.gridTitle}>Region</Text>
                                                        <Text style={clanStyles.gridValue}>{currentClan.location.name}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={clanStyles.gridItemContainer}>
                                                <View style={clanStyles.gridItem}>
                                                    <Image source={require('../../assets/images/people.webp')} style={clanStyles.gridImage} />
                                                    <View style={clanStyles.gridTextContent}>
                                                        <Text style={clanStyles.gridTitle}>Type</Text>
                                                        <Text style={clanStyles.gridValue}>{currentClan.type}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <Text style={clanStyles.currentClanTag}>Members</Text>
                                    <MembersTable members={currentClanMembers.items} />
                                </View>
                            )}
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}