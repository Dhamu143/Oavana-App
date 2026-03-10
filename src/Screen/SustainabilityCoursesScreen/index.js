import React, {memo, useEffect, useState} from 'react';
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

const SustainabilityCoursesScreen = ({navigation}) => {
  const [filterVisible, setFilterVisible] = useState(false);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({});
  const insets = useSafeAreaInsets();

  const popularCourses = courses.filter(item => item.isPopular);
  const newCourses = courses.filter(item => !item.isPopular);

  useEffect(() => {
    getCourseData(1, true);
  }, [filters]);

  const getCourseData = async (pageNum = 1, reset = false) => {
    try {
      setLoading(true);
      setError(false);

      const params = {
        page: pageNum,
      };

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

      console.log('params', params);

      const response = await apiClient.get('/course', {params});

      const courseData = response?.data?.data?.data ?? [];

      if (reset) {
        setCourses(courseData);
      } else {
        setCourses(prev => [...prev, ...courseData]);
      }

      setHasMore(courseData.length > 0);
      setPage(pageNum + 1);
    } catch (error) {
      console.log('Course API error', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      getCourseData(page);
    }
  };
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

  const renderItem = ({item}) => <CourseCard item={item} />;

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
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
        }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuBtn}
            activeOpacity={0.7}
            onPress={() => navigation?.goBack()}>
            <SafeFastImage
              source={require('../../assets/images/back.png')}
              style={styles.menuIcon}
              tintColor="#777"
            />
          </TouchableOpacity>

          <SafeFastImage
            source={require('../../assets/images/Logo1.png')}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title} allowFontScaling={false}>
          Sustainability Courses
        </Text>

        <Text style={styles.subtitle} allowFontScaling={false}>
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
              allowFontScaling={false}
              returnKeyType="search"
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
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
              onPress={() => {
                setError(false);
                getCourseData();
              }}
              style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {(loading || popularCourses.length > 0) && (
              <>
                <Text style={styles.sectionTitle}>Most Popular</Text>

                {loading ? (
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

            {(loading || newCourses.length > 0) && (
              <>
                <Text style={[styles.sectionTitle, {marginTop: 10}]}>
                  New Courses
                </Text>

                {loading ? (
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
            setFilters(selectedFilters);
            setPage(1);
            setCourses([]); // important reset
            getCourseData(1, true);
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

  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  menuBtn: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 10,
  },

  menuIcon: {
    width: 20,
    height: 20,
  },

  logo: {
    width: 70,
    height: 40,
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
