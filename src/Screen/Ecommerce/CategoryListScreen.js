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
import Color from '../../Common/Color';
import AppHeader from '../../Components/AppHeader';

const CategoryListScreen = ({navigation, route}) => {
  const {categories, selectedCategory: selectedFromHome} = route.params;

  const [selectedCategory, setSelectedCategory] = useState(selectedFromHome);

  const renderCategory = ({item}) => {
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        style={[styles.categoryCard, isSelected && styles.selectedCard]}
        onPress={() => {
          setSelectedCategory(item?.id);

          navigation.navigate('CategoryProductsScreen', {
            category: item,
          });
        }}>
        <SafeFastImage source={item.image} style={styles.categoryImage} />

        <Text style={styles.categoryName}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <AppHeader navigation={navigation} />

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
