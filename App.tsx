import HomeScreen from "./src/screens/home/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler'

import DrawerContent from "./src/navigation/DrawerContent";
import { RootDrawerParamList } from "./src/navigation/navigation";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <DrawerContent {...props} />}

          screenOptions={{
            headerShown: true,
            drawerType: 'slide',
            drawerHideStatusBarOnOpen: false,
            overlayColor: 'transparent',
            drawerStyle: {
              backgroundColor: '#000000',
              width: 240,
            },
          }}
        >
          <Drawer.Screen name='Home' component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}