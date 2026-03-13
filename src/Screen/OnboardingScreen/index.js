import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {onboardingData} from '../../reuseable/onboardingData';
import SafeFastImage from '../../utils/SafeFastImage';
import Color from '../../Common/Color';
import {useDispatch} from 'react-redux';
import {OnboardingScreenCheck} from '../../Redux/Action/action';

const {width} = Dimensions.get('window');
const slidesPerSection = 4;

const OnboardingScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);

  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSection = Math.floor(currentIndex / slidesPerSection);
  const slideInSection = currentIndex % slidesPerSection;

  const currentItem = onboardingData[currentIndex];

  const onViewRef = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const goNext = async () => {
    const nextSectionIndex = (currentSection + 1) * slidesPerSection;

    if (nextSectionIndex < onboardingData.length) {
      flatListRef.current.scrollToIndex({
        index: nextSectionIndex,
        animated: true,
      });
    } else {
      //   await AsyncStorage.setItem('OnboardingScreenCheck', 'true');
      dispatch(OnboardingScreenCheck(true));
      navigation.replace('SignInScreen');
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <SafeFastImage source={item?.image} style={styles.image} />

        <Text style={styles.title}>{item?.title}</Text>

        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Color.WHITE}
        translucent={false}
      />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.stepText}>{currentItem.stepText}</Text>

          <View style={styles.stepDots}>
            {[0, 1, 2].map(i => {
              const completed = i < currentSection;
              const active = i === currentSection;

              if (active || completed) {
                return (
                  <View key={i} style={styles.dotWrapper}>
                    <View style={styles.activeDot} />
                  </View>
                );
              }

              return <View key={i} style={styles.inactiveDot} />;
            })}
          </View>
        </View>

        <Text style={styles.headerTitle}>{currentItem.headerTitle}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      <View style={[styles.bottomNav, {paddingBottom: insets.bottom + 10}]}>
        {currentIndex > 0 ? (
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.back}>
              <Text style={styles.back}>
                {slideInSection === 0 && currentSection > 0
                  ? 'Previous Step'
                  : 'Back'}
              </Text>
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{width: 60}} />
        )}

        <View style={styles.pagination}>
          {[0, 1, 2, 3].map(i => (
            <View
              key={i}
              style={[
                styles.pageDot,
                slideInSection === i && styles.pageDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={goNext}>
          {currentSection === 2 ? (
            <View style={styles.startButton}>
              <Text style={styles.startText}>Get Started</Text>
            </View>
          ) : (
            <Text style={styles.next}>Next</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },

  header: {
    width: '88%',
    alignSelf: 'center',
    marginTop: 20,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  stepText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },

  headerTitle: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '600',
    color: Color.BLACK,
  },

  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 120,
  },

  image: {
    width: 280,
    height: 280,
    // marginBottom: 30,
  },

  title: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
    color: Color.BLACK,
  },

  subtitle: {
    fontSize: 15,
    color: '#858282',
    marginTop: 8,
    textAlign: 'center',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  back: {
    fontSize: 15,
    color: '#686767',
  },

  next: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.GREEN,
  },

  pagination: {
    flexDirection: 'row',
  },

  pageDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#D4D4D4',
    marginHorizontal: 3,
  },

  pageDotActive: {
    backgroundColor: Color.GREEN,
  },

  startButton: {
    backgroundColor: Color.GREEN,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 8,
  },

  startText: {
    color: Color.WHITE,
    fontWeight: '600',
  },

  stepDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dotWrapper: {
    width: 34,
    height: 34,
    borderRadius: 18,
    backgroundColor: '#E5F0E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },

  activeDot: {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: Color.GREEN,
  },

  inactiveDot: {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: '#a1a1a1',
    marginLeft: 20,
  },
});
