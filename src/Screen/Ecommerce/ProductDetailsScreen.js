import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import SafeFastImage from '../../utils/SafeFastImage';
import Color from '../../Common/Color';
import AppHeader from '../../Components/AppHeader';
import OptionBottomModal from '../../Modal/OptionBottomModal';

const ProductDetailsScreen = ({route, navigation}) => {
  const {product} = route.params;

  const insets = useSafeAreaInsets();

  const [qty, setQty] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('orange');

  const sizeData = [
    {label: 'S', value: 'S'},
    {label: 'M', value: 'M'},
    {label: 'L', value: 'L'},
    {label: 'XL', value: 'XL'},
  ];

  const colorData = [
    {label: 'Orange', value: 'orange', color: '#F97316'},
    {label: 'Black', value: 'black', color: '#111'},
    {label: 'Red', value: 'red', color: '#EF4444'},
    {label: 'Yellow', value: 'yellow', color: '#FBBF24'},
    {label: 'Blue', value: 'blue', color: '#3B82F6'},
  ];

  const images = product.images || [
    require('../../assets/images/Rectangle8.png'),
    require('../../assets/images/Rectangle9.png'),
    require('../../assets/images/Rectangle8.png'),
  ];

  const increase = () => setQty(qty + 1);

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const renderImage = ({item}) => (
    <SafeFastImage source={item} style={styles.productImage} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <AppHeader navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: insets.bottom + 30}}>
        <Text style={styles.title}>{product.name}</Text>

        <Text style={styles.price}>GET {product?.price}</Text>

        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 20}}
        />

        <TouchableOpacity
          style={styles.optionBox}
          onPress={() => {
            setModalType('size');
            setModalVisible(true);
          }}>
          <Text style={styles.optionText}>Size</Text>

          <View style={styles.sizeRight}>
            <Text style={styles.optionValue}>S</Text>

            <SafeFastImage
              source={require('../../assets/images/down-arrow.png')}
              style={styles.dropdownIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionBox}
          onPress={() => {
            setModalType('color');
            setModalVisible(true);
          }}>
          <Text style={styles.optionText}>Color</Text>

          <View style={styles.colorRight}>
            <View style={styles.colorCircle} />

            <SafeFastImage
              source={require('../../assets/images/down-arrow.png')}
              style={styles.dropdownIcon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.optionBox}>
          <Text style={styles.optionText}>Quantity</Text>

          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={decrease}>
              <SafeFastImage
                source={require('../../assets/images/minus-sign.png')}
                style={styles.qtyIcon}
                tintColor={Color.WHITE}
              />
            </TouchableOpacity>

            <Text style={styles.qty}>{qty}</Text>

            <TouchableOpacity style={styles.qtyBtn} onPress={increase}>
              <SafeFastImage
                source={require('../../assets/images/add.png')}
                style={styles.qtyIcon}
                tintColor={Color.WHITE}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.desc}>
          Built for life and made to last, this full-zip corduroy jacket is part
          of our Nike Life collection. The spacious fit gives you plenty of room
          to layer underneath, while the soft corduroy keeps it casual and
          timeless.
        </Text>

        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => {
            navigation.navigate('CartScreen');
          }}>
          <Text style={styles.buyText}>Buy this item</Text>
        </TouchableOpacity>
      </ScrollView>
      <OptionBottomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalType === 'size' ? 'Size' : 'Color'}
        data={modalType === 'size' ? sizeData : colorData}
        selected={modalType === 'size' ? selectedSize : selectedColor}
        onSelect={value => {
          if (modalType === 'size') {
            setSelectedSize(value);
          } else {
            setSelectedColor(value);
          }

          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
    color: Color.BLACK,
  },

  price: {
    fontSize: 18,
    marginTop: 4,
    color: Color.BLACK,
  },

  productImage: {
    width: 200,
    height: 260,
    borderRadius: 10,
    marginRight: 15,
  },

  optionBox: {
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionText: {
    fontSize: 16,
    color: '#2e2d2d',
  },

  optionValue: {
    fontSize: 16,
    fontWeight: '600',
  },

  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#a6ad84',
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyBtn: {
    width: 36,
    height: 36,
    backgroundColor: Color.GREEN,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyIcon: {
    width: 13,
    height: 13,
  },

  qty: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
  },

  desc: {
    marginTop: 20,
    color: '#2e2d2d',
    lineHeight: 20,
  },

  buyBtn: {
    marginTop: 30,
    backgroundColor: Color.GREEN,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buyText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  colorRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dropdownIcon: {
    width: 16,
    height: 16,
    marginLeft: 15,
  },
  sizeRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
