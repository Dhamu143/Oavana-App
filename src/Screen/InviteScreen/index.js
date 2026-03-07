import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
  Share
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from '../../Common/Color';
import SafeFastImage from '../../utils/SafeFastImage';
import Contacts from 'react-native-contacts';
import SkeletonLoader from '../../reuseable/SkeletonLoader';
import AlertModal from '../../Modal/AlertModal';
import apiClient from '../../utils/ApiClient';
import { useDispatch, useSelector } from 'react-redux';
import { AddRefCode } from '../../Redux/Action/action';
import Clipboard from '@react-native-clipboard/clipboard';


const InviteScreen = ({ navigation }) => {
  const { refCode, addUserName, addMobileNumber } = useSelector(
    reducer => reducer.allReducer,
  );

  const insets = useSafeAreaInsets();

  const dispatch = useDispatch()

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    getUserInfo();
    requestContactsPermission();

  }, []);

  useEffect(() => {
    if (refCode && refCode !== '') {
      setUsername(refCode);
    }
  }, [refCode]);

  const getUserInfo = async () => {
    try {
      const userData = await apiClient.get('/users/me');


      const refcode = userData?.data?.data?.data?.refCode

      if (userData.status === 200) {
        dispatch(AddRefCode(refcode));

      } else {

      }
    } catch (error) {

    }
  };

  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      const permission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;

      const hasPermission = await PermissionsAndroid.check(permission);

      if (hasPermission) {
        fetchContacts();
        return;
      }

      const granted = await PermissionsAndroid.request(permission, {
        title: 'Contacts Permission',
        message: 'This app requires access to your contacts.',
        buttonPositive: 'OK',
      });

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        fetchContacts();
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Required',
          'Please allow contacts permission from settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ],
        );
      }
    } else {
      fetchContacts();
    }
  };

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);

      const contactList = await Contacts.getAll();

      const formattedContacts = contactList
        .map(contact => ({
          id: contact.recordID,
          name: contact.displayName || 'Unknown',
          email:
            contact.emailAddresses.length > 0
              ? contact.emailAddresses[0].email
              : 'No Email',
          image: require('../../assets/images/userProfile.png'),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setContacts(formattedContacts);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching contacts:', error);
      setLoading(false);
    }
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.contactRow}>
      <SafeFastImage source={item.image} style={styles.avatar} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactEmail}>{item.email}</Text>
      </View>
    </View>
  );

  const handleCopyCode = () => {
    const codeToUse = username || refCode;

    if (!codeToUse) {
      setModalMessage('Please generate the referral code first.');
      setModalSuccess(false);
      setModalVisible(true);
      return;
    }

    Clipboard.setString(codeToUse);

    setIsCopied(true);

    // // Optional: revert icon back after 2 seconds
    // setTimeout(() => {
    //   setIsCopied(false);
    // }, 2000);
  };

  const handelClick = async () => {
    if (username.trim() === '') {
      setModalMessage('Enter the referral code');
      setModalSuccess(false);
      setModalVisible(true);
      return;
    }

    if (username.length > 10) {
      setModalMessage('Only 10 characters allowed');
      setModalSuccess(false);
      setModalVisible(true);
      return;
    }

    try {
      setSaving(true);

      const refCodeValue = await apiClient.put('/users', {
        refCode: username,
      });

      if (refCodeValue?.data?.success) {
        dispatch(AddRefCode(username))
        setModalMessage('Referral code successfully updated');
        setModalSuccess(true);
        setModalVisible(true);
      }

      setSaving(false);
    } catch (error) {
      setSaving(false);

      let errorMessage = 'An unexpected error occurred.';

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setModalMessage(errorMessage);
      setModalSuccess(false);
      setModalVisible(true);
    }
  };


const handleShare = async () => {
  const codeToUse = username || refCode;

  if (!codeToUse) {
    setModalMessage('Please generate the referral code first.');
    setModalSuccess(false);
    setModalVisible(true);
    return;
  }

  if (refCode && username && refCode !== username) {
    setModalMessage('Please save the referral code before sharing.');
    setModalSuccess(false);
    setModalVisible(true);
    return;
  }

  try {
    const messageBody = `${
      addUserName || addMobileNumber
    } invited you to join the green movement!

Use referral code "${codeToUse}" to start mining
at a better rate and help make the planet greener.

Download now!
https://greenearthtoken.com/get`;

    await Share.share({
      message: messageBody,
    });

  } catch (error) {
    setModalMessage('Unable to share at the moment.');
    setModalSuccess(false);
    setModalVisible(true);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <View style={{ flex: 1 }}>
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
            value={username}
            maxLength={10}
            onChangeText={text => setUsername(text)}
          />
          <TouchableOpacity style={styles.copyBtn} onPress={handleCopyCode}>
            <SafeFastImage
              source={
                isCopied
                  ? require('../../assets/images/copied.png')
                  : require('../../assets/images/copy1.png')
              }
              style={styles.copyIcon}
              // tintColor={Color.WHITE}
            />
          </TouchableOpacity>
        </View>

        {username.length > 2 && (
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handelClick}
            disabled={saving}
          >
            <Text style={styles.saveText}>
              {saving ? 'Saving...' : 'Save Referral Code'}
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.contactTitle}>Contacts</Text>

        <FlatList
          data={loading ? Array.from({ length: 6 }) : contacts}
          keyExtractor={(item, index) => (loading ? index.toString() : item.id)}
          renderItem={({ item }) =>
            loading ? <SkeletonLoader /> : renderItem({ item })
          }
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <View style={styles.bottomFixed}>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleShare}>
            <Text style={styles.primaryText}>Copy Code to Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={handleShare}>
            <Text style={styles.secondaryText}>Use other channels</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AlertModal
        visible={modalVisible}
        message={modalMessage}
        isSuccess={modalSuccess}
        isError={!modalSuccess}
        onClose={() => setModalVisible(false)}
        onClick={() => {
          setModalVisible(false);


        }}
      />
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
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyIcon: {
   width: 42,
    height: 42,
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
  saveBtn: {
    backgroundColor: Color.GREEN,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveText: {
    color: Color.WHITE,
    fontSize: 15,
    fontWeight: '600',
  },
});
