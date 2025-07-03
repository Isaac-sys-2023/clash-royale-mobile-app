import { Text, TouchableOpacity } from "react-native";
import filterButtonStyles from './filterButtonStyles'

const FilterButton = ({
    label,
    active,
    onPress,
    small = false
}: {
    label: string;
    active: boolean;
    onPress: () => void;
    small?: boolean;
}) => (
    <TouchableOpacity
        style={[
            filterButtonStyles.filterButton,
            active && filterButtonStyles.activeFilter,
            small && filterButtonStyles.smallButton
        ]}
        onPress={onPress}
    >
        <Text style={active ? filterButtonStyles.activeFilterText : filterButtonStyles.filterText}>
            {label}
        </Text>
    </TouchableOpacity>
);

export default FilterButton;