import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Color from '../../Common/Color';
import FilterModal from '../../Modal/FilterModal';
import SafeFastImage from '../../utils/SafeFastImage';
import apiClient from '../../utils/ApiClient';
import CourseCard from '../../Components/CourseCard';
import SkeletonCourseCard from '../../reuseable/SkeletonCourseCard';
import AppHeader from '../../Components/AppHeader';

const SustainabilityCoursesScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [filterVisible, setFilterVisible] = useState(false);
  const [courses, setCourses] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [error, setError] = useState(false);

  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');

  const popularCourses = useMemo(
    () => courses.filter(item => item.isPopular),
    [courses],
  );

  const newCourses = useMemo(
    () => courses.filter(item => !item.isPopular),
    [courses],
  );

  const fetchCourses = useCallback(
    async ({pageNumber = 1, reset = false} = {}) => {
      if (loading) return;

      try {
        setLoading(true);
        setError(false);

        const params = {page: pageNumber};

        if (search.length >= 3) params.search = search;

        if (filters?.level) params.level = filters.level;
        if (filters?.durationUnit) params.durationUnit = filters.durationUnit;

        if (filters?.courseType) {
          params.pricingTier =
            filters.courseType === 'Premium'
              ? 'premium'
              : filters.courseType === 'Free'
              ? 'free'
              : undefined;
        }

        if (filters?.minPrice !== null) params.minPrice = filters.minPrice;
        if (filters?.maxPrice !== null) params.maxPrice = filters.maxPrice;

        const res = await apiClient.get('/course', {params});

        const data = res?.data?.data?.data ?? [];

        setCourses(prev => (reset ? data : [...prev, ...data]));

        setHasMore(data.length > 0);
        setPage(pageNumber + 1);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [search, filters, loading],
  );

  useEffect(() => {
    setPage(1);
    fetchCourses({pageNumber: 1, reset: true});
  }, [filters]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.length >= 3 || search.length === 0) {
        setPage(1);
        fetchCourses({pageNumber: 1, reset: true});
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchCourses({pageNumber: page});
    }
  };

  const renderItem = ({item}) => <CourseCard item={item} />;

  const renderSkeleton = () => (
    <FlatList
      horizontal
      data={[1, 2, 3]}
      renderItem={() => <SkeletonCourseCard />}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingLeft: 20}}
    />
  );

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
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingBottom: insets.bottom + 20}}>
        <View style={{marginHorizontal: 15}}>
          <AppHeader navigation={navigation} />
        </View>

        <Text style={styles.title}>Sustainability Courses</Text>

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
              placeholder="Search courses"
              placeholderTextColor="#999"
              style={styles.input}
              returnKeyType="search"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setFilterVisible(true)}>
            <SafeFastImage
              source={require('../../assets/images/filter.png')}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load courses</Text>

            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => fetchCourses({pageNumber: 1, reset: true})}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {(popularCourses.length > 0 || initialLoading) && (
              <>
                <Text style={styles.sectionTitle}>Most Popular</Text>

                {initialLoading ? (
                  renderSkeleton()
                ) : (
                  <FlatList
                    horizontal
                    data={popularCourses}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingLeft: 20}}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.2}
                  />
                )}
              </>
            )}

            {(newCourses.length > 0 || initialLoading) && (
              <>
                <Text style={[styles.sectionTitle, {marginTop: 10}]}>
                  New Courses
                </Text>

                {initialLoading ? (
                  renderSkeleton()
                ) : (
                  <FlatList
                    horizontal
                    data={newCourses}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingLeft: 20}}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.2}
                  />
                )}
              </>
            )}
          </>
        )}
      </ScrollView>

      <FilterModal
        visible={filterVisible}
        onClose={selectedFilters => {
          setFilterVisible(false);

          if (selectedFilters) {
            setCourses([]);
            setPage(1);
            setFilters(selectedFilters);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default SustainabilityCoursesScreen;

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
    color: '#777',
    marginHorizontal: 20,
    marginBottom: 15,
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

  filterBtn: {
    marginLeft: 10,
    backgroundColor: '#F2F2F2',
    padding: 12,
    borderRadius: 10,
  },

  filterIcon: {
    width: 20,
    height: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginBottom: 10,
    color: Color.BLACK,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 40,
  },

  errorText: {
    color: 'red',
    fontSize: 16,
  },

  retryBtn: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },

  retryText: {
    color: Color.WHITE,
    fontWeight: '600',
  },
});
