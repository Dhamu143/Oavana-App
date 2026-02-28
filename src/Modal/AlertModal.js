import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Color from '../Common/Color';
import SafeFastImage from '../utils/SafeFastImage';

const AlertModal = ({
  visible,
  message,
  onClose,
  isSuccess,
  buttonText = 'OK',
  isError,
  isLogin,
  onClick,
  messageStyle,
}) => {
  const getImageSource = () => {
    if (isSuccess) {
      return require('../assets/images/success.png');
    } else if (isError) {
      return require('../assets/images/messageError.png');
    } else if (isLogin) {
      return require('../assets/images/login.png');
    } else {
      return require('../assets/images/support.png');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      hardwareAccelerated={true}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}>
            <SafeFastImage
  source={require('../assets/images/cross.png')}
  style={styles.closeIcon}
  tintColor="#4ca564"
/>
            </TouchableOpacity>

           <SafeFastImage
  source={getImageSource()}
  style={styles.infoImage}
/>
            <Text style={[styles.messageText, messageStyle]}>{message}</Text>

            <TouchableOpacity
              style={styles.okButton}
              onPress={onClick || onClose}
              activeOpacity={0.8}>
              <Text style={styles.okText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContainer: {
    backgroundColor: Color.WHITE,
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: Color.BLACK,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  closeIcon: {
    width: 18,
    height: 18,
  },

  infoImage: {
    width: 85,
    height: 85,
    marginBottom: 15,
  },

  messageText: {
    fontSize: 16,
    color: Color.BLACK,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
    fontWeight: '600',
  },

  okButton: {
    backgroundColor: '#4ca564',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },

  okText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});
