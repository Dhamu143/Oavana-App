import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Color from '../Common/Color';
import PledgeModal from '../Modal/PledgeModal';
import AlertModal from '../Modal/AlertModal';
import SafeFastImage from '../utils/SafeFastImage';
import FastImage from 'react-native-fast-image';
import apiClient from '../utils/ApiClient';

const {width} = Dimensions.get('window');
const scale = size => (width / 375) * size;

const AirDropCard = ({
  currentPoints = 0,
  totalPoints = 1500,
  pledgeIcon,
  pledgeText,
  isPleadgeActive,
  miningEndTime,
  onPledgeSuccess,
}) => {
  const apiCalledRef = useRef(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const [modalVisible, setModalVisible] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  const [remainingTime, setRemainingTime] = useState('');

  const progressPercentage = currentPoints / totalPoints;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressPercentage,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [currentPoints]);

  // useEffect(() => {
  //   if (!isPleadgeActive || !miningEndTime) return;

  //   const interval = setInterval(() => {
  //     const now = new Date().getTime();
  //     const end = new Date(miningEndTime).getTime();

  //     const diff = end - now;

  //     if (diff <= 0) {
  //       clearInterval(interval);
  //       setRemainingTime('00:00:00');
  //       return;
  //     }

  //     const hours = Math.floor(diff / (1000 * 60 * 60));
  //     const minutes = Math.floor((diff / (1000 * 60)) % 60);
  //     const seconds = Math.floor((diff / 1000) % 60);

  //     const formatted =
  //       `${String(hours).padStart(2, '0')}:` +
  //       `${String(minutes).padStart(2, '0')}:` +
  //       `${String(seconds).padStart(2, '0')}`;

  //     setRemainingTime(formatted);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [isPleadgeActive, miningEndTime]);

  useEffect(() => {
    if (!isPleadgeActive || !miningEndTime) return;

    const interval = setInterval(async () => {
      const now = new Date().getTime();
      const end = new Date(miningEndTime).getTime();
      const diff = end - now;

      if (diff <= 0) {
        clearInterval(interval);
        setRemainingTime('00:00:00');

        if (!apiCalledRef.current) {
          apiCalledRef.current = true;
          onPledgeSuccess();
        }

        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const formatted =
        `${String(hours).padStart(2, '0')}:` +
        `${String(minutes).padStart(2, '0')}:` +
        `${String(seconds).padStart(2, '0')}`;

      setRemainingTime(formatted);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPleadgeActive, miningEndTime]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const handelPlegeClick = async () => {
    try {
      const response = await apiClient.post('/users/acceptpledge');

      if (response?.data?.success) {
        setTimeout(() => {
          //  console.log('Click pladge response', response);
          onPledgeSuccess();
        }, 500);
        setModalMessage(response?.data?.message);
        setModalSuccess(true);
      } else {
        setModalMessage(response?.data?.message);
        setModalSuccess(false);
      }

      setAlertVisible(true);
      setModalVisible(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong';

      setModalMessage(message);
      setModalSuccess(false);
      setAlertVisible(true);
      setModalVisible(false);
    }
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.topSection}>
          <View style={styles.quoteRow}>
            <SafeFastImage
              source={
                pledgeIcon
                  ? {uri: pledgeIcon}
                  : require('../assets/images/Bus.png')
              }
              style={styles.busImage}
              resizeMode={FastImage.resizeMode.cover}
            />

            <View style={{flex: 1}}>
              <Text style={styles.quoteText}>
                {pledgeText ||
                  "I'll unplug charger and electronics when not in use to save energy"}
              </Text>
              <Text style={styles.quoteAuthor}>- OaVana</Text>
            </View>
          </View>
        </View>

        {isPleadgeActive ? (
          <View style={styles.miningContainer}>
            <View style={styles.miningBadge}>
              <View style={styles.greenDot} />
              <Text style={styles.miningText}>Mining active</Text>
            </View>

            <Text style={styles.timerText}>
              Time remaining: <Text style={styles.time}>{remainingTime}</Text>{' '}
              until you can restart
            </Text>

            <SafeFastImage
              source={require('../assets/images/hourglass.png')}
              style={styles.timerImage}
            />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.earthSection}
            onPress={() => setModalVisible(true)}>
            <View style={styles.button}>
              <SafeFastImage
                source={require('../assets/images/tap.png')}
                style={styles.tapIcon}
              />
              <Text style={styles.buttonText}>
                Tap Earth to Pledge. Act for the Planet
              </Text>
            </View>
            <View style={styles.earthWrapper}>
              <SafeFastImage
                source={require('../assets/images/backearth.png')}
                style={styles.earthBg}
                resizeMode={FastImage.resizeMode.contain}
              />

              <SafeFastImage
                source={require('../assets/images/earthRotet.gif')}
                style={styles.rotatingEarth}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </TouchableOpacity>
        )}

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
        pledgeIcon={pledgeIcon}
        onPledgePress={handelPlegeClick}
      />

      <AlertModal
        visible={alertVisible}
        message={modalMessage}
        isSuccess={modalSuccess}
        isError={!modalSuccess}
        onClose={() => setAlertVisible(false)}
        onClick={() => setAlertVisible(false)}
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

  miningContainer: {
    alignItems: 'center',
    paddingVertical: scale(25),
    backgroundColor: '#F9FAFB',
  },

  miningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(20),
  },

  greenDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: 20,
    backgroundColor: '#10B981',
    marginRight: scale(6),
  },

  miningText: {
    color: '#059669',
    fontWeight: '600',
  },

  timerText: {
    marginTop: scale(10),
    fontSize: scale(14),
    color: '#6B7280',
    textAlign: 'center',
  },

  time: {
    color: '#EF4444',
    fontWeight: '700',
  },

  timerImage: {
    width: scale(80),
    height: scale(80),
    marginTop: scale(15),
  },

  earthWrapper: {
    width: width * 0.5,
    height: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rotatingEarth: {
    position: 'absolute',
    width: width * 0.35,
    height: width * 0.35,
  },
});
