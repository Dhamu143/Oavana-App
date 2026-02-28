import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Color from '../../Common/Color';
import ProfileTab from '../../Tabs/ProfileTab';
import AccountTab from '../../Tabs/AccountTab';
import SafeFastImage from '../../utils/SafeFastImage';

const Tab = createMaterialTopTabNavigator();

const UserProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
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
            source={require('../../assets/images/userProfile.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIcon}>
            <SafeFastImage
              source={require('../../assets/images/camera.png')}
              style={styles.cameraImage}
              tintColor={Color.WHITE}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>Yash Patel</Text>
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
          component={ProfileTab}
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
          }}
        />

        <Tab.Screen
          name="Account"
          component={AccountTab}
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
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
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
});
