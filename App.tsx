import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import HomeScreen from "./src/screens/home/HomeScreen";
import ClansScreen from "./src/screens/clans/ClansScreen";
import PlayerLeaderboardScreen from "./src/screens/leaderboardPlayer/PlayerLeaderboardScreen";
import { CustomHeader } from "./src/components/customHeader/CustomHeader";
import DrawerContent from "./src/navigation/DrawerContent";

import { RootDrawerParamList } from "./src/navigation/navigation";

import { StatusBar } from "react-native";
import CardsScreen from "./src/screens/cards/CardsScreen";
import PlayerScreen from "./src/screens/players/PlayersScreen";
import { ConnectionGuard } from "./src/screens/noconnection/ConnectionGuard";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <NavigationContainer>
        <ConnectionGuard>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={({ route, navigation }) => ({
              headerShown: true,
              header: () => (
                <CustomHeader
                  title={getHeaderTitle(route.name)}
                  onLogoPress={() => navigation.navigate('Home')}
                  onMenuPress={() => navigation.openDrawer()}
                />
              ),
              drawerType: 'slide',
              drawerPosition: "right",
              drawerStyle: {
                backgroundColor: '#000000',
                width: 240,
              },
            })}
          >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Clans" component={ClansScreen} />
            <Drawer.Screen name="Leaderboard" component={PlayerLeaderboardScreen} />
            <Drawer.Screen name="Cards" component={CardsScreen} />
            <Drawer.Screen name="Player" component={PlayerScreen} />
          </Drawer.Navigator>
        </ConnectionGuard>
      </NavigationContainer>

    </SafeAreaProvider>
  );
}

function getHeaderTitle(routeName: string): string {
  const titles: Record<string, string> = {
    Home: 'Home',
    Clans: 'Clans',
    Leaderboard: 'Leaderboard',
    Cards: 'Cards',
    Player: 'Player'
  };
  return titles[routeName] || routeName;
}