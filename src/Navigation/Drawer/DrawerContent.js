import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Color from '../../Common/Color';
import DrawerItem from '../../Components/MenuItem';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthModal from '../../Modal/AuthModal';
import AlertModal from '../../Modal/AlertModal';
import SafeFastImage from '../../utils/SafeFastImage';

const DrawerContent = props => {
  const { skiplogin, userLogin } = useSelector(reducer => reducer.allReducer);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const checkLoginAndNavigate = screen => {
    if (userLogin) {
      navigation.navigate(screen);
    } else {
      setModalMessage('You need to login first to access this feature.');
      setModalVisible(true);
    }
  };

  const handleLink = url => {
    Linking.openURL(url).catch(err =>
      console.log('Failed to open link:', err),
    );
  };


  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      <View>
        <View style={styles.headerRow}>
          <SafeFastImage
            source={require('../../assets/images/Logo_icon.png')}
            style={styles.logo}
          />

          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <SafeFastImage
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
            onPress={() => props.navigation.closeDrawer()}
          />

          <DrawerItem
            title="My Profile"
            icon={require('../../assets/images/user.png')}
            onPress={() => checkLoginAndNavigate('UserProfileScreen')}
          />

          <DrawerItem
            title="FAQ's"
            icon={require('../../assets/images/help.png')}
            onPress={() => {
              navigation.navigate("FAQScreen")
            }}
          />

          <DrawerItem
            title="Invite"
            icon={require('../../assets/images/invite.png')}
            onPress={() => checkLoginAndNavigate('InviteScreen')}
          />

          <DrawerItem
            title="Courses"
            icon={require('../../assets/images/book.png')}
            onPress={() => checkLoginAndNavigate('SustainabilityCoursesScreen')}
          />

          <DrawerItem
            title="Campaigns"
            icon={require('../../assets/images/targeting.png')}
            onPress={() => checkLoginAndNavigate('CampaignsScreen')}
          />

          <DrawerItem
            title="E-Commerce"
            icon={require('../../assets/images/shopping.png')}
            onPress={() => { }}
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

        <TouchableOpacity onPress={() => {
          handleLink('https://greenearthtoken.com/terms-conditions')
        }}>
          <Text style={styles.bottomText}>Terms & Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          handleLink('https://greenearthtoken.com/privacy-policy')
        }}>
          <Text style={styles.bottomText}>Privacy Policy</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.connectText}>Let's Connect</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity onPress={() => {
            handleLink('https://www.facebook.com/greenearthtoken')
          }}>
            <SafeFastImage
              source={require('../../assets/images/facebook.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLink('https://www.instagram.com/green.earth.token')}>
            <SafeFastImage
              source={require('../../assets/images/instagram.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLink('https://www.linkedin.com/company/green-earth-token')}>
            <SafeFastImage
              source={require('../../assets/images/linkedin.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showModal && (
        <AuthModal visible={showModal} onClose={() => setShowModal(false)} />
      )}
      {modalVisible && (
        <AlertModal
          visible={modalVisible}
          message={modalMessage}
          onClose={() => setModalVisible(false)}
          onClick={() => {
            setModalVisible(false);
            setShowModal(true);
          }}
        />
      )}
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
