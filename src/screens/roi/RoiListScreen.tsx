import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MOCK_ROI = [
  { 
    id: 'r1', 
    roiNumber: 'ROI-2024-001',
    purpose: 'Insurance Claim Processing', 
    status: 'Active',
    recipient: 'Blue Cross Blue Shield',
    createdDate: '2024-01-15',
    expiryDate: '2024-07-15',
    recordsCount: 15,
    description: 'Medical records for claim #C-2024-001',
    category: 'Insurance',
    lastAccessed: '2024-01-20'
  },
  { 
    id: 'r2', 
    roiNumber: 'ROI-2024-002',
    purpose: 'Records Transfer to New Provider', 
    status: 'Completed',
    recipient: 'Dr. Sarah Johnson - Central Clinic',
    createdDate: '2024-01-10',
    expiryDate: '2024-04-10',
    recordsCount: 8,
    description: 'Transfer of medical history and test results',
    category: 'Provider Transfer',
    lastAccessed: '2024-01-12'
  },
  { 
    id: 'r3', 
    roiNumber: 'ROI-2024-003',
    purpose: 'Legal Documentation', 
    status: 'Expired',
    recipient: 'Smith & Associates Law Firm',
    createdDate: '2023-12-01',
    expiryDate: '2024-01-01',
    recordsCount: 25,
    description: 'Medical records for personal injury case',
    category: 'Legal',
    lastAccessed: '2023-12-15'
  },
  { 
    id: 'r4', 
    roiNumber: 'ROI-2024-004',
    purpose: 'Second Opinion Consultation', 
    status: 'Pending',
    recipient: 'Dr. Michael Chen - Eastside Health',
    createdDate: '2024-01-22',
    expiryDate: '2024-04-22',
    recordsCount: 12,
    description: 'Records for second opinion on treatment plan',
    category: 'Consultation',
    lastAccessed: null
  },
  { 
    id: 'r5', 
    roiNumber: 'ROI-2024-005',
    purpose: 'Research Study Participation', 
    status: 'Revoked',
    recipient: 'University Medical Research Center',
    createdDate: '2024-01-05',
    expiryDate: '2024-07-05',
    recordsCount: 30,
    description: 'Anonymized data for clinical research study',
    category: 'Research',
    lastAccessed: '2024-01-18'
  }
];

export default function RoiListScreen({ navigation }: any) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Active', 'Pending', 'Completed', 'Expired', 'Revoked'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#4CAF50';
      case 'Completed': return '#4CAF50';
      case 'Pending': return '#FF9800';
      case 'Expired': return '#F44336';
      case 'Revoked': return '#9E9E9E';
      default: return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return 'checkmark-circle';
      case 'Completed': return 'checkmark-circle';
      case 'Pending': return 'time';
      case 'Expired': return 'close-circle';
      case 'Revoked': return 'ban';
      default: return 'help-circle';
    }
  };

  const filteredROI = selectedFilter === 'All' 
    ? MOCK_ROI 
    : MOCK_ROI.filter(roi => roi.status === selectedFilter);

  const activeCount = MOCK_ROI.filter(roi => roi.status === 'Active').length;
  const pendingCount = MOCK_ROI.filter(roi => roi.status === 'Pending').length;
  const totalRecords = MOCK_ROI.reduce((sum, roi) => sum + roi.recordsCount, 0);

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{MOCK_ROI.length}</Text>
          <Text style={styles.statLabel}>Total ROI</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activeCount}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalRecords}</Text>
          <Text style={styles.statLabel}>Records</Text>
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('RoiCreate')}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.createButtonText}>Create New ROI</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipActive
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.filterTextActive
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ROI List */}
      <FlatList
        data={filteredROI}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.roiCard}>
            <View style={styles.roiHeader}>
              <View style={styles.roiInfo}>
                <Text style={styles.roiNumber}>{item.roiNumber}</Text>
                <Text style={styles.purpose}>{item.purpose}</Text>
                <Text style={styles.recipient}>To: {item.recipient}</Text>
              </View>
              <View style={styles.roiMeta}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                  <Ionicons name={getStatusIcon(item.status) as any} size={14} color={getStatusColor(item.status)} />
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status}
                  </Text>
                </View>
                <Text style={styles.recordsCount}>{item.recordsCount} records</Text>
              </View>
            </View>

            <View style={styles.roiDetails}>
              <Text style={styles.description}>{item.description}</Text>
              
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar" size={14} color="#666" />
                  <Text style={styles.detailText}>Created: {item.createdDate}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="time" size={14} color="#666" />
                  <Text style={styles.detailText}>Expires: {item.expiryDate}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="pricetag" size={14} color="#666" />
                  <Text style={styles.detailText}>{item.category}</Text>
                </View>
                {item.lastAccessed && (
                  <View style={styles.detailItem}>
                    <Ionicons name="eye" size={14} color="#666" />
                    <Text style={styles.detailText}>Last accessed: {item.lastAccessed}</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.roiActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="eye" size={16} color="#2196F3" />
                <Text style={styles.actionText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="download" size={16} color="#2196F3" />
                <Text style={styles.actionText}>Download</Text>
              </TouchableOpacity>
              {item.status === 'Active' && (
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="pause" size={16} color="#FF9800" />
                  <Text style={styles.actionText}>Pause</Text>
                </TouchableOpacity>
              )}
              {item.status === 'Active' && (
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="close" size={16} color="#F44336" />
                  <Text style={styles.actionText}>Revoke</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  statsContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    paddingVertical: 16, 
    backgroundColor: 'white',
    marginBottom: 8
  },
  statCard: { 
    flex: 1, 
    alignItems: 'center', 
    paddingVertical: 12 
  },
  statValue: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#1a1a1a', 
    marginBottom: 4 
  },
  statLabel: { 
    fontSize: 12, 
    color: '#666', 
    textAlign: 'center' 
  },
  actionContainer: { 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: 'white' 
  },
  createButton: { 
    backgroundColor: '#2196F3', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 16, 
    borderRadius: 12 
  },
  createButtonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600', 
    marginLeft: 8 
  },
  filterContainer: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    backgroundColor: 'white' 
  },
  filterChip: { 
    backgroundColor: '#f5f5f5', 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    marginRight: 8 
  },
  filterChipActive: { backgroundColor: '#2196F3' },
  filterText: { fontSize: 14, color: '#666' },
  filterTextActive: { color: 'white', fontWeight: '600' },
  roiCard: { 
    backgroundColor: 'white', 
    marginHorizontal: 16, 
    marginBottom: 12, 
    borderRadius: 12, 
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  roiHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12 
  },
  roiInfo: { flex: 1, marginRight: 12 },
  roiNumber: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1a1a1a', 
    marginBottom: 4 
  },
  purpose: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 4 
  },
  recipient: { 
    fontSize: 12, 
    color: '#999' 
  },
  roiMeta: { alignItems: 'flex-end' },
  statusBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12, 
    marginBottom: 8 
  },
  statusText: { 
    fontSize: 12, 
    fontWeight: '600', 
    marginLeft: 4 
  },
  recordsCount: { 
    fontSize: 12, 
    color: '#666' 
  },
  roiDetails: { 
    marginBottom: 12, 
    paddingTop: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#f0f0f0' 
  },
  description: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 12, 
    lineHeight: 20 
  },
  detailRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8 
  },
  detailItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1 
  },
  detailText: { 
    marginLeft: 6, 
    fontSize: 12, 
    color: '#666' 
  },
  roiActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingTop: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#f0f0f0' 
  },
  actionButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 8, 
    paddingHorizontal: 12 
  },
  actionText: { 
    marginLeft: 4, 
    fontSize: 14, 
    color: '#2196F3', 
    fontWeight: '500' 
  }
});
