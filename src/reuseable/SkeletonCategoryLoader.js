import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const SkeletonCategoryLoader = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      shimmerAnimation.setValue(0);

      Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    };

    startAnimation();
  }, []);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 80],
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{translateX}],
            },
          ]}
        />
      </View>

      <View style={styles.text}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{translateX}],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default SkeletonCategoryLoader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 17,
  },

  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    marginBottom: 6,
  },

  text: {
    width: 40,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },

  shimmer: {
    width: '40%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
