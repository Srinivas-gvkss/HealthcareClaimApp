import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallScreen = width < 375;

export default function ProviderDetailsScreen({ route, navigation }: any) {
  const { provider } = route.params || { 
    provider: { 
      name: 'Dr. Unknown', 
      title: 'Physician',
      specialties: ['General Medicine'],
      rating: 4.0,
      reviews: 0,
      experience: '0 years',
      languages: ['English'],
      insurance: ['General Insurance'],
      location: 'Unknown Location',
      priceRange: '$100-200',
      image: '👨‍⚕️',
      availability: 'Contact for availability'
    } 
  };

  const features = [
    { icon: 'time', title: 'Experience', value: provider.experience },
    { icon: 'language', title: 'Languages', value: provider.languages.join(', ') },
    { icon: 'shield-checkmark', title: 'Insurance', value: `${provider.insurance.length} plans accepted` },
    { icon: 'location', title: 'Location', value: provider.location },
    { icon: 'cash', title: 'Price Range', value: provider.priceRange },
    { icon: 'calendar', title: 'Availability', value: provider.availability }
  ];

  const getStatusColor = (availability: string) => {
    if (availability.includes('Today')) return '#4CAF50';
    if (availability.includes('Tomorrow')) return '#FF9800';
    return '#2196F3';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { padding: isTablet ? 24 : 20 }]}>
        <View style={[styles.providerImage, { 
          width: isTablet ? 100 : 80, 
          height: isTablet ? 100 : 80,
          borderRadius: isTablet ? 50 : 40
        }]}>
          <Text style={[styles.providerEmoji, { fontSize: isTablet ? 40 : 32 }]}>{provider.image}</Text>
        </View>
        <View style={styles.providerInfo}>
          <Text style={[styles.providerName, { fontSize: isTablet ? 28 : 24 }]}>{provider.name}</Text>
          <Text style={[styles.providerTitle, { fontSize: isTablet ? 18 : 16 }]}>{provider.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={isTablet ? 20 : 16} color="#FFD700" />
            <Text style={[styles.rating, { fontSize: isTablet ? 18 : 16 }]}>{provider.rating}</Text>
            <Text style={[styles.reviews, { fontSize: isTablet ? 16 : 14 }]}>({provider.reviews} reviews)</Text>
          </View>
        </View>
        <View style={[styles.availabilityBadge, { 
          backgroundColor: getStatusColor(provider.availability) + '20',
          paddingHorizontal: isTablet ? 16 : 12,
          paddingVertical: isTablet ? 8 : 6
        }]}>
          <Text style={[styles.availabilityText, { 
            color: getStatusColor(provider.availability),
            fontSize: isTablet ? 14 : 12
          }]}>
            {provider.availability}
          </Text>
        </View>
      </View>

      {/* Specialties */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specialties</Text>
        <View style={styles.specialtiesContainer}>
          {provider.specialties.map((specialty: string, index: number) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyTagText}>{specialty}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Provider Information</Text>
        <View style={styles.featuresList}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon as any} size={20} color="#2196F3" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureValue}>{feature.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Insurance Plans */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accepted Insurance Plans</Text>
        <View style={styles.insuranceContainer}>
          {provider.insurance.map((plan: string, index: number) => (
            <View key={index} style={styles.insuranceTag}>
              <Text style={styles.insuranceText}>{plan}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => alert('Authorization flow (not implemented in demo)')}
        >
          <Ionicons name="shield-checkmark" size={20} color="white" />
          <Text style={styles.primaryButtonText}>Request Authorization</Text>
        </TouchableOpacity>
        
        <View style={styles.secondaryButtons}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="call" size={20} color="#2196F3" />
            <Text style={styles.secondaryButtonText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="calendar" size={20} color="#2196F3" />
            <Text style={styles.secondaryButtonText}>Book</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="heart" size={20} color="#2196F3" />
            <Text style={styles.secondaryButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Reviews</Text>
        <View style={styles.reviewsList}>
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Sarah M.</Text>
              <View style={styles.reviewRating}>
                {[1,2,3,4,5].map((star) => (
                  <Ionicons key={star} name="star" size={14} color="#FFD700" />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Excellent care and very professional. Dr. Johnson took the time to explain everything clearly."
            </Text>
            <Text style={styles.reviewDate}>2 weeks ago</Text>
          </View>
          
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Michael R.</Text>
              <View style={styles.reviewRating}>
                {[1,2,3,4,5].map((star) => (
                  <Ionicons key={star} name="star" size={14} color="#FFD700" />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Great experience, very knowledgeable and friendly staff."
            </Text>
            <Text style={styles.reviewDate}>1 month ago</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { 
    backgroundColor: 'white', 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  providerImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: '#f0f0f0', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 16 
  },
  providerEmoji: { fontSize: 32 },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 24, fontWeight: '700', color: '#1a1a1a', marginBottom: 4 },
  providerTitle: { fontSize: 16, color: '#666', marginBottom: 8 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginLeft: 4 },
  reviews: { fontSize: 14, color: '#666', marginLeft: 4 },
  availabilityBadge: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 16 
  },
  availabilityText: { fontSize: 12, fontWeight: '600' },
  section: { 
    backgroundColor: 'white', 
    marginTop: 12, 
    padding: 20 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1a1a1a', 
    marginBottom: 16 
  },
  specialtiesContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  specialtyTag: { 
    backgroundColor: '#e3f2fd', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 16, 
    marginRight: 8, 
    marginBottom: 8 
  },
  specialtyTagText: { fontSize: 14, color: '#2196F3', fontWeight: '500' },
  featuresList: { marginTop: -8 },
  featureItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' 
  },
  featureIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#e3f2fd', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  featureContent: { flex: 1 },
  featureTitle: { fontSize: 14, color: '#666', marginBottom: 2 },
  featureValue: { fontSize: 16, fontWeight: '600', color: '#1a1a1a' },
  insuranceContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  insuranceTag: { 
    backgroundColor: '#f0f0f0', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 12, 
    marginRight: 8, 
    marginBottom: 8 
  },
  insuranceText: { fontSize: 14, color: '#666' },
  actionSection: { padding: 20 },
  primaryButton: { 
    backgroundColor: '#2196F3', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 16, 
    borderRadius: 12, 
    marginBottom: 16 
  },
  primaryButtonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600', 
    marginLeft: 8 
  },
  secondaryButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  secondaryButton: { 
    backgroundColor: 'white', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#e0e0e0',
    flex: 1,
    marginHorizontal: 4
  },
  secondaryButtonText: { 
    color: '#2196F3', 
    fontSize: 14, 
    fontWeight: '600', 
    marginLeft: 4 
  },
  reviewsList: { marginTop: -8 },
  reviewItem: { 
    paddingVertical: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' 
  },
  reviewHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  reviewerName: { fontSize: 16, fontWeight: '600', color: '#1a1a1a' },
  reviewRating: { flexDirection: 'row' },
  reviewText: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 4 },
  reviewDate: { fontSize: 12, color: '#999' }
});
