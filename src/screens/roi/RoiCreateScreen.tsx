import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function RoiCreateScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    purpose: '',
    recipientName: '',
    recipientEmail: '',
    category: '',
    description: '',
    recordsRequested: [] as string[],
    expiryDate: '',
    specialInstructions: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const categories = [
    'Insurance Claim',
    'Provider Transfer',
    'Legal Documentation',
    'Research Study',
    'Personal Use',
    'Second Opinion',
    'Disability Claim',
    'Other'
  ];

  const recordTypes = [
    'Medical Records',
    'Lab Results',
    'Imaging Reports',
    'Prescription History',
    'Emergency Records',
    'Surgical Reports',
    'Mental Health Records',
    'Immunization Records',
    'All Records'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRecordToggle = (recordType: string) => {
    setFormData(prev => ({
      ...prev,
      recordsRequested: prev.recordsRequested.includes(recordType)
        ? prev.recordsRequested.filter(r => r !== recordType)
        : [...prev.recordsRequested, recordType]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = () => {
    Alert.alert(
      'ROI Created Successfully',
      'Your Release of Information request has been created and is being processed. You will receive a confirmation email with next steps.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Basic Information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Purpose of Release *</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe the purpose for releasing information"
          value={formData.purpose}
          onChangeText={(value) => handleInputChange('purpose', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category *</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                formData.category === category && styles.categoryChipActive
              ]}
              onPress={() => handleInputChange('category', category)}
            >
              <Text style={[
                styles.categoryText,
                formData.category === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Additional details about the request"
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Recipient Information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Recipient Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient name or organization"
          value={formData.recipientName}
          onChangeText={(value) => handleInputChange('recipientName', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="recipient@example.com"
          keyboardType="email-address"
          value={formData.recipientEmail}
          onChangeText={(value) => handleInputChange('recipientEmail', value)}
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Records to Release</Text>
      
      <Text style={styles.sectionSubtitle}>Select the types of records to include:</Text>
      <View style={styles.recordsContainer}>
        {recordTypes.map((recordType) => (
          <TouchableOpacity
            key={recordType}
            style={[
              styles.recordChip,
              formData.recordsRequested.includes(recordType) && styles.recordChipActive
            ]}
            onPress={() => handleRecordToggle(recordType)}
          >
            <Ionicons 
              name={formData.recordsRequested.includes(recordType) ? "checkmark-circle" : "ellipse-outline"} 
              size={20} 
              color={formData.recordsRequested.includes(recordType) ? "#4CAF50" : "#666"} 
            />
            <Text style={[
              styles.recordText,
              formData.recordsRequested.includes(recordType) && styles.recordTextActive
            ]}>
              {recordType}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Expiry Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD (max 6 months from today)"
          value={formData.expiryDate}
          onChangeText={(value) => handleInputChange('expiryDate', value)}
        />
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Review & Signature</Text>
      
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>ROI Summary</Text>
        
        <View style={styles.summarySection}>
          <Text style={styles.summarySectionTitle}>Purpose</Text>
          <Text style={styles.summaryValue}>{formData.purpose || 'Not specified'}</Text>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summarySectionTitle}>Recipient</Text>
          <Text style={styles.summaryValue}>{formData.recipientName || 'Not specified'}</Text>
          {formData.recipientEmail && (
            <Text style={styles.summarySubValue}>{formData.recipientEmail}</Text>
          )}
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summarySectionTitle}>Records Requested</Text>
          <Text style={styles.summaryValue}>
            {formData.recordsRequested.length > 0 
              ? formData.recordsRequested.join(', ') 
              : 'No records selected'
            }
          </Text>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summarySectionTitle}>Expiry Date</Text>
          <Text style={styles.summaryValue}>{formData.expiryDate || 'Not specified'}</Text>
        </View>
      </View>

      <View style={styles.signatureSection}>
        <Text style={styles.signatureTitle}>Digital Signature Required</Text>
        <Text style={styles.signatureDescription}>
          By creating this ROI, you acknowledge that you are authorized to release these medical records and understand the implications of this action.
        </Text>
        
        <TouchableOpacity style={styles.signatureButton}>
          <Ionicons name="create" size={20} color="#2196F3" />
          <Text style={styles.signatureButtonText}>Capture Signature</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.consentSection}>
        <TouchableOpacity style={styles.consentCheckbox}>
          <Ionicons name="checkbox" size={20} color="#4CAF50" />
          <Text style={styles.consentText}>
            I understand and agree to the terms of this Release of Information request
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Create ROI</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
            <Ionicons name="arrow-back" size={20} color="#2196F3" />
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.navigationSpacer} />
        
        {currentStep < totalSteps ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Ionicons name="shield-checkmark" size={20} color="white" />
            <Text style={styles.createButtonText}>Create ROI</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  backButton: { padding: 4 },
  title: { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },
  placeholder: { width: 32 },
  progressContainer: { 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: 'white' 
  },
  progressBar: { 
    height: 4, 
    backgroundColor: '#e0e0e0', 
    borderRadius: 2, 
    marginBottom: 8 
  },
  progressFill: { 
    height: '100%', 
    backgroundColor: '#2196F3', 
    borderRadius: 2 
  },
  progressText: { 
    fontSize: 12, 
    color: '#666', 
    textAlign: 'center' 
  },
  content: { flex: 1, padding: 16 },
  stepContainer: { marginBottom: 20 },
  stepTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#1a1a1a', 
    marginBottom: 20 
  },
  sectionSubtitle: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 16 
  },
  inputGroup: { marginBottom: 20 },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1a1a1a', 
    marginBottom: 8 
  },
  input: { 
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    paddingVertical: 12, 
    fontSize: 16, 
    color: '#1a1a1a' 
  },
  textArea: { 
    height: 100, 
    textAlignVertical: 'top' 
  },
  categoryContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' 
  },
  categoryChip: { 
    backgroundColor: '#f5f5f5', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 16, 
    marginRight: 8, 
    marginBottom: 8 
  },
  categoryChipActive: { backgroundColor: '#2196F3' },
  categoryText: { fontSize: 14, color: '#666' },
  categoryTextActive: { color: 'white', fontWeight: '600' },
  recordsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 20 
  },
  recordChip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 8, 
    marginRight: 8, 
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  recordChipActive: { 
    backgroundColor: '#e3f2fd', 
    borderColor: '#2196F3' 
  },
  recordText: { 
    marginLeft: 8, 
    fontSize: 14, 
    color: '#666' 
  },
  recordTextActive: { 
    color: '#2196F3', 
    fontWeight: '500' 
  },
  summaryCard: { 
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  summaryTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1a1a1a', 
    marginBottom: 16 
  },
  summarySection: { 
    marginBottom: 12 
  },
  summarySectionTitle: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#666', 
    marginBottom: 4 
  },
  summaryValue: { 
    fontSize: 16, 
    color: '#1a1a1a' 
  },
  summarySubValue: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 2 
  },
  signatureSection: { 
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 20 
  },
  signatureTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1a1a1a', 
    marginBottom: 8 
  },
  signatureDescription: { 
    fontSize: 14, 
    color: '#666', 
    lineHeight: 20, 
    marginBottom: 16 
  },
  signatureButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#f0f8ff', 
    borderWidth: 2, 
    borderColor: '#2196F3', 
    borderStyle: 'dashed', 
    borderRadius: 8, 
    paddingVertical: 20, 
    paddingHorizontal: 12 
  },
  signatureButtonText: { 
    marginLeft: 8, 
    fontSize: 16, 
    color: '#2196F3', 
    fontWeight: '500' 
  },
  consentSection: { 
    marginBottom: 20 
  },
  consentCheckbox: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  consentText: { 
    marginLeft: 8, 
    fontSize: 14, 
    color: '#666', 
    flex: 1 
  },
  navigationContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 16, 
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  previousButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 16 
  },
  previousButtonText: { 
    marginLeft: 4, 
    fontSize: 16, 
    color: '#2196F3', 
    fontWeight: '600' 
  },
  navigationSpacer: { flex: 1 },
  nextButton: { 
    backgroundColor: '#2196F3', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 8 
  },
  nextButtonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600', 
    marginRight: 4 
  },
  createButton: { 
    backgroundColor: '#4CAF50', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 8 
  },
  createButtonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600', 
    marginLeft: 4 
  }
});