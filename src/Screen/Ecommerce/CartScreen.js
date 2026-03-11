import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import SafeFastImage from '../../utils/SafeFastImage';
import Color from '../../Common/Color';
import AppHeader from '../../Components/AppHeader';

const CartScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [cartData, setCartData] = useState([
    {
      id: '1',
      name: "Men's Harrington Jacket",
      price: 148,
      size: 'M',
      color: 'Lemon',
      image: require('../../assets/images/Rectangle8.png'),
      qty: 1,
    },
    {
      id: '2',
      name: "Men's Coaches Jacket",
      price: 148,
      size: 'M',
      color: 'Black',
      image: require('../../assets/images/Rectangle9.png'),
      qty: 1,
    },
  ]);

  const increaseQty = id => {
    setCartData(prev =>
      prev.map(item => (item.id === id ? {...item, qty: item.qty + 1} : item)),
    );
  };

  const decreaseQty = id => {
    setCartData(prev =>
      prev.map(item =>
        item.id === id && item.qty > 1 ? {...item, qty: item.qty - 1} : item,
      ),
    );
  };

  const removeAll = () => {
    setCartData([]);
  };

  const subtotal = cartData.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const shipping = 8;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const renderItem = ({item}) => (
    <View style={styles.cartCard}>
      <SafeFastImage source={item.image} style={styles.productImage} />

      <View style={{flex: 1}}>
        <View style={styles.topRow}>
          <Text numberOfLines={1} style={styles.productTitle}>
            {item.name}
          </Text>

          <Text style={styles.price}>GET {item.price}.00</Text>
        </View>

        <Text style={styles.variantText}>
          Size - <Text style={styles.bold}>{item.size}</Text> Color -
          <Text style={styles.bold}> {item.color}</Text>
        </Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => decreaseQty(item.id)}>
            <SafeFastImage
              source={require('../../assets/images/minus-sign.png')}
              style={styles.qtyIcon}
              tintColor={Color.WHITE}
            />
          </TouchableOpacity>

          <Text style={styles.qtyNumber}>{item.qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => increaseQty(item.id)}>
            <SafeFastImage
              source={require('../../assets/images/add.png')}
              style={styles.qtyIcon}
              tintColor={Color.WHITE}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, {paddingBottom: insets.bottom}]}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <AppHeader navigation={navigation} />

      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>

        <TouchableOpacity>
          <Text style={styles.removeAll}>Remove All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        style={{flex: 1}}
      />
      <View style={[styles.bottomSection, {paddingBottom: insets.bottom + 10}]}>
        <View style={styles.summaryContainer}>
          <View style={styles.row}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.summaryText}>Shipping Cost</Text>
            <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.summaryText}>Tax</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalValue}>${total}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => {
            navigation.navigate('CheckoutScreen');
          }}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

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
    marginVertical: 20,
  },

  bottomSection: {
    backgroundColor: Color.WHITE,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Color.BLACK,
  },

  removeAll: {
    fontSize: 14,
    color: Color.BLACK,
  },

  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Color.boredrColor,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    color: Color.BLACK,
  },

  price: {
    fontWeight: '700',
    marginLeft: 10,
    color: Color.BLACK,
  },

  variantText: {
    marginTop: 6,
    fontSize: 13,
    color: Color.Placeholder,
  },

  bold: {
    fontWeight: '600',
    color: Color.BLACK,
  },

  qtyRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },

  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: Color.GREEN,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: Color.BLACK,
    alignSelf: 'center',
  },
  qtyIcon: {
    width: 10,
    height: 10,
  },

  summaryContainer: {
    marginTop: 20,
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  summaryText: {
    color: '#505050',
    fontSize: 15,
    fontWeight: '500',
  },

  summaryValue: {
    fontWeight: '600',
    fontSize: 15,
    color: '#505050',
  },

  totalText: {
    fontSize: 17,
    fontWeight: '700',
    color: Color.BLACK,
  },

  totalValue: {
    fontSize: 17,
    fontWeight: '700',
    color: Color.BLACK,
  },

  checkoutBtn: {
    backgroundColor: Color.GREEN,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  checkoutText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
