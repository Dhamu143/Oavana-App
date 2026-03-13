import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
  TextInput,
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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');

  const popularCampaigns = useMemo(
    () => campaigns.filter(item => item.isPopular),
    [campaigns],
  );

  const newCampaigns = useMemo(
    () => campaigns.filter(item => !item.isPopular),
    [campaigns],
  );

  useEffect(() => {
    fetchCampaigns({pageNumber: 1, reset: true});
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.length >= 3 || search.length === 0) {
        setPage(1);

        fetchCampaigns({
          pageNumber: 1,
          searchText: search,
          reset: true,
        });
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  const fetchCampaigns = async ({
    pageNumber = 1,
    searchText = '',
    reset = false,
  }) => {
    if (loading) return;

    try {
      setLoading(true);

      const params = {
        page: pageNumber,
        ...(searchText.length >= 3 ? {search: searchText} : {}),
      };

      const response = await apiClient.get('/campaign', {params});

      const data = response?.data?.data?.data ?? [];

      console.log('campaignData', data);

      setCampaigns(prev => (reset ? data : [...prev, ...data]));

      setHasMore(data.length > 0);
      setPage(pageNumber + 1);
    } catch (error) {
      console.log('Campaign Error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchCampaigns({
        pageNumber: page,
        searchText: search,
      });
    }
  };

  const onRefresh = () => {
    setRefreshing(true);

    fetchCampaigns({
      pageNumber: 1,
      searchText: search,
      reset: true,
    }).finally(() => setRefreshing(false));
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

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <SafeFastImage
              source={require('../../assets/images/search.png')}
              style={styles.searchIcon}
              tintColor="#777"
            />

            <TextInput
              placeholder="Search campaigns"
              placeholderTextColor="#999"
              style={styles.input}
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
            />
          </View>
        </View>

        {(popularCampaigns.length > 0 ||
          (loading && campaigns.length === 0)) && (
          <>
            <Text style={styles.sectionTitle}>Most Popular</Text>

            {loading && campaigns.length === 0 ? (
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
        {(newCampaigns.length > 0 || (loading && campaigns.length === 0)) && (
          <>
            <Text style={[styles.sectionTitle, {marginTop: 10}]}>
              New Campaigns
            </Text>

            {loading && campaigns.length === 0 ? (
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
                refreshing={refreshing}
                onRefresh={onRefresh}
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

  searchRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  searchBox: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Color.boredrColor,
    alignItems: 'center',
  },

  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
  },
});
