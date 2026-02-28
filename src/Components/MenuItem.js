import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Color from '../Common/Color';
import SafeFastImage from '../utils/SafeFastImage';

const MenuItem = ({icon, title, onPress, color = Color.WHITE}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    
    <SafeFastImage
      source={icon}
      style={styles.menuIcon}
      tintColor={color}
    />

    <Text style={[styles.menuText, {color}]}>
      {title}
    </Text>

  </TouchableOpacity>
);

export default MenuItem;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
  },

  menuIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },

  menuText: {
    fontSize: 18,
    fontWeight: '400',
  },
});