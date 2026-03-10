import React, {useState, memo, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Color from '../Common/Color';
import RadioItem from '../Components/RadioItem';
import TypeButton from '../Components/TypeButton';
import RangeSlider from 'rn-range-slider';
import SafeFastImage from '../utils/SafeFastImage';

const FilterModal = ({visible, onClose}) => {
  const insets = useSafeAreaInsets();

  const [courseType, setCourseType] = useState(null);
  const [durationType, setDurationType] = useState(null);
  const [levelType, setLevelType] = useState(null);

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const selectCourseType = useCallback(type => {
    setCourseType(type);
  }, []);

  const selectDuration = useCallback(type => {
    setDurationType(type);
  }, []);

  const selectLevel = useCallback(type => {
    setLevelType(type);
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={
            Platform.OS === 'android' ? Color.WHITE : 'transparent'
          }
        />

        <View style={styles.header}>
          <SafeFastImage
            source={require('../assets/images/Logo1.png')}
            style={styles.logo}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.closeBtn}
            onPress={onClose}>
            <SafeFastImage
              source={require('../assets/images/close.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: insets.bottom + 120,
          }}>
          <View style={styles.content}>
            <Text style={styles.title}>Filter your search</Text>

            <Text style={[styles.label, {marginBottom: 20}]}>Course Type</Text>

            <View style={styles.row}>
              <TypeButton
                label="All"
                selected={courseType === null}
                onPress={() => selectCourseType(null)}
              />

              <TypeButton
                label="Premium"
                selected={courseType === 'Premium'}
                onPress={() => selectCourseType('Premium')}
              />

              <TypeButton
                label="Free"
                selected={courseType === 'Free'}
                onPress={() => selectCourseType('Free')}
              />
            </View>

            {/* <Text style={styles.label}>Price Range</Text>

            <View style={styles.sliderWrapper}>
              <View style={styles.labelRow}>
                <View style={styles.valueLabel}>
                  <Text style={styles.valueText}>${minPrice ?? 5}</Text>
                </View>

                <View style={styles.valueLabel}>
                  <Text style={styles.valueText}>${maxPrice ?? 125}</Text>
                </View>
              </View>

              <View
                style={{width: '100%', height: 5, justifyContent: 'center'}}>
                <RangeSlider
                  style={{flex: 1}}
                  min={5}
                  max={125}
                  step={5}
                  low={minPrice}
                  high={maxPrice}
                  floatingLabel
                  renderThumb={() => <View style={styles.thumb} />}
                  renderRail={() => <View style={styles.rail} />}
                  renderRailSelected={() => (
                    <View style={styles.railSelected} />
                  )}
                  renderLabel={value => (
                    <View style={styles.labelContainer}>
                      <Text style={styles.labelText}>${value}</Text>
                    </View>
                  )}
                  renderNotch={() => <View style={styles.notch} />}
                  onValueChanged={(low, high) => {
                    setMinPrice(low);
                    setMaxPrice(high);
                  }}
                />
              </View>
            </View> */}

            <Text style={styles.label}>Duration</Text>

            <RadioItem
              label="Hours"
              selected={durationType === 'Hours'}
              onPress={() => selectDuration('Hours')}
            />

            <RadioItem
              label="Days"
              selected={durationType === 'Days'}
              onPress={() => selectDuration('Days')}
            />

            <RadioItem
              label="Weeks"
              selected={durationType === 'Weeks'}
              onPress={() => selectDuration('Weeks')}
            />

            <RadioItem
              label="Months"
              selected={durationType === 'Months'}
              onPress={() => selectDuration('Months')}
            />

            <Text style={styles.label}>Level</Text>

            <RadioItem
              label="Beginner"
              selected={levelType === 'Beginner'}
              onPress={() => selectLevel('Beginner')}
            />

            <RadioItem
              label="Intermediate"
              selected={levelType === 'Intermediate'}
              onPress={() => selectLevel('Intermediate')}
            />

            <RadioItem
              label="Advance"
              selected={levelType === 'Advance'}
              onPress={() => selectLevel('Advance')}
            />
          </View>
        </ScrollView>

        <View
          style={[styles.bottomContainer, {paddingBottom: insets.bottom + 10}]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.applyBtn}
            onPress={() =>
              onClose({
                courseType,
                durationUnit: durationType,
                level: levelType,
                minPrice,
                maxPrice,
              })
            }>
            <Text style={styles.applyText}>Apply filters and search</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.clearBtn}
            onPress={() => {
              setCourseType(null);
              setDurationType(null);
              setLevelType(null);
              setMinPrice(null);
              setMaxPrice(null);

              onClose({
                courseType: null,
                durationUnit: null,
                level: null,
                minPrice: null,
                maxPrice: null,
              });
            }}>
            <Text style={styles.clearText}>Clear filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default memo(FilterModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },

  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 70,
    height: 40,
  },

  closeBtn: {
    position: 'absolute',
    right: 20,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  closeIcon: {
    width: 22,
    height: 22,
  },

  content: {
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',

    color: Color.BLACK,
  },

  sliderContainer: {
    marginTop: 12,
    marginBottom: 10,
  },

  track: {
    borderRadius: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: Color.BLACK,
  },

  row: {
    flexDirection: 'row',
  },

  priceText: {
    fontSize: 14,
    fontWeight: '500',
    color: Color.BLACK,
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: Color.WHITE,
  },

  applyBtn: {
    backgroundColor: Color.GREEN,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  applyText: {
    color: Color.WHITE,
    fontWeight: '600',
    fontSize: 15,
  },

  clearBtn: {
    backgroundColor: '#D1D5DB',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  clearText: {
    fontWeight: '600',
    color: Color.BLACK,
    fontSize: 15,
  },

  sliderWrapper: {
    marginVertical: 10,
    width: '100%',
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  valueLabel: {
    backgroundColor: Color.GREEN,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  valueText: {
    color: Color.WHITE,
    fontSize: 12,
    fontWeight: '600',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Color.WHITE,
    borderWidth: 6,
    borderColor: Color.GREEN,
    elevation: 4,
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
  },

  railSelected: {
    height: 4,
    backgroundColor: Color.GREEN,
    borderRadius: 2,
  },

  labelContainer: {
    backgroundColor: Color.GREEN,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  labelText: {
    color: Color.WHITE,
    fontSize: 12,
    fontWeight: '600',
  },

  notch: {
    width: 8,
    height: 8,
    backgroundColor: Color.GREEN,
    transform: [{rotate: '45deg'}],
    marginTop: -4,
  },
});
