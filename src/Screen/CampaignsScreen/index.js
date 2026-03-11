import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Color from '../../Common/Color';
import SafeFastImage from '../../utils/SafeFastImage';
import apiClient from '../../utils/ApiClient';
import SkeletonCourseCard from '../../reuseable/SkeletonCourseCard';
import CampaignCard from '../../Components/CampaignCard';
import AppHeader from '../../Components/AppHeader';

const CampaignsScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const popularCampaigns = campaigns.filter(item => item.isPopular);
  const newCampaigns = campaigns.filter(item => !item.isPopular);

  useEffect(() => {
    getCampaignData(1, true);
  }, []);

  const getCampaignData = async (pageNum = 1, reset = false) => {
    try {
      setLoading(true);

      const response = await apiClient.get('/campaign', {
        params: {page: pageNum},
      });

      const campaignData = response?.data?.data?.data ?? [];

      if (reset) {
        setCampaigns(campaignData);
      } else {
        setCampaigns(prev => [...prev, ...campaignData]);
      }

      setHasMore(campaignData.length > 0);
      setPage(pageNum + 1);
    } catch (error) {
      //   console.log('Campaign API error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      getCampaignData(page);
    }
  };

  const renderItem = ({item}) => <CampaignCard item={item} />;

  const renderSkeleton = () => {
    return (
      <FlatList
        horizontal
        data={[1, 2, 3]}
        renderItem={() => <SkeletonCourseCard />}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: 20}}
      />
    );
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          Platform.OS === 'android' ? Color.WHITE : 'transparent'
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
        }}>
        <View style={{marginHorizontal: 15}}>
          <AppHeader navigation={navigation} />
        </View>

        <Text style={styles.title}>Campaigns</Text>

        <Text style={styles.subtitle}>
          Some information here as a subheading.
        </Text>

        {(loading || popularCampaigns.length > 0) && (
          <>
            <Text style={styles.sectionTitle}>Most Popular</Text>

            {loading ? (
              renderSkeleton()
            ) : (
              <FlatList
                horizontal
                data={popularCampaigns}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft: 20}}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.3}
              />
            )}
          </>
        )}

        {(loading || newCampaigns.length > 0) && (
          <>
            <Text style={[styles.sectionTitle, {marginTop: 10}]}>
              New Campaigns
            </Text>

            {loading ? (
              renderSkeleton()
            ) : (
              <FlatList
                horizontal
                data={newCampaigns}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingLeft: 20,
                  paddingBottom: 20,
                }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.3}
              />
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CampaignsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 10,
    color: Color.BLACK,
  },

  subtitle: {
    fontSize: 14,
    color: '#4f4f4f',
    marginHorizontal: 20,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginBottom: 10,
    color: Color.BLACK,
  },
});
