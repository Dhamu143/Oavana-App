import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Color from '../Common/Color';

const SkeletonFAQItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.question} />
        <View style={styles.icon} />
      </View>

      <View style={styles.answerLine} />
      <View style={styles.answerLineShort} />
    </View>
  );
};

const SkeletonFAQ = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={() => <SkeletonFAQItem />}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      initialNumToRender={5}
    />
  );
};

export default SkeletonFAQ;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: Color.boredrColor,
    paddingBottom: 22,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  question: {
    height: 16,
    width: '80%',
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
  },

  icon: {
    width: 18,
    height: 18,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },

  answerLine: {
    height: 12,
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginTop: 10,
  },

  answerLineShort: {
    height: 12,
    width: '60%',
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginTop: 6,
  },
});
