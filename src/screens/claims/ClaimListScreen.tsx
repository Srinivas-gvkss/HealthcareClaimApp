import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MOCK_CLAIMS = [
  { 
    id: 'c1', 
    claimNumber: 'C-2024-001',
    provider: 'Dr. Sarah Johnson - Central Clinic', 
    status: 'Approved',
    amount: '$450.00',
    date: '2024-01-15',
    type: 'Medical Consultation',
    description: 'Cardiology consultation and EKG',
    submittedDate: '2024-01-10',
    processedDate: '2024-01-15',
    category: 'Specialist Visit'
  },
  { 
    id: 'c2', 
    claimNumber: 'C-2024-002',
    provider: 'Eastside Health Center', 
    status: 'Under Review',
    amount: '$320.00',
    date: '2024-01-12',
    type: 'Lab Tests',
    description: 'Blood work and urinalysis',
    submittedDate: '2024-01-12',
    processedDate: null,
    category: 'Laboratory'
  },
  { 
    id: 'c3', 
    claimNumber: 'C-2024-003',
    provider: 'Westside Imaging', 
    status: 'Paid',
    amount: '$180.00',
    date: '2024-01-08',
    type: 'Diagnostic Imaging',
    description: 'X-ray of right shoulder',
    submittedDate: '2024-01-08',
    processedDate: '2024-01-10',
    category: 'Imaging'
  },
  { 
    id: 'c4', 
    claimNumber: 'C-2024-004',
    provider: 'Northside Pharmacy', 
    status: 'Rejected',
    amount: '$85.00',
    date: '2024-01-05',
    type: 'Prescription',
    description: 'Medication not covered',
    submittedDate: '2024-01-05',
    processedDate: '2024-01-07',
    category: 'Pharmacy'
  },
  { 
    id: 'c5', 
    claimNumber: 'C-2024-005',
    provider: 'Emergency Care Center', 
    status: 'Processing',
    amount: '$1,200.00',
    date: '2024-01-20',
    type: 'Emergency Visit',
    description: 'Emergency room visit for chest pain',
    submittedDate: '2024-01-20',
    processedDate: null,
    category: 'Emergency'
  }
];

export default function ClaimListScreen({ navigation }: any) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Approved', 'Under Review', 'Processing', 'Paid', 'Rejected'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return '#4CAF50';
      case 'Paid': return '#4CAF50';
      case 'Under Review': return '#FF9800';
      case 'Processing': return '#2196F3';
      case 'Rejected': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return 'checkmark-circle';
      case 'Paid': return 'checkmark-circle';
      case 'Under Review': return 'time';
      case 'Processing': return 'refresh';
      case 'Rejected': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const filteredClaims = selectedFilter === 'All' 
    ? MOCK_CLAIMS 
    : MOCK_CLAIMS.filter(claim => claim.status === selectedFilter);

  const totalAmount = MOCK_CLAIMS.reduce((sum, claim) => {
    const amount = parseFloat(claim.amount.replace('$', '').replace(',', ''));
    return sum + amount;
  }, 0);

  const approvedAmount = MOCK_CLAIMS
    .filter(claim => claim.status === 'Approved' || claim.status === 'Paid')
    .reduce((sum, claim) => {
      const amount = parseFloat(claim.amount.replace('$', '').replace(',', ''));
      return sum + amount;
    }, 0);

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{MOCK_CLAIMS.length}</Text>
          <Text style={styles.statLabel}>Total Claims</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${totalAmount.toFixed(0)}</Text>
          <Text style={styles.statLabel}>Total Amount</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${approvedAmount.toFixed(0)}</Text>
          <Text style={styles.statLabel}>Approved</Text>
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => navigation.navigate('ClaimForm')}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.submitButtonText}>Submit New Claim</Text>
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

      {/* Claims List */}
      <FlatList
        data={filteredClaims}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.claimCard}>
            <View style={styles.claimHeader}>
              <View style={styles.claimInfo}>
                <Text style={styles.claimNumber}>{item.claimNumber}</Text>
                <Text style={styles.providerName}>{item.provider}</Text>
                <Text style={styles.claimDescription}>{item.description}</Text>
              </View>
              <View style={styles.claimMeta}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                  <Ionicons name={getStatusIcon(item.status) as any} size={14} color={getStatusColor(item.status)} />
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status}
                  </Text>
                </View>
                <Text style={styles.claimAmount}>{item.amount}</Text>
              </View>
            </View>

            <View style={styles.claimDetails}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar" size={14} color="#666" />
                  <Text style={styles.detailText}>Submitted: {item.submittedDate}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="pricetag" size={14} color="#666" />
                  <Text style={styles.detailText}>{item.category}</Text>
                </View>
              </View>
              
              {item.processedDate && (
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                    <Text style={styles.detailText}>Processed: {item.processedDate}</Text>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.claimActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="eye" size={16} color="#2196F3" />
                <Text style={styles.actionText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="download" size={16} color="#2196F3" />
                <Text style={styles.actionText}>Download</Text>
              </TouchableOpacity>
              {item.status === 'Rejected' && (
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="refresh" size={16} color="#FF9800" />
                  <Text style={styles.actionText}>Resubmit</Text>
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
  submitButton: { 
    backgroundColor: '#2196F3', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 16, 
    borderRadius: 12 
  },
  submitButtonText: { 
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
  claimCard: { 
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
  claimHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12 
  },
  claimInfo: { flex: 1, marginRight: 12 },
  claimNumber: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1a1a1a', 
    marginBottom: 4 
  },
  providerName: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 4 
  },
  claimDescription: { 
    fontSize: 12, 
    color: '#999' 
  },
  claimMeta: { alignItems: 'flex-end' },
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
  claimAmount: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1a1a1a' 
  },
  claimDetails: { 
    marginBottom: 12, 
    paddingTop: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#f0f0f0' 
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
  claimActions: { 
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
