import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import apiClient from '../../utils/ApiClient';
import Color from '../../Common/Color';
import SafeFastImage from '../../utils/SafeFastImage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


const FAQScreen = ({ navigation }) => {

    const insets = useSafeAreaInsets();
    const [faqs, setFaqs] = useState([]);
    const [filteredFaqs, setFilteredFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                setLoading(true);

                const response = await apiClient.get('/faq/active');

                if (response?.data?.success) {
                    const faqData = response?.data?.data || [];
                    setFaqs(faqData);
                    setFilteredFaqs(faqData);
                }
            } catch (error) {
                console.log('FAQ ERROR', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQs();
    }, []);


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

    const renderFAQ = ({ item, index }) => {
        const isActive = index === activeIndex;

        return (
            <View style={styles.faqContainer}>
                <TouchableOpacity
                    style={styles.questionRow}
                    onPress={() => toggleExpand(index)}>
                    <Text style={styles.questionText}>{item.question}</Text>

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
                    <Text style={styles.answerText}>{item.answer}</Text>
                </Collapsible>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
            <View style={[styles.container, { paddingBottom: insets.bottom + 10 }]}>
                <View style={styles.headerRow}>
                    <TouchableOpacity style={styles.menuBtn} onPress={() => {
                        navigation.goBack()
                    }}>
                        <SafeFastImage
                            source={require('../../assets/images/leftArrow.png')}
                            style={styles.menuIcon}
                        />
                    </TouchableOpacity>

                    <View style={styles.toggleContainer}>
                        <SafeFastImage
                            source={require('../../assets/images/Logo1.png')}
                            style={styles.toggleIcon}
                        />
                    </View>

                </View>

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



                {loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={Color.GREEN} />
                        <Text style={styles.loaderText}>Fetching FAQs...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredFaqs}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderFAQ}
                        showsVerticalScrollIndicator={false}
                    />
                )}


                <TouchableOpacity style={styles.contactBtn} onPress={()=>{
                    navigation.navigate("ContactScreen")
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
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#F3F4F6',
    },

    headerRow: {
        height: 50,
        justifyContent: 'center',

    },

    menuBtn: {
        position: 'absolute',
        left: 0,
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuIcon: {
        width: 18,
        height: 18,
    },

    toggleContainer: {
        alignSelf: 'center',
    },

    toggleIcon: {
        width: 70,
        height: 35,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 5,
        marginTop: 15

    },

    subtitle: {
        fontSize: 13,
        color: '#888',
        marginBottom: 15,
    },

    searchInput: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
        marginBottom: 15,
    },

    faqContainer: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#E5E7EB',
        paddingBottom: 20,
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
        color: Color.BLACK
    },

    answerText: {
        marginTop: 8,
        color: '#666',
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

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    loaderText: {
        marginTop: 10,
        fontSize: 14,
        color: Color.BLACK,
    },
});