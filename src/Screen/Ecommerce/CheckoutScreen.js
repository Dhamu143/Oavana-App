import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import SafeFastImage from '../../utils/SafeFastImage';
import Color from '../../Common/Color';
import AppHeader from '../../Components/AppHeader';
import OrderPlaceModal from '../../Modal/OrderPlaceModal';

const CheckoutScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('confirm');

  const subtotal = 200;
  const shipping = 8;
  const tax = 0;
  const total = subtotal + shipping + tax;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <AppHeader navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}}>
        <Text style={styles.title}>Checkout</Text>

        <TouchableOpacity style={styles.optionCard}>
          <View>
            <Text style={styles.optionLabel}>Shipping Address</Text>
            <Text style={styles.optionValue}>Add Shipping Address</Text>
          </View>

          <SafeFastImage
            source={require('../../assets/images/right-arrow.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard}>
          <View>
            <Text style={styles.optionLabel}>Payment Method</Text>
            <Text style={styles.optionValue}>Add Payment Method</Text>
          </View>

          <SafeFastImage
            source={require('../../assets/images/right-arrow.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </ScrollView>

      <View style={[styles.bottomSection, {paddingBottom: insets.bottom + 10}]}>
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

        <TouchableOpacity
          style={styles.orderBtn}
          onPress={() => {
            setModalType('confirm');
            setModalVisible(true);
          }}>
          <Text style={styles.orderText}>Place order</Text>
        </TouchableOpacity>
      </View>
      <OrderPlaceModal
        visible={modalVisible}
        type={modalType}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalType('success');
        }}
        onReturnHome={() => {
          setModalVisible(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'MaindashboardDrawer'}],
          });
        }}
      />
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 20,
    color: Color.BLACK,
  },

  optionCard: {
    backgroundColor: '#f5f3f3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionLabel: {
    fontSize: 12,
    color: Color.Placeholder,
  },

  optionValue: {
    fontSize: 16,
    color: Color.BLACK,
    marginTop: 3,
  },

  arrow: {
    width: 20,
    height: 20,
  },

  bottomSection: {
    borderTopWidth: 1,
    borderColor: Color.boredrColor,
    paddingTop: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  summaryText: {
    fontSize: 15,
    color: '#505050',
  },

  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.BLACK,
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

  orderBtn: {
    marginTop: 20,
    backgroundColor: Color.GREEN,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  orderText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
