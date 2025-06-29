import { NavigationProp } from '@react-navigation/native';

export class DrawerViewModel {
  private navigation: NavigationProp<any>;

  constructor(navigation: NavigationProp<any>) {
    this.navigation = navigation;
  }

  navigateTo(screenName: string) {
    this.navigation.navigate(screenName);
  }
}