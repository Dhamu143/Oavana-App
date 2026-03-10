import React, {useState} from 'react';
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
import {categories, products} from '../../data/ecommerceData';
import Color from '../../Common/Color';
import ProductCard from '../../Components/ProductCard';

const EcommerceHomeScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    return <ProductCard item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Color.WHITE}
        translucent={false}
      />

      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => {
            navigation.goBack();
          }}>
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
        <Text style={styles.title}>Ecommerce</Text>

        <TouchableOpacity style={styles.headerCartBtn}>
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

          <TouchableOpacity
            onPress={() => navigation.navigate('CategoryListScreen')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          renderItem={renderCategory}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingRight: 20,
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
