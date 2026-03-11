import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SafeFastImage from '../utils/SafeFastImage';
import Color from '../Common/Color';

const OptionBottomModal = ({
  visible,
  onClose,
  title,
  data,
  selected,
  onSelect,
}) => {
  const renderItem = ({item}) => {
    const isSelected = selected === item.value;

    return (
      <TouchableOpacity
        style={[styles.optionItem, isSelected && styles.selectedOption]}
        onPress={() => onSelect(item.value)}>
        <Text style={[styles.optionText, isSelected && {color: Color.WHITE}]}>
          {item.label}
        </Text>

        <View style={styles.rightSection}>
          {item.color && (
            <View style={[styles.colorDot, {backgroundColor: item.color}]} />
          )}

          {/* {isSelected && (
            <SafeFastImage
              source={require('../assets/images/check.png')}
              style={styles.checkIcon}
              tintColor={Color.WHITE}
            />
          )} */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity onPress={onClose}>
              <SafeFastImage
                source={require('../assets/images/close.png')}
                style={styles.closeIcon}
                tintColor={Color.BLACK}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default OptionBottomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Color.BLACK,
  },

  closeIcon: {
    width: 18,
    height: 18,
  },

  optionItem: {
    backgroundColor: '#E5E5E5',
    padding: 18,
    borderRadius: 30,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectedOption: {
    backgroundColor: Color.GREEN,
  },

  optionText: {
    fontSize: 16,
    color: Color.BLACK,
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  colorDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 10,
  },

  checkIcon: {
    width: 16,
    height: 16,
  },
});
