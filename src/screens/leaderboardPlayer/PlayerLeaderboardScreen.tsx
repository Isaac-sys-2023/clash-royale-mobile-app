import { Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DecksScreen() {
    return (
        <SafeAreaView 
            style={{ flex: 1, backgroundColor: '#000' }}
            edges={['bottom', 'left', 'right']}
        >
            <Text style={{color:'white'}}>Decks Screen</Text>
        </SafeAreaView>

    )
}