import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import SafeFastImage from '../../utils/SafeFastImage';
import Color from '../../Common/Color';

const members = [
  {
    id: '1',
    name: 'Cameron Williamson',
    score: '1,123',
    img: require('../../assets/images/userProfile.png'),
  },
  {
    id: '2',
    name: 'Jacob Jones',
    score: '1,012',
    img: require('../../assets/images/userProfile.png'),
  },
  {
    id: '3',
    name: 'Ronald Richards',
    score: '998',
    img: require('../../assets/images/userProfile.png'),
  },
  {
    id: '4',
    name: 'Eleanor Pena',
    score: '870',
    img: require('../../assets/images/userProfile.png'),
  },
  {
    id: '5',
    name: 'Annette Black',
    score: '32',
    img: require('../../assets/images/userProfile.png'),
  },

  {
    id: '6',
    name: 'Cameron Williamson',
    score: '1,123',
    img: require('../../assets/images/userProfile.png'),
  },
  {
    id: '7',
    name: 'Jacob Jones',
    score: '1,012',
    img: require('../../assets/images/userProfile.png'),
  },
  {
    id: '8',
    name: 'Ronald Richards',
    score: '998',
    img: require('../../assets/images/userProfile.png'),
  },
  {
    id: '9',
    name: 'Eleanor Pena',
    score: '870',
    img: require('../../assets/images/userProfile.png'),
  },
  {
    id: '10',
    name: 'Annette Black',
    score: '32',
    img: require('../../assets/images/userProfile.png'),
  },
];

const YourTeams = ({navigation}) => {
  const renderMember = ({item}) => (
    <View style={styles.memberRow}>
      <SafeFastImage source={item?.img} style={styles.memberImg} />

      <View style={{flex: 1}}>
        <Text style={styles.memberName}>{item?.name}</Text>
        <Text style={styles.memberScore}>{item?.score}</Text>
      </View>

      <TouchableOpacity>
        <SafeFastImage
          source={require('../../assets/images/delete.png')}
          style={styles.deleteIcon}
          tintColor="red"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => {
          navigation.navigate('CreateTeamScreen');
        }}>
        <Text style={styles.createText}>Create a New Team</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.teamTitle}>Team name here</Text>

          <View style={styles.icons}>
            <SafeFastImage
              source={require('../../assets/images/chat.png')}
              style={styles.icon}
            />

            <SafeFastImage
              source={require('../../assets/images/edit.png')}
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.avatarRow}>
          <SafeFastImage
            source={require('../../assets/images/userProfile.png')}
            style={styles.avatar}
          />

          <SafeFastImage
            source={require('../../assets/images/userProfile.png')}
            style={[styles.avatar, {marginLeft: -12}]}
          />

          <SafeFastImage
            source={require('../../assets/images/userProfile.png')}
            style={[styles.avatar, {marginLeft: -12}]}
          />

          <SafeFastImage
            source={require('../../assets/images/userProfile.png')}
            style={[styles.avatar, {marginLeft: -12}]}
          />

          <View style={styles.plus}>
            <Text style={{color: '#fff', fontWeight: '600'}}>+12</Text>
          </View>
        </View>

        <Text style={styles.date}>Date created: 20/09/2024 | 03:23</Text>

        <View style={styles.divider} />

        <Text style={styles.invite}>Invite Code</Text>

        <View style={styles.codeRow}>
          <Text style={styles.code}>D1J8L9</Text>

          <SafeFastImage
            source={require('../../assets/images/copy.png')}
            style={styles.copy}
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.memberTitle}>Members</Text>

        <FlatList
          data={members}
          renderItem={renderMember}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 270}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default YourTeams;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: Color.WHITE,
  },

  createBtn: {
    backgroundColor: Color.GREEN,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },

  createText: {
    color: Color.WHITE,
    fontWeight: '600',
  },

  card: {
    backgroundColor: Color.WHITE,
    borderRadius: 14,
    padding: 16,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  teamTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: Color.BLACK,
  },

  icons: {
    flexDirection: 'row',
    gap: 15,
  },

  icon: {
    width: 22,
    height: 22,
  },

  avatarRow: {
    flexDirection: 'row',
    marginTop: 12,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Color.WHITE,
  },

  plus: {
    marginLeft: -12,
    backgroundColor: Color.GREEN,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  date: {
    fontSize: 12,
    color: Color.Placeholder,
    marginTop: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },

  invite: {
    fontWeight: '600',
    color: Color.BLACK,
  },

  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  code: {
    fontSize: 22,
    fontWeight: '700',
    color: Color.BLACK,
  },

  copy: {
    width: 20,
    height: 20,
  },

  memberTitle: {
    fontWeight: '600',
    marginBottom: 10,
    color: Color.BLACK,
  },

  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  memberImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  memberName: {
    fontSize: 14,
    fontWeight: '500',
    color: Color.BLACK,
  },

  memberScore: {
    fontSize: 12,
    color: '#5e5d5d',
    fontWeight: '500',
  },

  deleteIcon: {
    width: 22,
    height: 22,
  },
});
