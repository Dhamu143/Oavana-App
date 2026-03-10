import React, {memo} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Color from '../Common/Color';

const RadioItem = ({label, selected, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.radioRow}
      onPress={onPress}>
      <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
        {selected && <View style={styles.radioInner} />}
      </View>

      <Text style={styles.radioText} allowFontScaling={false}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(RadioItem);

const styles = StyleSheet.create({
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterActive: {
    borderColor: Color.GREEN,
  },

  radioInner: {
    width: 10,
    height: 10,
    backgroundColor: Color.GREEN,
    borderRadius: 5,
  },

  radioText: {
    marginLeft: 10,
    fontSize: 15,
    color: Color.BLACK,
    fontWeight: '500',
  },
});
