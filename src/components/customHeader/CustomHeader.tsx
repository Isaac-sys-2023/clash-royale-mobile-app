import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import customHeaderStyles from './customHeaderStyles'
import { StatusBar } from 'react-native';

interface CustomHeaderProps {
  title: string;
  onLogoPress: () => void;
  onMenuPress: () => void;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({ 
  title, 
  onLogoPress,
  onMenuPress
}) => {
  return (
    <View style={[customHeaderStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <View style={customHeaderStyles.leftSection}>
        <TouchableOpacity style={customHeaderStyles.logoContainer} onPress={onLogoPress}>
          <Image
            source={{ uri: 'https://cdn.royaleapi.com/static/img/branding/royaleapi-logo-128.png' }}
            style={customHeaderStyles.logo}
          />
          <Text style={customHeaderStyles.logoText}>Info Royale</Text>
        </TouchableOpacity>
      </View>

      <View style={customHeaderStyles.centerSection}>
        <Text style={customHeaderStyles.sectionTitle}>{title}</Text>
      </View>

      <View style={customHeaderStyles.rightSection}>
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