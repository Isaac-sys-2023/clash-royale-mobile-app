import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Member } from '@/src/models/Clan';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootDrawerParamList } from '@/src/navigation/navigation';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import membersTableStyles from './membersTableStyles'

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
            <View style={membersTableStyles.container}>
                {/* Encabezados de la tabla */}
                <View style={membersTableStyles.headerRow}>
                    <Text style={[membersTableStyles.headerCell, membersTableStyles.rankColumn]}>#</Text>
                    <Text style={[membersTableStyles.headerCell, membersTableStyles.nameColumn]}>Name</Text>
                    <Text style={[membersTableStyles.headerCell, membersTableStyles.roleColumn]}>Role</Text>
                    <Text style={[membersTableStyles.headerCell, membersTableStyles.trophiesColumn]}>Trophies</Text>
                    <Text style={[membersTableStyles.headerCell, membersTableStyles.levelColumn]}>Level</Text>
                    <Text style={[membersTableStyles.headerCell, membersTableStyles.donatedColumn]}>Donated</Text>
                    <Text style={[membersTableStyles.headerCell, membersTableStyles.receivedColumn]}>Received</Text>
                </View>

                {/* Filas de datos */}
                {members.map((member, index) => (
                    <View key={member.tag} style={membersTableStyles.dataRow}>
                        <Text style={[membersTableStyles.dataCell, membersTableStyles.rankColumn]}>{index + 1}</Text>
                        <View style={[membersTableStyles.dataCell, membersTableStyles.nameColumn]}>
                            <TouchableOpacity 
                                onPress={() => handlePlayerPress(member.tag)}
                                activeOpacity={0.7}
                            >
                                <Text style={membersTableStyles.memberName}>{member.name}</Text>
                                <Text style={membersTableStyles.memberTag}>{member.tag}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[membersTableStyles.dataCell, membersTableStyles.roleColumn]}>{member.role}</Text>
                        <Text style={[membersTableStyles.dataCell, membersTableStyles.trophiesColumn]}>
                            {member.trophies.toLocaleString()}
                        </Text>
                        <Text style={[membersTableStyles.dataCell, membersTableStyles.levelColumn]}>{member.expLevel}</Text>
                        <Text style={[membersTableStyles.dataCell, membersTableStyles.donatedColumn]}>{member.donations}</Text>
                        <Text style={[membersTableStyles.dataCell, membersTableStyles.receivedColumn]}>{member.donationsReceived}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default MembersTable;