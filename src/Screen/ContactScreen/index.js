import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Color from '../../Common/Color';
import SafeFastImage from '../../utils/SafeFastImage';

const ContactScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [focused, setFocused] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log({name, email, subject, description});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.WHITE} />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContainer,
            {paddingBottom: insets.bottom + 20},
          ]}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => navigation.goBack()}>
              <SafeFastImage
      source={require('../../assets/images/leftArrow.png')}
      style={styles.menuIcon}
    />

            </TouchableOpacity>

        <SafeFastImage
    source={require('../../assets/images/Logo1.png')}
    style={styles.logoIcon}
  />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Contact Us</Text>
            <Text style={styles.subtitle}>We love to hear from you.</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>User Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="User Name"
                placeholderTextColor="#9E9E9E"
                style={[
                  styles.input,
                  {
                    borderBottomColor:
                      focused === 'name' ? Color.GREEN : '#CFCFCF',
                  },
                ]}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                placeholderTextColor="#9E9E9E"
                keyboardType="email-address"
                style={[
                  styles.input,
                  {
                    borderBottomColor:
                      focused === 'email' ? Color.GREEN : '#CFCFCF',
                  },
                ]}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                value={subject}
                onChangeText={setSubject}
                placeholder="Subject"
                placeholderTextColor="#9E9E9E"
                style={[
                  styles.input,
                  {
                    borderBottomColor:
                      focused === 'subject' ? Color.GREEN : '#CFCFCF',
                  },
                ]}
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused(null)}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                placeholderTextColor="#9E9E9E"
                multiline
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    borderBottomColor:
                      focused === 'description' ? Color.GREEN : '#CFCFCF',
                  },
                ]}
                onFocus={() => setFocused('description')}
                onBlur={() => setFocused(null)}
              />
            </View>

            <TouchableOpacity style={styles.sendBtn} onPress={handleSubmit}>
              <Text style={styles.sendText}>Send Message</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialSection}>
            <Text style={styles.connectText}>Let’s Connect</Text>

            <View style={styles.iconRow}>

  <SafeFastImage
    source={require('../../assets/images/facebook.png')}
    style={styles.socialIcon}
  />

  <SafeFastImage
    source={require('../../assets/images/instagram.png')}
    style={styles.socialIcon}
  />

  <SafeFastImage
    source={require('../../assets/images/linkedin.png')}
    style={styles.socialIcon}
  />

  <SafeFastImage
    source={require('../../assets/images/twitter.png')}
    style={styles.socialIcon}
  />

</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 24,
  },

  scrollContainer: {
    flexGrow: 1,
  },

  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  menuBtn: {
    position: 'absolute',
    left: 0,
    width: 44,
    height: 44,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuIcon: {
    width: 20,
    height: 20,
  },

  logoIcon: {
    width: 65,
    height: 40,
  },

  formContainer: {
    marginTop: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Color.BLACK,
  },

  subtitle: {
    fontSize: 15,
    color: '#7A7A7A',
    marginTop: 6,
    marginBottom: 20,
  },

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: '#444',
    marginBottom: 6,
    fontWeight: '500',
  },

  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    paddingVertical: 6,
    color: Color.BLACK,
  },

  textArea: {
    textAlignVertical: 'top',
  },

  sendBtn: {
    backgroundColor: Color.GREEN,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  sendText: {
    color: Color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  socialSection: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: 40,
  },

  connectText: {
    fontSize: 15,
    color: '#7A7A7A',
    marginBottom: 20,
  },

  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 220,
  },

  socialIcon: {
    width: 38,
    height: 38,
  },
});
