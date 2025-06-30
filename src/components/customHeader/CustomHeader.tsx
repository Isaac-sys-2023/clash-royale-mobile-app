import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import customHeaderStyles from './customHeaderStyles'
import { StatusBar } from 'react-native';

interface CustomHeaderProps {
  title: string;
  onSettingsPress: () => void;
  onMenuPress: () => void;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({ 
  title, 
  onSettingsPress,
  onMenuPress
}) => {
  return (
    <View style={[customHeaderStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <View style={customHeaderStyles.leftSection}>
        <View style={customHeaderStyles.logoContainer}>
          <Image
            source={{ uri: 'https://cdn.royaleapi.com/static/img/branding/royaleapi-logo-128.png' }}
            style={customHeaderStyles.logo}
          />
          <Text style={customHeaderStyles.logoText}>Royale API Mobile</Text>
        </View>
      </View>

      <View style={customHeaderStyles.centerSection}>
        <Text style={customHeaderStyles.sectionTitle}>{title}</Text>
      </View>

      <View style={customHeaderStyles.rightSection}>
        <TouchableOpacity 
          onPress={onSettingsPress}
          style={customHeaderStyles.iconButton}
        >
          <Text style={customHeaderStyles.icon}>⚙️</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={onMenuPress}
          style={customHeaderStyles.iconButton}
        >
          <Text style={customHeaderStyles.icon}>☰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};