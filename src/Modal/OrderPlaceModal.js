import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Color from '../Common/Color';
import SafeFastImage from '../utils/SafeFastImage';

const {width} = Dimensions.get('window');

const OrderPlaceModal = ({visible, type, onClose, onConfirm, onReturnHome}) => {
  const insets = useSafeAreaInsets();

  const isSuccess = type === 'success';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.container, {paddingBottom: insets.bottom + 20}]}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <SafeFastImage
            source={
              isSuccess
                ? require('../assets/images/order-success.png')
                : require('../assets/images/order-confirm.png')
            }
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            {isSuccess
              ? 'Your order has been placed successfully.'
              : 'Are you sure you want to place order?'}
          </Text>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={isSuccess ? onReturnHome : onConfirm}>
            <Text style={styles.actionText}>
              {isSuccess ? 'Return to mainpage' : 'Confirm'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OrderPlaceModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },

  container: {
    width: '100%',
    backgroundColor: Color.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },

  closeBtn: {
    alignSelf: 'flex-end',
  },

  closeText: {
    fontSize: 20,
    fontWeight: '600',
    color: Color.BLACK,
  },

  image: {
    width: width * 0.5,
    height: width * 0.5,
    marginVertical: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    color: Color.BLACK,
  },

  actionBtn: {
    width: '100%',
    marginTop: 25,
    backgroundColor: Color.GREEN,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  actionText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
