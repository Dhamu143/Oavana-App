import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, PanResponder, Dimensions} from 'react-native';
import Color from '../Common/Color';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDER_WIDTH = SCREEN_WIDTH - 80;
const THUMB_SIZE = 24;

const PriceRangeSlider = ({min = 5, max = 125, onChange}) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const [minPos, setMinPos] = useState(0);
  const [maxPos, setMaxPos] = useState(SLIDER_WIDTH);

  const minPan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        let newPos = Math.max(
          0,
          Math.min(minPos + gesture.dx, maxPos - THUMB_SIZE),
        );

        const value = min + Math.round((newPos / SLIDER_WIDTH) * (max - min));

        setMinPos(newPos);
        setMinValue(value);

        onChange && onChange(value, maxValue);
      },
    }),
  ).current;

  const maxPan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        let newPos = Math.min(
          SLIDER_WIDTH,
          Math.max(maxPos + gesture.dx, minPos + THUMB_SIZE),
        );

        const value = min + Math.round((newPos / SLIDER_WIDTH) * (max - min));

        setMaxPos(newPos);
        setMaxValue(value);

        onChange && onChange(minValue, value);
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.price}>${minValue}</Text>
        <Text style={styles.price}>${maxValue}</Text>
      </View>

      <View style={styles.slider}>
        <View style={styles.track} />

        <View
          style={[styles.selectedTrack, {left: minPos, width: maxPos - minPos}]}
        />

        <View style={[styles.thumb, {left: minPos}]} {...minPan.panHandlers} />

        <View
          style={[styles.thumb, {left: maxPos - THUMB_SIZE}]}
          {...maxPan.panHandlers}
        />
      </View>
    </View>
  );
};

export default PriceRangeSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '90%',
  },

  price: {
    fontWeight: '600',
    fontSize: 14,
    color: Color.BLACK,
  },

  slider: {
    width: SLIDER_WIDTH,
    height: 25,
    justifyContent: 'center',
  },

  track: {
    position: 'absolute',
    width: SLIDER_WIDTH,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },

  selectedTrack: {
    position: 'absolute',
    height: 4,
    backgroundColor: Color.GREEN,
  },

  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: Color.WHITE,
    borderWidth: 5,
    borderColor: Color.GREEN,
  },
});
