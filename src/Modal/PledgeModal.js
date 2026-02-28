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
const scale = size => (width / 375) * size;

const PledgeModal = ({visible, onClose}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            {paddingBottom: insets.bottom + scale(20)},
          ]}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

        <SafeFastImage
  source={require('../assets/images/shower.png')}
  style={styles.image}
/>
          <Text style={styles.title}>
            I’ll take shorter showers to save water.
          </Text>

          <Text style={styles.subtitle}>- Green Token Earth</Text>

          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>Pledge & Act for the Planet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PledgeModal;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: Color.WHITE,
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    alignItems: 'center',
  },

  closeBtn: {
    alignSelf: 'flex-end',
  },

  closeText: {
    fontSize: scale(20),
    fontWeight: '600',
    color: Color.BLACK,
  },

  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginVertical: scale(10),
  },

  title: {
    fontSize: scale(16),
    fontWeight: '600',
    textAlign: 'center',
    color: Color.BLACK,
    marginTop: scale(10),
  },

  subtitle: {
    fontSize: scale(13),
    color: '#6B7280',
    marginTop: scale(6),
  },

  actionBtn: {
    width: '100%',
    marginTop: scale(20),
    backgroundColor: Color.GREEN,
    paddingVertical: scale(14),
    borderRadius: scale(12),
    alignItems: 'center',
  },

  actionText: {
    color: Color.WHITE,
    fontSize: scale(15),
    fontWeight: '600',
  },
});
