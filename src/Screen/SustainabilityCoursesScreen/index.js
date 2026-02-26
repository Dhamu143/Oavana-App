import React, {memo, useState} from 'react';
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
import FastImage from 'react-native-fast-image';
import Color from '../../Common/Color';
import FilterModal from '../../Modal/FilterModal';

const courses = [
  {
    id: '1',
    title: 'Introduction to water and climate',
    university: 'Delft University',
    image: require('../../assets/images/Rectangle.png'),
  },
  {
    id: '2',
    title: 'Introduction to water and climate',
    university: 'Delft University',
    image: require('../../assets/images/Rectangle.png'),
  },
  {
    id: '3',
    title: 'Introduction to water and climate',
    university: 'Delft University',
    image: require('../../assets/images/Rectangle.png'),
  },
];

const CourseCard = memo(({item}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <FastImage
        source={item.image}
        style={styles.cardImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.cardContent}>
        <Text
          style={styles.cardTitle}
          numberOfLines={2}
          allowFontScaling={false}>
          {item.title}
        </Text>

        <Text style={styles.cardUniversity} allowFontScaling={false}>
          {item.university}
        </Text>

        <View style={styles.row}>
          <FastImage
            source={require('../../assets/images/level.png')}
            style={styles.icon}
            tintColor="#777"
          />

          <Text style={styles.rowText} allowFontScaling={false}>
            Beginner
          </Text>

          <FastImage
            source={require('../../assets/images/Time.png')}
            style={[styles.icon, {marginLeft: 10}]}
            tintColor="#777"
          />

          <Text style={styles.rowText} allowFontScaling={false}>
            3 Weeks
          </Text>
        </View>

        <Text style={styles.sector} allowFontScaling={false}>
          Sector Focus: Water Management
        </Text>

        <View style={styles.row}>
          <FastImage
            source={require('../../assets/images/onlineCertificate.png')}
            style={styles.icon}
            tintColor="#777"
          />

          <Text style={styles.rowText} allowFontScaling={false}>
            Certificate :
          </Text>

          <FastImage
            source={require('../../assets/images/check.png')}
            style={[styles.icon, {marginLeft: 5}]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
});

const SustainabilityCoursesScreen = ({navigation}) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const insets = useSafeAreaInsets();

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
            <FastImage
              source={require('../../assets/images/back.png')}
              style={styles.menuIcon}
              tintColor="#777"
            />
          </TouchableOpacity>

          <FastImage
            source={require('../../assets/images/Logo1.png')}
            style={styles.logo}
            resizeMode={FastImage.resizeMode.contain}
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
            <FastImage
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
            <FastImage
              source={require('../../assets/images/filter.png')}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle} allowFontScaling={false}>
          Most Popular
        </Text>

        <FlatList
          horizontal
          data={courses}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 20}}
          removeClippedSubviews={true}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={5}
        />

        <Text
          style={[styles.sectionTitle, {marginTop: 10}]}
          allowFontScaling={false}>
          New Courses
        </Text>

        <FlatList
          horizontal
          data={courses}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            paddingBottom: 20,
          }}
          removeClippedSubviews={true}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      </ScrollView>
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
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

  card: {
    width: 240,
    backgroundColor: '#F8F8F8',
    borderRadius: 14,
    marginRight: 15,
    overflow: 'hidden',
  },

  cardImage: {
    width: '100%',
    height: 130,
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
