import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SafeFastImage from '../../utils/SafeFastImage';
import {categories} from '../../data/ecommerceData';
import Color from '../../Common/Color';

const CategoryListScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const renderCategory = ({item}) => {
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        style={[styles.categoryCard, isSelected && styles.selectedCard]}
        onPress={() => setSelectedCategory(item?.id)}>
        <SafeFastImage source={item.image} style={styles.categoryImage} />

        <Text style={styles.categoryName}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigation.goBack()}>
          <SafeFastImage
            source={require('../../assets/images/leftArrow.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>

        <View style={styles.logoWrapper}>
          <SafeFastImage
            source={require('../../assets/images/Logo1.png')}
            style={styles.logo}
          />
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Shop by categories</Text>

        <TouchableOpacity style={styles.cartBtn}>
          <SafeFastImage
            source={require('../../assets/images/addtocart.png')}
            style={styles.cartIcon}
            tintColor={Color.WHITE}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CategoryListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 16,
  },

  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },

  menuBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuIcon: {
    width: 18,
    height: 18,
  },

  logoWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  logo: {
    width: 50,
    height: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Color.BLACK,
  },

  cartBtn: {
    width: 42,
    height: 42,
    backgroundColor: Color.GREEN,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartIcon: {
    width: 20,
    height: 20,
  },

  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: Color.GREEN,
  },

  categoryImage: {
    width: 45,
    height: 45,
    marginRight: 12,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  categoryName: {
    fontSize: 16,
    color: Color.BLACK,
  },
});
