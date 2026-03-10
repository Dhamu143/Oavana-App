import React, {memo, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import SafeFastImage from '../utils/SafeFastImage';
import Color from '../Common/Color';

const CourseCard = ({item}) => {
  const openCourse = useCallback(() => {
    if (item?.link) {
      Linking.openURL(item.link);
    }
  }, [item]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={openCourse}>
      <SafeFastImage
        source={
          item?.imageUrl
            ? {uri: item.imageUrl}
            : require('../assets/images/Rectangle.png')
        }
        style={styles.cardImage}
      />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item?.title}
        </Text>

        <Text style={styles.cardUniversity}>{item?.institution}</Text>

        <View style={styles.row}>
          <SafeFastImage
            source={require('../assets/images/level.png')}
            style={styles.icon}
            tintColor="#777"
          />

          <Text style={styles.rowText}>{item?.level}</Text>

          <SafeFastImage
            source={require('../assets/images/Time.png')}
            style={[styles.icon, {marginLeft: 10}]}
            tintColor="#777"
          />

          <Text style={styles.rowText}>
            {item?.duration} {item?.durationUnit}
          </Text>
        </View>

        <Text style={styles.sector}>Sector Focus: {item?.sector}</Text>

        <View style={styles.row}>
          <SafeFastImage
            source={require('../assets/images/onlineCertificate.png')}
            style={styles.icon}
            tintColor="#777"
          />

          <Text style={styles.rowText}>Certificate :</Text>

          {item?.certificate && (
            <SafeFastImage
              source={require('../assets/images/check.png')}
              style={[styles.icon, {marginLeft: 5}]}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CourseCard);

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
    color: '#777',
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
    color: '#777',
  },

  sector: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});
