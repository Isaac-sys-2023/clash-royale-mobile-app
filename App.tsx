import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import HomeScreen from "./src/screens/home/HomeScreen";
import ClansScreen from "./src/screens/clans/ClansScreen";
import DecksScreen from "./src/screens/decks/DecksScreen";
import SettingsScreen from "./src/screens/settings/SettingsScreen";

import { CustomHeader } from "./src/components/customHeader/CustomHeader";
import DrawerContent from "./src/navigation/DrawerContent";

import { RootDrawerParamList } from "./src/navigation/navigation";

import { StatusBar } from "react-native";

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
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={({ route, navigation }) => ({
            headerShown: true,
            header: () => (
              <CustomHeader
                title={getHeaderTitle(route.name)}
                onSettingsPress={() => navigation.navigate('Settings')}
                onMenuPress={() => navigation.openDrawer()}
              />
            ),
            drawerType: 'slide',
            drawerStyle: {
              backgroundColor: '#000000',
              width: 240,
            },
          })}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Clans" component={ClansScreen} />
          <Drawer.Screen name="Decks" component={DecksScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function getHeaderTitle(routeName: string): string {
  const titles: Record<string, string> = {
    Home: 'Inicio',
    Clans: 'Clanes',
    Decks: 'Mazos',
    Settings: 'Ajustes',
  };
  return titles[routeName] || routeName;
}