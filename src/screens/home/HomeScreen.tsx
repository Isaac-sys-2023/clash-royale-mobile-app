import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import homeStyles from './homeStyles'
import { RootDrawerParamList } from "@/src/navigation/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import LeaderboardPlayers from "@/src/components/leaderboard/players/LeaderboardPlayers";

type HomeNavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export default function HomeScreen() {
    const navigation = useNavigation<HomeNavigationProp>();

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#000000' }}
            edges={['bottom', 'left', 'right']}
        >
            <StatusBar style="light" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={homeStyles.container}>
                    <View style={homeStyles.initSectionContainer}>
                        <Image
                            source={require('../../assets/images/fondoRoyale.jpeg')} // Cambia por tu imagen
                            style={homeStyles.backgroundImage}
                        />
                        <View style={homeStyles.initSection}>
                            <Image source={require('../../assets/images/King.png')} style={homeStyles.initSectionImage} />
                            <Text style={homeStyles.initSectionTitle}>WELCOME TO INFO ROYALE!</Text>
                            <Text style={[homeStyles.initSectionText, { textAlign: 'center' }]}>Here you can find relevant Clash Royale information</Text>
                        </View>
                    </View>

                    <View style={homeStyles.section}>
                        <Text style={homeStyles.sectionTitle}>View Information about:</Text>
                        <View style={homeStyles.gridContainer}>
                            <View style={homeStyles.gridRow}>
                                <TouchableOpacity
                                    style={[homeStyles.gridItem, { marginRight: 5 }]}
                                    onPress={() => navigation.navigate('Player', { tag: '' })}
                                >
                                    <Image source={require('../../assets/images/kingBlue.png')} style={homeStyles.gridImage} />
                                    <Text style={homeStyles.gridTitle}>Players</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[homeStyles.gridItem, { marginLeft: 5 }]}
                                    onPress={() => navigation.navigate('Clans', { tag: '' })}
                                >
                                    <Image source={require('../../assets/images/social.webp')} style={homeStyles.gridImage} />
                                    <Text style={homeStyles.gridTitle}>Clans</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={homeStyles.gridRow}>
                                <TouchableOpacity
                                    style={homeStyles.gridItem}
                                    onPress={() => navigation.navigate('Cards')}
                                >
                                    <Image source={require('../../assets/images/donatedcards.webp')} style={homeStyles.gridImage} />
                                    <Text style={homeStyles.gridTitle}>Cards</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={homeStyles.gridItem}
                                    onPress={() => navigation.navigate('Leaderboard')}
                                >
                                    <Image source={require('../../assets/images/league10.png')} style={homeStyles.gridImage} />
                                    <Text style={homeStyles.gridTitle}>Cards</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={homeStyles.section}>
                        <LeaderboardPlayers title="Top 3 Players in your country" limit={3} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}