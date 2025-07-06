import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Member } from '@/src/models/Clan';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootDrawerParamList } from '@/src/navigation/navigation';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// Tipo para la navegación
type MembersTableNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Player'>;

interface MembersTableProps {
    members: Member[];
}

const MembersTable: React.FC<MembersTableProps> = ({ members }) => {
    const navigation = useNavigation<MembersTableNavigationProp>();

    const handlePlayerPress = (playerTag: string) => {
        navigation.navigate('Player', { 
            tag: playerTag.replace('#', '') 
        });
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                {/* Encabezados de la tabla */}
                <View style={styles.headerRow}>
                    <Text style={[styles.headerCell, styles.rankColumn]}>#</Text>
                    <Text style={[styles.headerCell, styles.nameColumn]}>Name</Text>
                    <Text style={[styles.headerCell, styles.roleColumn]}>Role</Text>
                    <Text style={[styles.headerCell, styles.trophiesColumn]}>Trophies</Text>
                    <Text style={[styles.headerCell, styles.levelColumn]}>Level</Text>
                    <Text style={[styles.headerCell, styles.donatedColumn]}>Donated</Text>
                    <Text style={[styles.headerCell, styles.receivedColumn]}>Received</Text>
                </View>

                {/* Filas de datos */}
                {members.map((member, index) => (
                    <View key={member.tag} style={styles.dataRow}>
                        <Text style={[styles.dataCell, styles.rankColumn]}>{index + 1}</Text>
                        <View style={[styles.dataCell, styles.nameColumn]}>
                            <TouchableOpacity 
                                onPress={() => handlePlayerPress(member.tag)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.memberName}>{member.name}</Text>
                                <Text style={styles.memberTag}>{member.tag}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.dataCell, styles.roleColumn]}>{member.role}</Text>
                        <Text style={[styles.dataCell, styles.trophiesColumn]}>
                            {member.trophies.toLocaleString()}
                        </Text>
                        <Text style={[styles.dataCell, styles.levelColumn]}>{member.expLevel}</Text>
                        <Text style={[styles.dataCell, styles.donatedColumn]}>{member.donations}</Text>
                        <Text style={[styles.dataCell, styles.receivedColumn]}>{member.donationsReceived}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

// Estilos (se mantienen igual)
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        margin: 10,
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingBottom: 8,
        marginBottom: 8,
    },
    dataRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerCell: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 12,
    },
    dataCell: {
        color: '#FFF',
        fontSize: 14,
        justifyContent: 'center',
    },
    memberName: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    memberTag: {
        color: '#AAA',
        fontSize: 12,
    },
    rankColumn: {
        width: 30,
        textAlign: 'center',
    },
    nameColumn: {
        width: 150,
        paddingLeft: 5,
    },
    roleColumn: {
        width: 80,
        textAlign: 'center',
    },
    trophiesColumn: {
        width: 80,
        textAlign: 'center',
    },
    levelColumn: {
        width: 60,
        textAlign: 'center',
    },
    donatedColumn: {
        width: 70,
        textAlign: 'center',
    },
    receivedColumn: {
        width: 70,
        textAlign: 'center',
    },
});

export default MembersTable;