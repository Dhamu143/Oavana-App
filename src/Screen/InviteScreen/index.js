import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Color from '../../Common/Color';
import SafeFastImage from '../../utils/SafeFastImage';

const contactsData = [
  {
    id: '1',
    name: 'Cameron Williamson',
    email: 'firstname@email.com',
    image: require('../../assets/images/userProfile.png'),
  },
  {
    id: '2',
    name: 'Jacob Jones',
    email: 'firstname@email.com',
    image: require('../../assets/images/userProfile.png'),
  },
  {
    id: '3',
    name: 'Ronald Richards',
    email: 'firstname@email.com',
    image: require('../../assets/images/userProfile.png'),
  },
  {
    id: '4',
    name: 'Eleanor Pena',
    email: 'firstname@email.com',
    image: require('../../assets/images/userProfile.png'),
  },
  {
    id: '5',
    name: 'Annette Black',
    email: 'firstname@email.com',
    image: require('../../assets/images/userProfile.png'),
  },
  {
    id: '6',
    name: 'Cameron Williamson',
    email: 'firstname@email.com',
    image: require('../../assets/images/userProfile.png'),
  },
  {
    id: '7',
    name: 'Jacob Jones',
    email: 'firstname@email.com',
    image: require('../../assets/images/userProfile.png'),
  },
  {
    id: '8',
    name: 'Ronald Richards',
    email: 'firstname@email.com',
    image: require('../../assets/images/userProfile.png'),
  },
  {
    id: '9',
    name: 'Eleanor Pena',
    email: 'firstname@email.com',
    image: require('../../assets/images/userProfile.png'),
  },
  {
    id: '10',
    name: 'Annette Black',
    email: 'firstname@email.com',
    image: require('../../assets/images/userProfile.png'),
  },
];

const InviteScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const renderItem = ({item}) => (
    <View style={styles.contactRow}>
      <SafeFastImage
  source={item.image}
  style={styles.avatar}
/>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactEmail}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => navigation.goBack()}>
           <SafeFastImage
  source={require('../../assets/images/leftArrow.png')}
  style={styles.menuIcon}
/>
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <SafeFastImage
  source={require('../../assets/images/Logo1.png')}
  style={styles.logoIcon}
/>
          </View>
        </View>

        <Text style={styles.title}>Invite</Text>
        <Text style={styles.subtitle}>
          Create a unique code to start referring.
        </Text>

        <Text style={styles.label}>Referral Code</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Code"
            placeholderTextColor="#9E9E9E"
            style={styles.input}
          />
          <TouchableOpacity style={styles.copyBtn}>
           <SafeFastImage
  source={require('../../assets/images/copy.png')}
  style={styles.copyIcon}
  tintColor={Color.WHITE}
/>
          </TouchableOpacity>
        </View>

        <Text style={styles.contactTitle}>Contacts</Text>

        <FlatList
          data={contactsData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: 20}}
        />

        <View style={styles.bottomFixed}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Copy Code to Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>Use other channels</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InviteScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 20,
  },

  header: {
    height: 60,
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoIcon: {
    width: 60,
    height: 40,
  },

  menuBtn: {
    position: 'absolute',
    left: 0,
    width: 44,
    height: 44,
    backgroundColor: '#E9EAEC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Color.BLACK,
  },

  subtitle: {
    fontSize: 16,
    color: '#7A7A7A',
    marginTop: 6,
    marginBottom: 24,
    fontWeight: '400',
  },

  label: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    marginBottom: 6,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
    paddingBottom: 6,
    marginBottom: 30,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: Color.BLACK,
  },

  copyBtn: {
    width: 42,
    height: 42,
    backgroundColor: Color.GREEN,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  copyIcon: {
    width: 18,
    height: 18,
  },

  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.BLACK,
    marginBottom: 16,
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  contactInfo: {
    marginLeft: 12,
  },

  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.BLACK,
  },

  contactEmail: {
    fontSize: 13,
    color: '#9E9E9E',
    marginTop: 3,
  },

  bottomContainer: {
    marginTop: 20,
    marginBottom: 10,
  },

  bottomFixed: {
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: Color.WHITE,
  },
  primaryBtn: {
    backgroundColor: Color.GREEN,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },

  primaryText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryBtn: {
    backgroundColor: '#E3E6EB',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  secondaryText: {
    color: Color.BLACK,
    fontSize: 15,
    fontWeight: '500',
  },
});
