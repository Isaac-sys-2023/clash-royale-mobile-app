import { FlatList, Text, View, StatusBar} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
    let lista: string[] = []
    for (let index = 0; index < 100; index++) {
        const element = (index + 1) + "";
        lista.push(element);
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
            <FlatList
                data={lista}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Text style={{color: 'white'}}>{item}</Text>
                )}
            />
        </SafeAreaView>
    )
}