import React, {memo} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Color from '../Common/Color';

const TypeButton = ({label, selected, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.typeBtn, selected && styles.typeBtnActive]}>
      <Text
        allowFontScaling={false}
        style={[styles.typeText, selected && styles.typeTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(TypeButton);

const styles = StyleSheet.create({
  typeBtn: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 10,
  },

  typeBtnActive: {
    backgroundColor: Color.GREEN,
  },

  typeText: {
    color: '#444',
    fontSize: 14,
  },

  typeTextActive: {
    color: '#fff',
  },
});
