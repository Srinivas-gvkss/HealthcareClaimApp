import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallScreen = width < 375;

export default function DashboardScreen({ navigation }: any) {
  const stats = [
    { title: 'Active Claims', value: '12', change: '+3 this week', color: '#4CAF50', icon: 'document-text' },
    { title: 'Providers', value: '8', change: '2 new this month', color: '#2196F3', icon: 'people' },
    { title: 'ROI Requests', value: '5', change: '1 pending', color: '#FF9800', icon: 'shield-checkmark' },
    { title: 'Total Savings', value: '$2,450', change: '+$180 this month', color: '#9C27B0', icon: 'trending-up' }
  ];

  const quickActions = [
    { title: 'Find Provider', subtitle: 'Search healthcare providers', icon: 'search', color: '#2196F3', action: () => navigation.navigate('Providers') },
    { title: 'Submit Claim', subtitle: 'Upload new claim', icon: 'add-circle', color: '#4CAF50', action: () => navigation.navigate('Claims', { screen: 'ClaimForm' }) },
    { title: 'Create ROI', subtitle: 'Release of information', icon: 'shield-checkmark', color: '#FF9800', action: () => navigation.navigate('ROI', { screen: 'RoiCreate' }) },
    { title: 'View Reports', subtitle: 'Analytics & insights', icon: 'analytics', color: '#9C27B0', action: () => {} }
  ];

  const recentActivity = [
    { id: 1, type: 'claim', title: 'Claim #C-2024-001', status: 'Approved', time: '2 hours ago', amount: '$450' },
    { id: 2, type: 'roi', title: 'ROI Request #R-2024-003', status: 'Completed', time: '1 day ago', amount: null },
    { id: 3, type: 'provider', title: 'Dr. Sarah Johnson', status: 'New Provider Added', time: '3 days ago', amount: null },
    { id: 4, type: 'claim', title: 'Claim #C-2024-002', status: 'Under Review', time: '1 week ago', amount: '$320' }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.userName}>Demo User</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications" size={24} color="#666" />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[
            styles.statCard, 
            { 
              width: isTablet ? (width - 80) / 4 : (width - 60) / 2,
              marginRight: (index + 1) % 2 === 0 ? 0 : 12,
              marginBottom: index < 2 ? 12 : 0
            }
          ]}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <Ionicons name={stat.icon as any} size={isTablet ? 24 : 20} color={stat.color} />
              </View>
              <Text style={[styles.statValue, { fontSize: isTablet ? 24 : 20 }]}>{stat.value}</Text>
            </View>
            <Text style={[styles.statTitle, { fontSize: isTablet ? 16 : 14 }]}>{stat.title}</Text>
            <Text style={[styles.statChange, { fontSize: isTablet ? 14 : 12 }]}>{stat.change}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontSize: isTablet ? 24 : 20 }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.actionCard, 
                { 
                  width: isTablet ? (width - 80) / 4 : (width - 60) / 2,
                  padding: isTablet ? 24 : 20,
                  marginRight: (index + 1) % 2 === 0 ? 0 : 12,
                  marginBottom: index < 2 ? 12 : 0
                }
              ]} 
              onPress={action.action}
            >
              <View style={[styles.actionIcon, { 
                backgroundColor: action.color + '20',
                width: isTablet ? 56 : 48,
                height: isTablet ? 56 : 48
              }]}>
                <Ionicons name={action.icon as any} size={isTablet ? 28 : 24} color={action.color} />
              </View>
              <Text style={[styles.actionTitle, { fontSize: isTablet ? 18 : 16 }]}>{action.title}</Text>
              <Text style={[styles.actionSubtitle, { fontSize: isTablet ? 14 : 12 }]}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontSize: isTablet ? 24 : 20 }]}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { fontSize: isTablet ? 16 : 14 }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activityList}>
          {recentActivity.map((activity) => (
            <View key={activity.id} style={[styles.activityItem, { padding: isTablet ? 20 : 16 }]}>
              <View style={[
                styles.activityIcon, 
                { 
                  backgroundColor: activity.type === 'claim' ? '#4CAF5020' : activity.type === 'roi' ? '#FF980020' : '#2196F320',
                  width: isTablet ? 40 : 32,
                  height: isTablet ? 40 : 32
                }
              ]}>
                <Ionicons 
                  name={activity.type === 'claim' ? 'document-text' : activity.type === 'roi' ? 'shield-checkmark' : 'people'} 
                  size={isTablet ? 20 : 16} 
                  color={activity.type === 'claim' ? '#4CAF50' : activity.type === 'roi' ? '#FF9800' : '#2196F3'} 
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { fontSize: isTablet ? 18 : 16 }]}>{activity.title}</Text>
                <Text style={[styles.activityStatus, { fontSize: isTablet ? 16 : 14 }]}>{activity.status}</Text>
                <Text style={[styles.activityTime, { fontSize: isTablet ? 14 : 12 }]}>{activity.time}</Text>
              </View>
              {activity.amount && (
                <Text style={[styles.activityAmount, { fontSize: isTablet ? 18 : 16 }]}>{activity.amount}</Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: isTablet ? 24 : 20, 
    paddingTop: isTablet ? 16 : 10 
  },
  greeting: { 
    fontSize: isTablet ? 18 : 16, 
    color: '#666', 
    marginBottom: 4 
  },
  userName: { 
    fontSize: isTablet ? 28 : 24, 
    fontWeight: '700', 
    color: '#1a1a1a' 
  },
  notificationBtn: { position: 'relative' },
  badge: { 
    position: 'absolute', 
    top: -2, 
    right: -2, 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#FF5722' 
  },
  statsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingHorizontal: isTablet ? 24 : 20, 
    marginBottom: isTablet ? 40 : 30,
    justifyContent: 'space-between'
  },
  statCard: { 
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: isTablet ? 20 : 16, 
    marginBottom: 12, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  statHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  statIcon: { 
    width: isTablet ? 40 : 32, 
    height: isTablet ? 40 : 32, 
    borderRadius: isTablet ? 10 : 8, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  statValue: { 
    fontSize: isTablet ? 24 : 20, 
    fontWeight: '700', 
    color: '#1a1a1a' 
  },
  statTitle: { 
    fontSize: isTablet ? 16 : 14, 
    color: '#666', 
    marginBottom: 4 
  },
  statChange: { 
    fontSize: isTablet ? 14 : 12, 
    color: '#4CAF50' 
  },
  section: { 
    paddingHorizontal: isTablet ? 24 : 20, 
    marginBottom: isTablet ? 40 : 30 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: isTablet ? 20 : 16 
  },
  sectionTitle: { 
    fontSize: isTablet ? 24 : 20, 
    fontWeight: '700', 
    color: '#1a1a1a' 
  },
  seeAll: { 
    fontSize: isTablet ? 16 : 14, 
    color: '#2196F3', 
    fontWeight: '600' 
  },
  actionsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  actionCard: { 
    backgroundColor: 'white', 
    borderRadius: 12, 
    marginBottom: 12, 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  actionIcon: { 
    borderRadius: isTablet ? 28 : 24, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  actionTitle: { 
    fontWeight: '600', 
    color: '#1a1a1a', 
    marginBottom: 4, 
    textAlign: 'center' 
  },
  actionSubtitle: { 
    color: '#666', 
    textAlign: 'center' 
  },
  activityList: { 
    backgroundColor: 'white', 
    borderRadius: 12, 
    overflow: 'hidden' 
  },
  activityItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' 
  },
  activityIcon: { 
    borderRadius: isTablet ? 20 : 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: isTablet ? 16 : 12 
  },
  activityContent: { flex: 1 },
  activityTitle: { 
    fontWeight: '600', 
    color: '#1a1a1a', 
    marginBottom: 2 
  },
  activityStatus: { 
    color: '#666', 
    marginBottom: 2 
  },
  activityTime: { 
    color: '#999' 
  },
  activityAmount: { 
    fontWeight: '600', 
    color: '#4CAF50' 
  }
});
