import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image';
import Color from '../../Common/Color';
import DrawerItem from '../../Components/MenuItem';
import {useNavigation} from '@react-navigation/native';

const DrawerContent = props => {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      <View>
        <View style={styles.headerRow}>
          <FastImage
            source={require('../../assets/images/Logo_icon.png')}
            style={styles.logo}
            resizeMode={FastImage.resizeMode.contain}
          />

          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <FastImage
              source={require('../../assets/images/close.png')}
              style={styles.closeIcon}
              tintColor={Color.WHITE}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.menuSection}>
          <DrawerItem
            title="Home"
            icon={require('../../assets/images/home.png')}
            onPress={() => {}}
          />

          <DrawerItem
            title="My Profile"
            icon={require('../../assets/images/user.png')}
            onPress={() => {
              navigation.navigate('UserProfileScreen');
            }}
          />

          <DrawerItem
            title="FAQ's"
            icon={require('../../assets/images/help.png')}
            onPress={() => {}}
          />

          <DrawerItem
            title="Invite"
            icon={require('../../assets/images/invite.png')}
            onPress={() => {
              navigation.navigate('InviteScreen');
            }}
          />

          <DrawerItem
            title="Courses"
            icon={require('../../assets/images/book.png')}
            onPress={() => {
              navigation.navigate('SustainabilityCoursesScreen');
            }}
          />

          <DrawerItem
            title="Campaigns"
            icon={require('../../assets/images/targeting.png')}
            onPress={() => {
              navigation.navigate('CampaignsScreen');
            }}
          />

          <DrawerItem
            title="E-Commerce"
            icon={require('../../assets/images/shopping.png')}
            onPress={() => {}}
          />

          <DrawerItem
            title="Contact"
            icon={require('../../assets/images/email.png')}
            onPress={() => {
              navigation.navigate('ContactScreen');
            }}
          />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.divider} />

        <TouchableOpacity>
          <Text style={styles.bottomText}>Terms & Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.bottomText}>Privacy Policy</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.connectText}>Let's Connect</Text>

        <View style={styles.socialRow}>
          <FastImage
            source={require('../../assets/images/facebook.png')}
            style={styles.socialIcon}
          />
          <FastImage
            source={require('../../assets/images/instagram.png')}
            style={styles.socialIcon}
          />
          <FastImage
            source={require('../../assets/images/linkedin.png')}
            style={styles.socialIcon}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: Color.GREEN,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },

  logo: {
    width: 70,
    height: 50,
  },

  closeIcon: {
    width: 18,
    height: 18,
    tintColor: Color.WHITE,
  },

  menuSection: {
    marginTop: 10,
  },

  bottomSection: {
    marginBottom: 20,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 15,
  },

  bottomText: {
    color: Color.WHITE,
    fontSize: 16,
    marginBottom: 10,
  },

  connectText: {
    color: Color.WHITE,
    fontSize: 16,
    marginBottom: 12,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
});
