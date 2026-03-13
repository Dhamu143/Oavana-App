import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SafeFastImage from '../../utils/SafeFastImage';
import {products} from '../../data/ecommerceData';
import Color from '../../Common/Color';
import ProductCard from '../../Components/ProductCard';
import AppHeader from '../../Components/AppHeader';
import apiClient from '../../utils/ApiClient';
import SkeletonCategoryLoader from '../../reuseable/SkeletonCategoryLoader';

const EcommerceHomeScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    getProductCategories();
  }, []);

  const getProductCategories = async () => {
    setLoadingCategories(true);

    try {
      const response = await apiClient.get('/category');

      if (response?.data?.success) {
        setCategoryList(response.data.data);
      }
    } catch (error) {
      console.log('Category Error:', error?.response || error?.message);
    } finally {
      setLoadingCategories(false);
    }
  };

  const renderCategory = ({item}) => {
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => {
          setSelectedCategory(item.id);
          navigation.navigate('CategoryProductsScreen', {
            category: item,
          });
        }}>
        <SafeFastImage
          source={item?.image}
          style={[
            styles.categoryImage,
            isSelected && styles.selectCategoryImage,
          ]}
        />

        <Text
          style={[
            styles.categoryText,
            isSelected && styles.selectedCategoryText,
          ]}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProduct = ({item}) => {
    return (
      <ProductCard
        item={item}
        onPress={() =>
          navigation.navigate('ProductDetailsScreen', {product: item})
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Color.WHITE}
        translucent={false}
      />

      <AppHeader navigation={navigation} />
      <View style={styles.header}>
        <Text style={styles.title}>Ecommerce</Text>

        <TouchableOpacity
          style={styles.headerCartBtn}
          onPress={() => {
            navigation.navigate('CartScreen');
          }}>
          <SafeFastImage
            source={require('../../assets/images/addtocart.png')}
            style={styles.iconWhite}
            tintColor={Color.WHITE}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor={Color.Placeholder}
        />

        <TouchableOpacity style={styles.filterBtn}>
          <SafeFastImage
            source={require('../../assets/images/filter.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>

          {!loadingCategories && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CategoryListScreen', {
                  categories: categoryList,
                  selectedCategory: selectedCategory,
                })
              }>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={loadingCategories ? [1, 2, 3, 4, 5, 6] : categoryList}
          renderItem={({item}) =>
            loadingCategories ? (
              <SkeletonCategoryLoader />
            ) : (
              renderCategory({item})
            )
          }
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 5,
            // paddingRight: 20,
          }}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top products</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}
      />
    </SafeAreaView>
  );
};

export default EcommerceHomeScreen;
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
    marginBottom: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Color.BLACK,
  },

  headerCartBtn: {
    backgroundColor: Color.GREEN,
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Color.boredrColor,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 14,
    color: Color.BLACK,
  },

  filterBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.BLACK,
  },

  seeAll: {
    color: Color.GREEN,
    fontWeight: '500',
  },

  icon: {
    width: 20,
    height: 20,
  },

  iconWhite: {
    width: 20,
    height: 20,
  },

  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 17,
  },

  categoryImage: {
    width: 56,
    height: 56,
    marginBottom: 6,
    borderWidth: 1,
    borderRadius: 28,
    borderColor: Color.boredrColor,
  },

  selectCategoryImage: {
    borderWidth: 2,
    borderColor: Color.GREEN,
  },

  categoryText: {
    fontSize: 12,
    color: Color.BLACK,
    textAlign: 'center',
    width: '100%',
  },

  selectedCategoryText: {
    color: Color.GREEN,
    fontWeight: '700',
  },
});
