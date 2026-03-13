import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SafeFastImage from '../../utils/SafeFastImage';
import Color from '../../Common/Color';

const leaderboardData = {
  summary: {
    global: '#1,234',
    country: '#22',
    references: '#12',
  },

  teams: [
    {
      id: '1',
      teamName: 'Team name here',
      members: [
        {
          id: '1',
          rank: '#1',
          name: 'Cameron Williamson',
          score: '1,123',
          avatar: require('../../assets/images/userProfile.png'),
        },
        {
          id: '2',
          rank: '#7',
          name: 'You',
          score: '640',
          avatar: require('../../assets/images/userProfile.png'),
        },
      ],
    },
    {
      id: '2',
      teamName: 'Team name here',
      members: [
        {
          id: '1',
          rank: '#1',
          name: 'Cameron Williamson',
          score: '1,123',
          avatar: require('../../assets/images/userProfile.png'),
        },
        {
          id: '2',
          rank: '#2',
          name: 'Jacob Jones',
          score: '1,012',
          avatar: require('../../assets/images/userProfile.png'),
        },
        {
          id: '3',
          rank: '#3',
          name: 'Ronald Richards',
          score: '870',
          avatar: require('../../assets/images/userProfile.png'),
        },
        {id: '4', type: 'dots'},
        {
          id: '5',
          rank: '#7',
          name: 'You',
          score: '640',
          avatar: require('../../assets/images/userProfile.png'),
        },
      ],
    },
  ],
};

const Leaderboard = () => {
  const renderMember = ({item}) => {
    if (item.type === 'dots') {
      return <Text style={styles.dots}>...</Text>;
    }

    return (
      <View style={styles.row}>
        <Text style={styles.rank}>{item.rank}</Text>

        <SafeFastImage source={item.avatar} style={styles.avatar} />

        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.score}>{item.score}</Text>
        </View>
      </View>
    );
  };

  const renderTeam = ({item}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.teamTitle}>{item.teamName}</Text>

        <FlatList
          data={item.members}
          keyExtractor={member => member.id}
          renderItem={renderMember}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Global Ranking</Text>
          <Text style={styles.summaryValue}>
            {leaderboardData.summary.global}
          </Text>
        </View>

        <View style={styles.dividerVertical} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Country Ranking</Text>
          <Text style={styles.summaryValue}>
            {leaderboardData.summary.country}
          </Text>
        </View>

        <View style={styles.dividerVertical} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>References</Text>
          <Text style={styles.summaryValue}>
            {leaderboardData.summary.references}
          </Text>
        </View>
      </View>

      <FlatList
        data={leaderboardData.teams}
        keyExtractor={item => item.id}
        renderItem={renderTeam}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
    padding: 16,
  },

  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'space-around',
    marginBottom: 16,
  },

  summaryItem: {
    alignItems: 'center',
  },

  summaryTitle: {
    fontSize: 12,
    color: Color.BLACK,
    marginBottom: 4,
  },

  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Color.BLACK,
  },

  dividerVertical: {
    width: 1,
    backgroundColor: '#e5e5e5',
  },

  card: {
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },

  teamTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 14,
    color: Color.BLACK,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  rank: {
    width: 40,
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
  },

  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Color.BLACK,
  },

  score: {
    fontSize: 12,
    color: '#373434',
  },

  dots: {
    fontSize: 20,
    color: Color.GREEN,
    // marginLeft: 40,
    marginBottom: 10,
    fontWeight: '800',
  },
});
