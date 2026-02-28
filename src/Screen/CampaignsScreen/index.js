import React, {memo, useState} from 'react';
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
import FilterModal from '../../Modal/FilterModal';
import SafeFastImage from '../../utils/SafeFastImage';

const courses = [
  {
    id: '1',
    title: 'Introduction to water and climate',
    university:
      'A global movement replacing trees with bamboo for a sustainable future.',
    image: require('../../assets/images/Rectangle.png'),
  },
  {
    id: '2',
    title: 'Introduction to water and climate',
    university:
      'A global movement replacing trees with bamboo for a sustainable future.',
    image: require('../../assets/images/Rectangle.png'),
  },
  {
    id: '3',
    title: 'Introduction to water and climate',
    university:
      'A global movement replacing trees with bamboo for a sustainable future.',
    image: require('../../assets/images/Rectangle.png'),
  },
];

const CourseCard = memo(({item}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
    <SafeFastImage
        source={item.image}
        style={styles.cardImage}
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
         <SafeFastImage
            source={require('../../assets/images/Time.png')}
            style={styles.icon}
            tintColor="#777"
          />


          <Text style={styles.rowText} allowFontScaling={false}>
            3 Weeks
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const CampaignsScreen = ({navigation}) => {
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
          Campaigns
        </Text>

        <Text style={styles.subtitle} allowFontScaling={false}>
          Some information here as a subheading.
        </Text>

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

export default CampaignsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },

  header: {
    height: 80,
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
});
