import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StatusBar, ColorValue, TouchableOpacity } from 'react-native';
import { CardsViewModel } from './CardsViewModel';
import { Card } from '../../models/Card';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import cardsStyles from './cardsStyles'
import { FilterParamSelector } from '@/src/components/filter/filterSelector/FilterParamSelector';
import FilterButton from '@/src/components/filter/filterButton/FilterButton';

const RARITY_GRADIENTS = {
    legendary: {
        colors: ['#89ffae', '#fcffdd', '#fec8ea', '#e20bcb'] as [ColorValue, ColorValue, ...ColorValue[]],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 }
    },
    champion: {
        colors: ['#FFD700', '#FFA500', '#FFD700', '#FFC000'] as [ColorValue, ColorValue, ...ColorValue[]],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 }
    }
};

const RARITY_COLORS: Record<string, string> = {
    common: '#00d4ff',
    rare: '#ff9900',
    epic: '#9933ff',
    default: '#aaaaaa'
};

const CardsScreen = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [supportCards, setSupportCards] = useState<Card[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewModel] = useState(new CardsViewModel());

    const [showParamSelector, setShowParamSelector] = useState<{
        visible: boolean;
        type: 'elixir' | 'rarity' | null;
    }>({ visible: false, type: null });

    const applyFilter = () => {
        const result = viewModel.getFilteredCards();
        setCards(result.cards);
        setSupportCards(result.supportCards);
    };

    const handleFilterPress = (type: 'all' | 'evo' | 'elixir' | 'rarity' | 'cardType', param?: any) => {
        if (type === 'elixir' || type === 'rarity') {
            setShowParamSelector({ visible: true, type });
        } else if (type === 'cardType') {
            viewModel.setFilter('cardType', param);
            applyFilter();
        } else {
            viewModel.setFilter(type);
            applyFilter();
        }
    };

    const currentFilter = viewModel.getCurrentFilter();

    useEffect(() => {
        const loadData = async () => {
            try {
                await viewModel.loadAllCards();
                viewModel.setFilter('all');
                applyFilter();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const CardItem = ({ item }: { item: Card }) => {
        const [isSelected, setIsSelected] = React.useState(false);

        const gradientConfig = RARITY_GRADIENTS[item.rarity as keyof typeof RARITY_GRADIENTS];
        const hasGradient = !!gradientConfig;
        const solidColor = RARITY_COLORS[item.rarity as keyof typeof RARITY_COLORS] || RARITY_COLORS.default;

        const handlePress = () => {
            setIsSelected(!isSelected);
        };

        return (
            <View style={[
                cardsStyles.cardContainer,
                !hasGradient && { backgroundColor: solidColor },
            ]}>
                {isSelected ? (
                    <Image
                        source={require('../../assets/images/evo_background.png')}
                        style={cardsStyles.backgroundImage}
                        resizeMode="cover"
                    />
                ) : hasGradient ? (
                    <LinearGradient
                        colors={gradientConfig.colors}
                        start={gradientConfig.start}
                        end={gradientConfig.end}
                        style={cardsStyles.gradientBackground}
                    />
                ) : (
                    <View style={[cardsStyles.solidBackground, { backgroundColor: solidColor }]} />
                )}

                <View style={[cardsStyles.cardContent, item.rarity === 'legendary' ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' } : null]}>
                    <Image
                        source={{ uri: isSelected && item.iconUrls.evolutionMedium ? item.iconUrls.evolutionMedium : item.iconUrls.medium }}
                        style={cardsStyles.cardIcon}
                        resizeMode="contain"
                    />
                    <View style={cardsStyles.cardDetails}>
                        <Text style={cardsStyles.cardName}>{isSelected ? "Evo " : ""}{item.name}</Text>
                        <Text style={cardsStyles.cardText}>{item.rarity.toUpperCase()}</Text>
                        {(isSelected && item.evolutionCycle) && (
                            <View style={cardsStyles.cycleContainer}>
                                <Image
                                    source={require('../../assets/images/Cycles.webp')}
                                    style={cardsStyles.cycleImage}
                                    resizeMode="contain"
                                />
                                <Text style={cardsStyles.cardText}>Cicles: {item.evolutionCycle}</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={cardsStyles.elixirContainer}>
                    <Image
                        source={require('../../assets/images/Elixir.webp')}
                        style={cardsStyles.elixirBackground}
                    />
                    <Text style={cardsStyles.elixirText}>{item.elixirCost}</Text>
                </View>

                {item.maxEvolutionLevel && (
                    <TouchableOpacity style={cardsStyles.evoContainer} onPress={handlePress}>
                        <Image
                            source={isSelected ? require('../../assets/images/letter-x.png') : require('../../assets/images/Wild_Shard.webp')}
                            style={cardsStyles.evoBackground}
                        />
                        <Text style={cardsStyles.evoText}>Evo</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const CardSection = ({ title, data }: { title: string, data: Card[] }) => {
        if (data.length === 0) {
            return
        }

        return (
            <>
                <Text style={cardsStyles.sectionHeader}>{title}</Text>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <CardItem item={item} />}
                    keyExtractor={(item) => `${item.id || item.name}-${item.elixirCost}`}
                    contentContainerStyle={cardsStyles.flatListContent}
                    horizontal={false}
                    scrollEnabled={false}
                />
            </>
        );
    };

    if (isLoading) {
        return <Text style={{ color: 'black' }}>Loading cards...</Text>;
    }

    return (
        <SafeAreaView style={[cardsStyles.safeArea, { flex: 1 }]} edges={['bottom', 'left', 'right']}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            <FilterParamSelector
                visible={showParamSelector.visible}
                type={showParamSelector.type!}
                onSelect={(value) => {
                    if (showParamSelector.type === 'elixir') {
                        viewModel.setFilter('elixir', Number(value));
                    } else if (showParamSelector.type === 'rarity') {
                        viewModel.setFilter('rarity', String(value));
                    }
                    applyFilter();
                    setShowParamSelector({ visible: false, type: null });
                }}
                onClose={() => setShowParamSelector({ visible: false, type: null })}
            />

            <View style={cardsStyles.filterBar}>
                <FilterButton label="All" active={currentFilter.type === 'all'} onPress={() => {handleFilterPress('all'); setShowParamSelector({ visible: false, type: null })}}/>
                <FilterButton label="Evo" active={currentFilter.type === 'evo'} onPress={() => {handleFilterPress('evo'); setShowParamSelector({ visible: false, type: null })}}/>
                <FilterButton label="Elixir" active={currentFilter.type === 'elixir'} onPress={() => handleFilterPress('elixir')}/>
                <FilterButton label="Rarity" active={currentFilter.type === 'rarity'} onPress={() => handleFilterPress('rarity')} />

                <View style={cardsStyles.typeFilters}>
                    <FilterButton label="Cards" active={currentFilter.type === 'cardType' && currentFilter.param === 'card'} onPress={() => {handleFilterPress('cardType', 'card'); setShowParamSelector({ visible: false, type: null })}} small/>
                    <FilterButton label="Towers" active={currentFilter.type === 'cardType' && currentFilter.param === 'support'} onPress={() => {handleFilterPress('cardType', 'support'); setShowParamSelector({ visible: false, type: null })}} small/>
                </View>
            </View>

            {(currentFilter.param && currentFilter.type !== 'cardType') && (
                <Text style={cardsStyles.currentParam}>
                    {currentFilter.type === 'elixir' && `Elixir: ${currentFilter.param}`}
                    {currentFilter.type === 'rarity' && `Rarity: ${currentFilter.param}`}
                </Text>
            )}

            <FlatList
                data={[{ key: 'cards' }, { key: 'towerCards' }]}
                renderItem={({ item }) => (
                    item.key === 'cards'
                        ? <CardSection title="Cards" data={cards} />
                        : <CardSection title="Tower Cards" data={supportCards} />
                )}
                keyExtractor={(item) => item.key}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default CardsScreen;