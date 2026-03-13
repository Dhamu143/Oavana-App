import React, {memo, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import SafeFastImage from '../utils/SafeFastImage';
import Color from '../Common/Color';

const CampaignCard = ({item}) => {
  const openCampaign = useCallback(() => {
    if (item?.link) {
      Linking.openURL(item.link);
    }
  }, [item]);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={openCampaign}>
      <SafeFastImage
        source={require('../assets/images/Rectangle.png')}
        style={styles.cardImage}
      />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item?.title}
        </Text>

        <Text style={styles.cardUniversity} numberOfLines={2}>
          {item?.description}
        </Text>

        <View style={styles.row}>
          <SafeFastImage
            source={require('../assets/images/Time.png')}
            style={styles.icon}
            tintColor="#4f4f4f"
          />

          <Text style={styles.rowText}>
            Apply By: {item?.applyBy?.slice(0, 10)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CampaignCard);

const styles = StyleSheet.create({
  card: {
    width: 240,
    backgroundColor: '#F8F8F8',
    borderRadius: 14,
    marginRight: 15,
    overflow: 'hidden',
  },

  cardImage: {
    width: '100%',
    height: 100,
  },

  cardContent: {
    padding: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.BLACK,
  },

  cardUniversity: {
    fontSize: 13,
    color: '#4f4f4f',
    marginVertical: 4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  icon: {
    width: 14,
    height: 14,
  },

  rowText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#4f4f4f',
  },
});
