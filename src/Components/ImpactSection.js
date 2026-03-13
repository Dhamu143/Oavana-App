import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import SafeFastImage from '../utils/SafeFastImage';
import Color from '../Common/Color';

const {width} = Dimensions.get('window');

const scale = size => {
  const {width} = Dimensions.get('window');
  return (width / 375) * size;
};

const ImpactSection = ({title, data}) => {
  return (
    <View style={styles.impactContainer}>
      <Text style={styles.impactTitle}>{title}</Text>

      <View style={styles.grid}>
        {data.map((item, index) => (
          <View
            key={index}
            style={[styles.impactCard, {backgroundColor: item.cardBg}]}>
            <View style={[styles.iconCircle, {backgroundColor: item.iconBg}]}>
              <SafeFastImage source={item.icon} style={styles.impactIcon} />
            </View>

            <View>
              <Text style={styles.impactValue}>
                {Number(item?.value ?? 0).toLocaleString()}
              </Text>
              <Text style={styles.impactLabel}>{item?.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ImpactSection;

const styles = StyleSheet.create({
  impactContainer: {
    marginTop: scale(20),
    backgroundColor: Color.WHITE,
    borderRadius: scale(18),
    padding: scale(16),
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  impactTitle: {
    fontSize: scale(16),
    fontWeight: '700',
    color: Color.BLACK,
    marginBottom: scale(15),
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  impactCard: {
    width: width > 600 ? '31%' : '48%',
    borderRadius: scale(14),
    paddingVertical: scale(14),
    paddingHorizontal: scale(8),
    marginBottom: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(21),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(8),
  },

  impactIcon: {
    width: scale(20),
    height: scale(20),
  },

  impactValue: {
    fontSize: scale(16),
    fontWeight: '700',
    color: Color.BLACK,
  },

  impactLabel: {
    fontSize: scale(11.5),
    color: '#505152',
    marginTop: scale(2),
    fontWeight: '700',
  },
});
