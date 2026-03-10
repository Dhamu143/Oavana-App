import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const SkeletonCourseCard = () => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={styles.card}>
      <View style={styles.image} />

      <View style={styles.content}>
        <View style={styles.title} />
        <View style={styles.subtitle} />

        <View style={styles.row}>
          <View style={styles.smallLine} />
          <View style={styles.smallLine} />
        </View>

        <View style={styles.subtitle} />

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

export default SkeletonCourseCard;

const styles = StyleSheet.create({
  card: {
    width: 240,
    height: 220,
    backgroundColor: '#E5E5E5',
    borderRadius: 14,
    marginRight: 15,
    overflow: 'hidden',
  },

  image: {
    height: 130,
    backgroundColor: '#DADADA',
  },

  content: {
    padding: 12,
  },

  title: {
    height: 16,
    width: '80%',
    backgroundColor: '#DADADA',
    borderRadius: 6,
    marginBottom: 8,
  },

  subtitle: {
    height: 12,
    width: '60%',
    backgroundColor: '#DADADA',
    borderRadius: 6,
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },

  smallLine: {
    height: 12,
    width: 60,
    backgroundColor: '#DADADA',
    borderRadius: 6,
  },

  shimmer: {
    position: 'absolute',
    width: 80,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});
