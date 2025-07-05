import { Location } from "@/src/models/Location";
import { LocationService } from "@/src/services/LocationService";
import { useEffect, useState } from "react";
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import selectCountriesStyles from './selectCountriesStyles'

interface SelectCountriesProps {
    selectedCountry: Location | null;
    onSelect: (country: Location) => void;
}

export const SelectCountries = ({ selectedCountry, onSelect }: SelectCountriesProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [countries, setCountries] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const locationService = new LocationService();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await locationService.getLocations();
                const countryList = response.items.filter(loc => loc.isCountry);
                setCountries(countryList);
            } catch (error) {
                console.error('Error fetching countries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    return (
        <View style={selectCountriesStyles.container}>
            <TouchableOpacity
                style={selectCountriesStyles.selectButton}
                onPress={() => setModalVisible(true)}
            >
                <View style={selectCountriesStyles.selectButtonImage}>
                    {selectedCountry?.name ? (
                        <>
                            {selectedCountry?.flagUrl ? (
                                <Image
                                    source={{ uri: selectedCountry.flagUrl }}
                                    style={selectCountriesStyles.flagImage}
                                    resizeMode="contain"
                                />
                            ) : (
                                <Text style={selectCountriesStyles.selectButtonText}>
                                    {selectedCountry.countryCode}
                                </Text>
                            )}
                        </>
                    ) : (
                        <Text style={selectCountriesStyles.selectIconButtonText}>🌐</Text>
                    )}
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={selectCountriesStyles.modalContainer}>
                    <View style={selectCountriesStyles.modalContent}>
                        {loading ? (
                            <View style={selectCountriesStyles.loadingContainer}>
                                <Text>Loading countries...</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={countries}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={selectCountriesStyles.countryItem}
                                        onPress={() => {
                                            onSelect(item);
                                            setModalVisible(false);
                                        }}
                                    >
                                        {item.flagUrl && (
                                            <Image
                                                source={{ uri: item.flagUrl }}
                                                style={[selectCountriesStyles.flagImage, {marginHorizontal: 10}]}
                                                resizeMode="contain"
                                            />
                                        )}
                                        <Text style={selectCountriesStyles.countryName}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}