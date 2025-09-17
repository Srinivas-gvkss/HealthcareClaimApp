import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MOCK_PROVIDERS = [
  { 
    id: 'p1', 
    name: 'Dr. Sarah Johnson', 
    title: 'Cardiologist',
    specialties: ['Cardiology', 'Internal Medicine'],
    rating: 4.8,
    reviews: 124,
    distance: '0.8 miles',
    availability: 'Available Today',
    priceRange: '$200-300',
    image: '👩‍⚕️',
    location: 'Central Medical Center',
    experience: '15 years',
    languages: ['English', 'Spanish'],
    insurance: ['Blue Cross', 'Aetna', 'Cigna']
  },
  { 
    id: 'p2', 
    name: 'Dr. Michael Chen', 
    title: 'Orthopedic Surgeon',
    specialties: ['Orthopedics', 'Sports Medicine'],
    rating: 4.9,
    reviews: 89,
    distance: '1.2 miles',
    availability: 'Available Tomorrow',
    priceRange: '$300-400',
    image: '👨‍⚕️',
    location: 'Eastside Health Center',
    experience: '12 years',
    languages: ['English', 'Mandarin'],
    insurance: ['Blue Cross', 'UnitedHealth', 'Medicare']
  },
  { 
    id: 'p3', 
    name: 'Dr. Emily Rodriguez', 
    title: 'Dermatologist',
    specialties: ['Dermatology', 'Cosmetic Surgery'],
    rating: 4.7,
    reviews: 156,
    distance: '2.1 miles',
    availability: 'Available This Week',
    priceRange: '$150-250',
    image: '👩‍⚕️',
    location: 'Westside Dermatology',
    experience: '8 years',
    languages: ['English', 'Spanish'],
    insurance: ['Aetna', 'Cigna', 'Kaiser']
  },
  { 
    id: 'p4', 
    name: 'Dr. James Wilson', 
    title: 'Neurologist',
    specialties: ['Neurology', 'Headache Medicine'],
    rating: 4.6,
    reviews: 67,
    distance: '1.5 miles',
    availability: 'Available Next Week',
    priceRange: '$250-350',
    image: '👨‍⚕️',
    location: 'Northside Neurology',
    experience: '20 years',
    languages: ['English'],
    insurance: ['Blue Cross', 'UnitedHealth', 'Medicare']
  },
  { 
    id: 'p5', 
    name: 'Dr. Lisa Park', 
    title: 'Pediatrician',
    specialties: ['Pediatrics', 'Adolescent Medicine'],
    rating: 4.9,
    reviews: 203,
    distance: '0.5 miles',
    availability: 'Available Today',
    priceRange: '$180-280',
    image: '👩‍⚕️',
    location: 'Children\'s Health Center',
    experience: '10 years',
    languages: ['English', 'Korean'],
    insurance: ['Blue Cross', 'Aetna', 'Cigna', 'Medicaid']
  }
];

export default function ProviderSearchScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [results, setResults] = useState(MOCK_PROVIDERS);

  const specialties = ['All', 'Cardiology', 'Orthopedics', 'Dermatology', 'Neurology', 'Pediatrics'];

  function onSearch() {
    const filtered = MOCK_PROVIDERS.filter(provider => 
      (provider.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       provider.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      (selectedSpecialty === 'All' || provider.specialties.includes(selectedSpecialty))
    );
    setResults(filtered);
  }

  const getStatusColor = (availability: string) => {
    if (availability.includes('Today')) return '#4CAF50';
    if (availability.includes('Tomorrow')) return '#FF9800';
    return '#2196F3';
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search providers by name or specialty" 
            value={searchQuery} 
            onChangeText={setSearchQuery}
            onSubmitEditing={onSearch}
          />
          <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
            <Ionicons name="arrow-forward" size={20} color="#2196F3" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Specialty Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specialtyContainer}>
        {specialties.map((specialty) => (
          <TouchableOpacity
            key={specialty}
            style={[
              styles.specialtyChip,
              selectedSpecialty === specialty && styles.specialtyChipActive
            ]}
            onPress={() => {
              setSelectedSpecialty(specialty);
              onSearch();
            }}
          >
            <Text style={[
              styles.specialtyText,
              selectedSpecialty === specialty && styles.specialtyTextActive
            ]}>
              {specialty}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{results.length} providers found</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={16} color="#666" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Providers List */}
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.providerCard} 
            onPress={() => navigation.navigate('ProviderDetails', { provider: item })}
          >
            <View style={styles.providerHeader}>
              <View style={styles.providerImage}>
                <Text style={styles.providerEmoji}>{item.image}</Text>
              </View>
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{item.name}</Text>
                <Text style={styles.providerTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.rating}>{item.rating}</Text>
                  <Text style={styles.reviews}>({item.reviews} reviews)</Text>
                </View>
              </View>
              <View style={styles.providerMeta}>
                <View style={[styles.availabilityBadge, { backgroundColor: getStatusColor(item.availability) + '20' }]}>
                  <Text style={[styles.availabilityText, { color: getStatusColor(item.availability) }]}>
                    {item.availability}
                  </Text>
                </View>
                <Text style={styles.distance}>{item.distance}</Text>
              </View>
            </View>

            <View style={styles.specialtiesContainer}>
              {item.specialties.map((specialty, index) => (
                <View key={index} style={styles.specialtyTag}>
                  <Text style={styles.specialtyTagText}>{specialty}</Text>
                </View>
              ))}
            </View>

            <View style={styles.providerFooter}>
              <View style={styles.footerItem}>
                <Ionicons name="location" size={14} color="#666" />
                <Text style={styles.footerText}>{item.location}</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="time" size={14} color="#666" />
                <Text style={styles.footerText}>{item.experience} experience</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="cash" size={14} color="#666" />
                <Text style={styles.footerText}>{item.priceRange}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  searchHeader: { backgroundColor: 'white', padding: 16, paddingBottom: 8 },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5', 
    borderRadius: 12, 
    paddingHorizontal: 12,
    height: 48
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#1a1a1a' },
  searchButton: { padding: 4 },
  specialtyContainer: { paddingHorizontal: 16, paddingVertical: 8 },
  specialtyChip: { 
    backgroundColor: 'white', 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  specialtyChipActive: { backgroundColor: '#2196F3', borderColor: '#2196F3' },
  specialtyText: { fontSize: 14, color: '#666' },
  specialtyTextActive: { color: 'white', fontWeight: '600' },
  resultsHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 12 
  },
  resultsCount: { fontSize: 16, fontWeight: '600', color: '#1a1a1a' },
  filterButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    backgroundColor: 'white', 
    borderRadius: 8 
  },
  filterText: { marginLeft: 4, fontSize: 14, color: '#666' },
  providerCard: { 
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
  providerHeader: { flexDirection: 'row', marginBottom: 12 },
  providerImage: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#f0f0f0', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  providerEmoji: { fontSize: 24 },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 2 },
  providerTitle: { fontSize: 14, color: '#666', marginBottom: 4 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginLeft: 4 },
  reviews: { fontSize: 12, color: '#666', marginLeft: 4 },
  providerMeta: { alignItems: 'flex-end' },
  availabilityBadge: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12, 
    marginBottom: 4 
  },
  availabilityText: { fontSize: 12, fontWeight: '600' },
  distance: { fontSize: 12, color: '#666' },
  specialtiesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  specialtyTag: { 
    backgroundColor: '#e3f2fd', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12, 
    marginRight: 6, 
    marginBottom: 4 
  },
  specialtyTagText: { fontSize: 12, color: '#2196F3', fontWeight: '500' },
  providerFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingTop: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#f0f0f0' 
  },
  footerItem: { flexDirection: 'row', alignItems: 'center' },
  footerText: { marginLeft: 4, fontSize: 12, color: '#666' }
});
