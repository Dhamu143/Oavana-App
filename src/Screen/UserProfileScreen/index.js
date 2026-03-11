import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Color from '../../Common/Color';
import ProfileTab from '../../Tabs/ProfileTab';
import AccountTab from '../../Tabs/AccountTab';
import SafeFastImage from '../../utils/SafeFastImage';
import useImageUpload from '../../utils/useImageUpload';
import AlertModal from '../../Modal/AlertModal';
import apiClient from '../../utils/ApiClient';

const Tab = createMaterialTopTabNavigator();

const UserProfileScreen = ({navigation}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState(null);
  const {selectImage, modalData, closeModal, loading, showModalMessage} =
    useImageUpload();
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await apiClient.get('/users/me');
      const finalData = res?.data?.data?.data;

      //  console.log('finalData', finalData);

      setUser(finalData);
      setProfileImage(finalData?.profilePic);
    } catch (error) {
      //  console.log(error);
    }
  };

  const updateUser = async payload => {
    try {
      const response = await apiClient.put('/users', payload);

      if (response?.data?.success) {
        setUser(prev => ({
          ...prev,
          ...payload,
        }));

        return true;
      }

      return false;
    } catch (error) {
      //  console.log(error);
      return false;
    }
  };
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SafeFastImage
              source={require('../../assets/images/back.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Profile</Text>

          <View style={{width: 24}} />
        </View>

        <View style={styles.profileSection}>
          <View style={styles.imageWrapper}>
            <SafeFastImage
              source={
                profileImage
                  ? {uri: profileImage}
                  : require('../../assets/images/userProfile.png')
              }
              style={styles.profileImage}
            />

            {loading && (
              <View style={styles.imageLoader}>
                <ActivityIndicator size="large" color={Color.GREEN} />
              </View>
            )}

            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={() =>
                selectImage(async url => {
                  if (!url) return;

                  setProfileImage(url);

                  const success = await updateUser({
                    profilePic: url,
                  });

                  if (success) {
                    showModalMessage(
                      'Profile Picture Updated Successfully',
                      true,
                    );
                  } else {
                    showModalMessage('Profile Update Failed', false);
                  }
                })
              }>
              <SafeFastImage
                source={require('../../assets/images/camera.png')}
                style={styles.cameraImage}
                tintColor={Color.WHITE}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{user?.name || 'User'}</Text>
        </View>

        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: Color.GREEN,
              height: 3,
            },
            tabBarStyle: {
              backgroundColor: Color.WHITE,
              elevation: 0,
              shadowOpacity: 0,
            },
            tabBarPressColor: 'transparent',
          }}>
          <Tab.Screen
            name="Profile"
            // component={ProfileTab}
            options={{
              tabBarLabel: ({focused}) => (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: focused ? '700' : '500',
                    color: focused ? Color.BLACK : '#999',
                  }}>
                  Profile
                </Text>
              ),
            }}>
            {() => <ProfileTab user={user} />}
          </Tab.Screen>

          <Tab.Screen
            name="Account"
            options={{
              tabBarLabel: ({focused}) => (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: focused ? '700' : '500',
                    color: focused ? Color.BLACK : '#999',
                  }}>
                  Account
                </Text>
              ),
            }}>
            {() => <AccountTab user={user} updateUser={updateUser} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
      <AlertModal
        visible={modalData?.visible}
        message={modalData?.message}
        isSuccess={modalData?.success}
        isError={!modalData?.success}
        onClose={closeModal}
        onClick={closeModal}
      />
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: Color.WHITE,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Color.BLACK,
  },
  menuIcon: {
    width: 22,
    height: 22,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: Color.WHITE,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 132,
    height: 132,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },
  cameraIcon: {
    position: 'absolute',
    right: 3,
    bottom: 2,
    backgroundColor: Color.GREEN,
    padding: 10,
    borderRadius: 20,
  },
  cameraImage: {
    width: 20,
    height: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    color: Color.BLACK,
  },
  imageLoader: {
    position: 'absolute',
    width: 132,
    height: 132,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
