import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StatusBar, ColorValue, TouchableOpacity } from 'react-native';
import { CardsViewModel } from './CardsViewModel';
import { Card } from '../../models/Card';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import cardsStyles from './cardsStyles'
import { ScrollView } from 'react-native-gesture-handler';

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

    useEffect(() => {
        const loadData = async () => {
            try {
                await viewModel.loadAllCards();
                setCards(viewModel.getCards());
                setSupportCards(viewModel.getSupportCards());
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
                isSelected && {

                }
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
                        <Text style={cardsStyles.cardName}>{isSelected ? "Evo " : " "}{item.name}</Text>
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