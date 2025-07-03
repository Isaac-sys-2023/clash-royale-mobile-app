import { View, TouchableOpacity, Text } from 'react-native';
import filterParamSelectorStyles from './filterParamSelectorStyles'

type FilterParamSelectorProps = {
  visible: boolean;
  type: 'elixir' | 'rarity';
  onSelect: (value: any) => void;
  onClose: () => void;
};

export const FilterParamSelector = ({ 
  visible, 
  type, 
  onSelect, 
  onClose 
}: FilterParamSelectorProps) => {
  if (!visible) return null;

  const options = {
    elixir: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    rarity: ['common', 'rare', 'epic', 'legendary', 'champion']
  };

  return (
    <View style={filterParamSelectorStyles.paramContainer}>
      <View style={filterParamSelectorStyles.paramBox}>
        {options[type].map((option) => (
          <TouchableOpacity
            key={option}
            style={filterParamSelectorStyles.paramButton}
            onPress={() => {
              onSelect(option);
              onClose();
            }}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={filterParamSelectorStyles.closeButton} onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};