import { NavigationProp } from '@react-navigation/native';

export class DrawerViewModel {
  private navigation: NavigationProp<any>;

  constructor(navigation: NavigationProp<any>, private currentRoute: string, private setCurrentRoute: (route: string) => void) {
    this.navigation = navigation;
  }

  navigateTo(screenName: string) {
    this.setCurrentRoute(screenName);
    this.navigation.navigate(screenName);
  }

  isActive = (routeName: string): boolean =>{
    return this.currentRoute == routeName;
  }
}