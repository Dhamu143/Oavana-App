import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import apiClient from '../../utils/ApiClient';
import Color from '../../Common/Color';
import SafeFastImage from '../../utils/SafeFastImage';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import AppHeader from '../../Components/AppHeader';
import SkeletonFAQ from '../../reuseable/SkeletonFAQ';

const FAQScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);

        const response = await apiClient.get('/faq/active');

        if (response?.data?.success) {
          const faqData = response?.data?.data || [];

          setFaqs(faqData);
          setFilteredFaqs(faqData);

          // Extract unique categories
          const uniqueCategories = [
            'All',
            ...new Set(
              faqData
                .map(item => item.category)
                .filter(cat => cat && cat.trim() !== ''),
            ),
          ];

          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.log('FAQ ERROR', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleCategorySelect = category => {
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(item => item.category === category);
      setFilteredFaqs(filtered);
    }
  };

  const handleSearch = text => {
    setSearch(text);

    const filtered = faqs.filter(item =>
      item.question.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredFaqs(filtered);
  };

  const toggleExpand = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderFAQ = ({item, index}) => {
    const isActive = index === activeIndex;

    return (
      <View style={styles.faqContainer}>
        <TouchableOpacity
          style={styles.questionRow}
          onPress={() => toggleExpand(index)}>
          <Text style={styles.questionText}>{item?.question}</Text>

          <SafeFastImage
            source={
              isActive
                ? require('../../assets/images/minus.png')
                : require('../../assets/images/plus.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>

        <Collapsible collapsed={!isActive}>
          <Text style={styles.answerText}>{item?.answer}</Text>
        </Collapsible>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Color.WHITE}
        translucent={false}
      />
      <View style={[styles.container, {paddingBottom: insets.bottom + 10}]}>
        <AppHeader navigation={navigation} />
        <Text style={styles.title}>Frequently Asked Questions</Text>

        <Text style={styles.subtitle}>
          Some information here as a subheading.
        </Text>

        <TextInput
          placeholder="Search here"
          value={search}
          onChangeText={handleSearch}
          style={styles.searchInput}
          placeholderTextColor={Color.Placeholder}
        />
        <View style={{marginBottom: 5}}>
          <Text style={styles.categoryTitle}>Category</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            style={{marginBottom: 15}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.categoryBtn,
                  selectedCategory === item && styles.categoryActive,
                ]}
                onPress={() => handleCategorySelect(item)}>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item && styles.categoryActiveText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {loading ? (
          <SkeletonFAQ />
        ) : (
          <FlatList
            data={filteredFaqs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderFAQ}
            showsVerticalScrollIndicator={false}
          />
        )}

        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() => {
            navigation.navigate('ContactScreen');
          }}>
          <Text style={styles.contactText}>
            Didn't find the answer? Contact Us
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Color.WHITE,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
    marginTop: 15,
    color: Color.BLACK,
  },

  subtitle: {
    fontSize: 14,
    color: '#737272',
    marginBottom: 15,
  },

  searchInput: {
    borderBottomWidth: 1,
    borderColor: Color.boredrColor,
    paddingVertical: 8,
    marginBottom: 5,
  },

  faqContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: Color.boredrColor,
    paddingBottom: 22,
  },

  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  questionText: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    paddingRight: 10,
    color: Color.BLACK,
  },

  answerText: {
    marginTop: 8,
    color: Color.Placeholder,
    fontSize: 13,
    lineHeight: 18,
  },

  icon: {
    width: 18,
    height: 18,
  },

  contactBtn: {
    backgroundColor: Color.GREEN,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  contactText: {
    color: Color.WHITE,
    fontWeight: '600',
  },

  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
    marginRight: 10,
  },

  categoryActive: {
    backgroundColor: Color.GREEN,
  },

  categoryText: {
    fontSize: 13,
    color: '#333',
  },

  categoryActiveText: {
    color: Color.WHITE,
    fontWeight: '600',
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.BLACK,
    marginBottom: 10,
  },
});
