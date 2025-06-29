import { FlatList, Text, View, Image, StyleSheet} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
    let lista: string[] = []
    for (let index = 0; index < 100; index++) {
        const element = (index + 1) + "";
        lista.push(element);
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://cdn.royaleapi.com/static/img/branding/royaleapi-logo-128.png?t=feb800c3c' }}
                    style={styles.logo}
                />
                <Text style={styles.text}>RoyaleAPI Mobile</Text>
            </View>
            
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        height: 32,
        width: 32,
    },
    text: {
        paddingLeft: 10,
        color: 'white'
    },
});