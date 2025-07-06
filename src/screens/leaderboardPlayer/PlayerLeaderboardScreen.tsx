import { StatusBar } from "expo-status-bar";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import playerLeaderboardStyles from './playerLeaderboardStyles'
import LeaderboardPlayers from "@/src/components/leaderboard/players/LeaderboardPlayers";

export default function PlayerLeaderboardScreen() {
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#000' }}
            edges={['bottom', 'left', 'right']}
        >
            <StatusBar style="light" />

            <ScrollView
                style={playerLeaderboardStyles.container}
                contentContainerStyle={playerLeaderboardStyles.contentContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <LeaderboardPlayers title="Top 50 Players in your country" limit={50}/>
            </ScrollView>
        </SafeAreaView>

    )
}