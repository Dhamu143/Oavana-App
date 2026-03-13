import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Color from '../../Common/Color';
import ImpactSection from '../../Components/ImpactSection';
import {impactConfig} from '../../utils/StaticJson';
import AirDropCard from '../../Components/AirDropCard';
import {useDispatch, useSelector} from 'react-redux';
import SafeFastImage from '../../utils/SafeFastImage';
import apiClient from '../../utils/ApiClient';
import {addTokenAndRate, IsPledgeActive} from '../../Redux/Action/action';

const scale = size => {
  const {width} = Dimensions.get('window');
  return (width / 375) * size;
};

const MainDashBoard = ({navigation}) => {
  const {skiplogin, userLogin, isPledgeActive, isMiningEnable} = useSelector(
    reducer => reducer.allReducer,
  );
  const insets = useSafeAreaInsets();
  const [pladgeData, setPladgeData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getPladge();
  }, []);

  const getPladge = async () => {
    try {
      const response = await apiClient.get('/users/activepledge');

      //  console.log('pledge response', response);

      if (response?.data?.success) {
        const pledgeData = response?.data?.data;

        setPladgeData(pledgeData);
        dispatch(
          addTokenAndRate(pledgeData?.tokenBalance, pledgeData?.miningRate),
        );
      } else {
      }
    } catch (error) {}
  };

  const impactData = impactConfig.map(item => ({
    ...item,
    value: pladgeData?.[item.key] ?? 0,
  }));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />
      <View style={styles.topContainer}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => navigation.toggleDrawer()}>
            <SafeFastImage
              source={require('../../assets/images/menu.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>

          <View style={styles.pointsBox}>
            <SafeFastImage
              source={require('../../assets/images/creation.png')}
              style={styles.starIcon}
            />
            <View>
              <Text style={styles.pointsText}>
                {Number(pladgeData?.tokenBalance ?? 0).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  },
                )}
              </Text>
              <Text style={styles.pointsLabel}>OaVana Points</Text>
            </View>
          </View>

          <View style={styles.rateBox}>
            <Text style={styles.rateTitle}>Mining Rate</Text>
            <Text style={styles.rateValue}>
              +{' '}
              {Number(pladgeData?.miningRate ?? 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              pts/hr
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.badge}>
            <SafeFastImage
              source={require('../../assets/images/star.png')}
              style={styles.badgeIcon}
            />
            <Text style={styles.badgeText}>OaVana</Text>
          </View>

          <Text style={styles.cardTitle}>
            Tap. Earn.{' '}
            <Text style={{color: Color.GREEN}}>Regenerate Earth.</Text>
          </Text>

          <Text style={styles.cardSubtitle}>
            Every action creates ripples of positive change for our planet's
            future.
          </Text>
        </View>

        <AirDropCard
          currentPoints={pladgeData?.tokenBalance ?? 0}
          totalPoints={1500}
          pledgeIcon={pladgeData?.activePledge?.icon}
          pledgeText={pladgeData?.text}
          isPleadgeActive={pladgeData?.isPleadgeActive}
          miningEndTime={pladgeData?.miningEndTime}
          onPledgeSuccess={getPladge}
        />

        <ImpactSection title="Your Environmental Impact" data={impactData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainDashBoard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },

  topContainer: {
    backgroundColor: Color.WHITE,
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
    paddingBottom: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menuBtn: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(10),
    backgroundColor: '#ECEFF3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuIcon: {
    width: scale(18),
    height: scale(18),
  },

  pointsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.GREEN,
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    borderRadius: scale(12),
  },

  starIcon: {
    width: scale(20),
    height: scale(20),
    marginRight: scale(8),
  },

  pointsText: {
    color: Color.WHITE,
    fontSize: scale(16),
    fontWeight: '700',
  },

  pointsLabel: {
    color: Color.WHITE,
    fontSize: scale(12),
    marginTop: -2,
  },

  rateBox: {
    alignItems: 'flex-start',
  },

  rateTitle: {
    fontSize: scale(12),
    color: '#6B7280',
  },

  rateValue: {
    fontSize: scale(15),
    fontWeight: '600',
    color: Color.BLACK,
  },

  scrollContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(30),
  },

  card: {
    backgroundColor: Color.WHITE,
    borderRadius: scale(16),
    padding: scale(18),
    borderWidth: 1,
    borderColor: Color.boredrColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(16),
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(10),
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: '#01C75614',
  },

  badgeIcon: {
    width: scale(14),
    height: scale(14),
    marginRight: scale(6),
  },

  badgeText: {
    fontSize: scale(12),
    color: Color.GREEN,
    fontWeight: '500',
  },

  cardTitle: {
    fontSize: scale(16),
    fontWeight: '700',
    color: Color.BLACK,
    marginBottom: scale(6),
    textAlign: 'center',
  },

  cardSubtitle: {
    fontSize: scale(13),
    color: '#6B7280',
    lineHeight: scale(18),
    textAlign: 'center',
  },
});
