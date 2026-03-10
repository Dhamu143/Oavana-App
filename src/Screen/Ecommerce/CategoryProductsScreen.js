import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import SafeFastImage from '../../utils/SafeFastImage';
import {products} from '../../data/ecommerceData';
import ProductCard from '../../Components/ProductCard';
import Color from '../../Common/Color';

const CategoryProductsScreen = ({route, navigation}) => {
  const {category} = route.params;

  const renderProduct = ({item}) => {
    return <ProductCard item={item} />;
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
        <Text style={styles.title}>{category.name}</Text>

        <TouchableOpacity style={styles.headerCartBtn}>
          <SafeFastImage
            source={require('../../assets/images/addtocart.png')}
            style={styles.iconWhite}
            tintColor={Color.WHITE}
          />
        </TouchableOpacity>
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

export default CategoryProductsScreen;

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

  headerCartBtn: {
    backgroundColor: Color.GREEN,
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWhite: {
    width: 20,
    height: 20,
  },
});
