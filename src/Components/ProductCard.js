import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Color from '../Common/Color';
import SafeFastImage from '../utils/SafeFastImage';

const {width} = Dimensions.get('window');

const ProductCard = ({item, onAddToCart}) => {
  return (
    <View style={styles.productCard}>
      <SafeFastImage
        source={item?.image}
        style={styles.productImage}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.productCartIcon}
        onPress={() => onAddToCart?.(item)}>
        <SafeFastImage
          source={require('../assets/images/addtocart.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <View style={styles.productInfoCard}>
        <Text numberOfLines={2} style={styles.productTitle}>
          {item?.name}
        </Text>

        <Text style={styles.price}>{item?.price}</Text>
      </View>
    </View>
  );
};

export default React.memo(ProductCard);

const styles = StyleSheet.create({
  productCard: {
    width: width / 2 - 24,
    height: 230,
    marginRight: 6,
    marginVertical: 5,
    borderRadius: 16,
    backgroundColor: '#F1F1F1',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  productImage: {
    width: '100%',
    height: 170,
  },

  productCartIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
  },

  productInfoCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Color.WHITE,
    padding: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  productTitle: {
    fontSize: 13,
    color: '#333',
  },

  price: {
    marginTop: 4,
    fontWeight: '700',
    color: Color.BLACK,
  },

  icon: {
    width: 20,
    height: 20,
  },
});
