import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const SkeletonLoader = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const interpolateBackground = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E5E5', '#F5F5F5'], 
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.skeleton, {backgroundColor: interpolateBackground}]}
      />
      <Animated.View
        style={[
          styles.skeleton,
          {backgroundColor: interpolateBackground, height: 15},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 8,
    marginHorizontal: 12,
    backgroundColor: '#FFFFFF', 
    padding: 15,
  },
  skeleton: {
    height: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
});

export default SkeletonLoader;