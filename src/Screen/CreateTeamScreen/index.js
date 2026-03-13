import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import SafeFastImage from '../../utils/SafeFastImage';
import Color from '../../Common/Color';
import AppHeader from '../../Components/AppHeader';

const CreateTeamScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [teamName, setTeamName] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppHeader navigation={navigation} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Create a New Team</Text>
        <Text style={styles.subtitle}>Create a new team</Text>

        <Text style={styles.label}>Team name</Text>

        <TextInput
          placeholder="Team Name"
          value={teamName}
          onChangeText={setTeamName}
          placeholderTextColor={Color.Placeholder}
          style={styles.input}
        />

        <Text style={styles.label}>Invite Code</Text>

        <View style={styles.codeRow}>
          <Text style={styles.code}>D1J8L9</Text>

          <TouchableOpacity>
            <SafeFastImage
              source={require('../../assets/images/copy.png')}
              style={styles.copyIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.footer, {paddingBottom: insets.bottom + 10}]}>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateTeamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },

  header: {
    paddingHorizontal: 16,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Color.BLACK,
  },

  subtitle: {
    fontSize: 15,
    color: Color.Placeholder,
    marginTop: 6,
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    color: Color.BLACK,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#CFCFCF',
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 25,
  },

  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  code: {
    fontSize: 26,
    fontWeight: '700',
    color: Color.BLACK,
  },

  copyIcon: {
    width: 22,
    height: 22,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
  },

  saveBtn: {
    backgroundColor: Color.GREEN,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  saveText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
