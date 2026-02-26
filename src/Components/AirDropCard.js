import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Color from '../Common/Color';
import PledgeModal from '../Modal/PledgeModal';

const {width} = Dimensions.get('window');
const scale = size => (width / 375) * size;

const AirDropCard = ({currentPoints = 250, totalPoints = 1500}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  const progressPercentage = currentPoints / totalPoints;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressPercentage,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [currentPoints]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <>
      <View style={styles.card}>
        <View style={styles.topSection}>
          <View style={styles.quoteRow}>
            <FastImage
              source={require('../assets/images/Bus.png')}
              style={styles.busImage}
              resizeMode={FastImage.resizeMode.contain}
            />

            <View style={{flex: 1}}>
              <Text style={styles.quoteText}>
                "I'll unplug charger and electronics when not in use to save
                energy"
              </Text>
              <Text style={styles.quoteAuthor}>- Green Token Earth</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.earthSection}
          onPress={() => setModalVisible(true)}>
          <View style={styles.button}>
            <FastImage
              source={require('../assets/images/tap.png')}
              style={styles.tapIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.buttonText}>
              Tap Earth to Pledge. Act for the Planet
            </Text>
          </View>

          <FastImage
            source={require('../assets/images/earth.png')}
            style={styles.earthBg}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Air Drop Progress</Text>
              <Text style={styles.rank}>Green Scout</Text>
            </View>

            <View style={styles.pointBadge}>
              <Text style={styles.pointBadgeText}>
                {currentPoints} | {totalPoints}
              </Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <Animated.View
              style={[styles.progressFill, {width: progressWidth}]}
            />
          </View>

          <Text style={styles.bottomText}>
            <Text style={{fontWeight: '700'}}>
              {totalPoints - currentPoints} points
            </Text>{' '}
            until your next reward drop.
          </Text>
        </View>
      </View>

      <PledgeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default AirDropCard;

const styles = StyleSheet.create({
  card: {
    marginTop: scale(20),
    borderRadius: scale(18),
    overflow: 'hidden',
    backgroundColor: Color.WHITE,
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  topSection: {
    backgroundColor: '#F3F4F6',
    padding: scale(16),
  },

  quoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  busImage: {
    width: width * 0.28,
    height: width * 0.22,
    marginRight: scale(12),
  },

  quoteText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: Color.BLACK,
    lineHeight: scale(20),
  },

  quoteAuthor: {
    fontSize: scale(12),
    color: '#6B7280',
    marginTop: scale(6),
  },

  button: {
    marginBottom: scale(15),
    backgroundColor: Color.GREEN,
    borderRadius: scale(10),
    paddingVertical: scale(6),
    paddingHorizontal: scale(18),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  tapIcon: {
    width: scale(16),
    height: scale(16),
    marginRight: scale(8),
  },

  buttonText: {
    color: Color.WHITE,
    fontSize: scale(13),
    fontWeight: '600',
  },

  earthSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(25),
    backgroundColor: Color.WHITE,
  },

  earthBg: {
    width: width * 0.5,
    height: width * 0.4,
  },

  progressSection: {
    backgroundColor: '#F3F4F6',
    padding: scale(16),
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressTitle: {
    fontSize: scale(16),
    fontWeight: '700',
    color: Color.BLACK,
  },

  rank: {
    fontSize: scale(13),
    color: '#6B7280',
    marginTop: scale(4),
  },

  pointBadge: {
    backgroundColor: '#F97316',
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    borderRadius: scale(20),
  },

  pointBadgeText: {
    color: Color.WHITE,
    fontSize: scale(13),
    fontWeight: '600',
  },

  progressBar: {
    height: scale(12),
    backgroundColor: '#E5E7EB',
    borderRadius: scale(10),
    marginTop: scale(14),
    overflow: 'hidden',
  },

  progressFill: {
    height: scale(12),
    backgroundColor: Color.GREEN,
    borderRadius: scale(10),
  },

  bottomText: {
    marginTop: scale(12),
    fontSize: scale(14),
    color: Color.BLACK,
  },
});
