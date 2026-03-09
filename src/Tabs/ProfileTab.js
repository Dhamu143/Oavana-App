import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Color from '../Common/Color';
import ImpactSection from '../Components/ImpactSection';
import { impactData } from '../utils/StaticJson';
import SafeFastImage from '../utils/SafeFastImage';
import { useSelector } from 'react-redux';

const ProfileTab = () => {
  const { tokenEarn, miningRate } = useSelector(reducer => reducer.allReducer);
  //console.log("check store data",tokenEarn,miningRate)
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 70 }}>
      <View style={styles.tokenCard}>
        <View>
          <Text style={styles.smallText}>Total Tokens Earned</Text>
          <Text style={styles.valueText}>{Number(tokenEarn ?? 0).toLocaleString()}</Text>
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.smallText}>Mining Rate</Text>
          <Text style={styles.valueText}>+ {miningRate} Points/hr</Text>
        </View>
      </View>

      <ImpactSection title="Your Environmental Impact" data={impactData} />

      <View style={styles.pledgeCard}>
        <Text style={styles.pledgeTitle}>Your Pledge History</Text>

        <SafeFastImage
          source={require('../assets/images/shower.png')}
          style={styles.pledgeImage}

        />

        <Text style={styles.pledgeDescription}>
          I’ll take shorter showers to save water.
        </Text>

        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statValue}>134 kgs</Text>
            <Text style={styles.statLabel}>Co2 Reduced</Text>
          </View>

          <View>
            <Text style={styles.statValue}>889 L</Text>
            <Text style={styles.statLabel}>Water Saved</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tokenCard: {
    backgroundColor: Color.WHITE,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Color.boredrColor,
  },
  smallText: {
    fontSize: 14,
    color: '#696767',
  },
  valueText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
    color: Color.BLACK,
  },
  pledgeCard: {
    marginTop: 20,
    backgroundColor: Color.WHITE,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  pledgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.BLACK,
  },

  pledgeImage: {
    width: '100%',
    height: 250,
    marginTop: 20,
  },

  pledgeDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: Color.BLACK,
    marginTop: 10,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Color.BLACK,
  },

  statLabel: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
});
