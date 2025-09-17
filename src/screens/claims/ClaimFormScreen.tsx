import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView, Alert, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallScreen = width < 375;

export default function ClaimFormScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    providerName: '',
    providerId: '',
    amount: '',
    serviceDate: '',
    category: '',
    description: '',
    diagnosisCode: '',
    notes: '',
    attachments: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const categories = [
    'Medical Consultation',
    'Laboratory Tests',
    'Diagnostic Imaging',
    'Emergency Visit',
    'Prescription',
    'Surgery',
    'Physical Therapy',
    'Mental Health',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const handleSubmit = () => {
    Alert.alert(
      'Claim Submitted Successfully',
      'Your claim has been submitted and is being processed. You will receive a confirmation email shortly.',
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
      <Text style={styles.stepTitle}>Provider Information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { fontSize: isTablet ? 18 : 16 }]}>Provider Name *</Text>
        <TextInput
          style={[styles.input, { fontSize: isTablet ? 18 : 16, height: isTablet ? 56 : 48 }]}
          placeholder="Enter provider name"
          value={formData.providerName}
          onChangeText={(value) => handleInputChange('providerName', value)}
          returnKeyType="next"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { fontSize: isTablet ? 18 : 16 }]}>Provider ID</Text>
        <TextInput
          style={[styles.input, { fontSize: isTablet ? 18 : 16, height: isTablet ? 56 : 48 }]}
          placeholder="Enter provider ID (optional)"
          value={formData.providerId}
          onChangeText={(value) => handleInputChange('providerId', value)}
          returnKeyType="next"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { fontSize: isTablet ? 18 : 16 }]}>Service Date *</Text>
        <TextInput
          style={[styles.input, { fontSize: isTablet ? 18 : 16, height: isTablet ? 56 : 48 }]}
          placeholder="YYYY-MM-DD"
          value={formData.serviceDate}
          onChangeText={(value) => handleInputChange('serviceDate', value)}
          returnKeyType="done"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Service Details</Text>
      
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
        <Text style={styles.label}>Amount *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={formData.amount}
          onChangeText={(value) => handleInputChange('amount', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the service received"
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Diagnosis Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ICD-10 code (optional)"
          value={formData.diagnosisCode}
          onChangeText={(value) => handleInputChange('diagnosisCode', value)}
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Additional Information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any additional notes or comments"
          multiline
          numberOfLines={4}
          value={formData.notes}
          onChangeText={(value) => handleInputChange('notes', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Attachments</Text>
        <TouchableOpacity style={styles.attachmentButton}>
          <Ionicons name="attach" size={20} color="#2196F3" />
          <Text style={styles.attachmentText}>Add Receipt or Document</Text>
        </TouchableOpacity>
        <Text style={styles.attachmentHint}>Upload receipts, invoices, or supporting documents</Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Claim Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Provider:</Text>
          <Text style={styles.summaryValue}>{formData.providerName || 'Not specified'}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Amount:</Text>
          <Text style={styles.summaryValue}>${formData.amount || '0.00'}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Category:</Text>
          <Text style={styles.summaryValue}>{formData.category || 'Not specified'}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service Date:</Text>
          <Text style={styles.summaryValue}>{formData.serviceDate || 'Not specified'}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontSize: isTablet ? 20 : 18 }]}>Submit New Claim</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
        </View>
        <Text style={[styles.progressText, { fontSize: isTablet ? 14 : 12 }]}>Step {currentStep} of {totalSteps}</Text>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
            <Ionicons name="arrow-back" size={isTablet ? 24 : 20} color="#2196F3" />
            <Text style={[styles.previousButtonText, { fontSize: isTablet ? 18 : 16 }]}>Previous</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.navigationSpacer} />
        
        {currentStep < totalSteps ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={[styles.nextButtonText, { fontSize: isTablet ? 18 : 16 }]}>Next</Text>
            <Ionicons name="arrow-forward" size={isTablet ? 24 : 20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Ionicons name="checkmark" size={isTablet ? 24 : 20} color="white" />
            <Text style={[styles.submitButtonText, { fontSize: isTablet ? 18 : 16 }]}>Submit Claim</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
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
  attachmentButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    borderWidth: 2, 
    borderColor: '#2196F3', 
    borderStyle: 'dashed', 
    borderRadius: 8, 
    paddingVertical: 20, 
    paddingHorizontal: 12, 
    justifyContent: 'center' 
  },
  attachmentText: { 
    marginLeft: 8, 
    fontSize: 16, 
    color: '#2196F3', 
    fontWeight: '500' 
  },
  attachmentHint: { 
    fontSize: 12, 
    color: '#666', 
    marginTop: 8, 
    textAlign: 'center' 
  },
  summaryCard: { 
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 16, 
    marginTop: 20,
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
    marginBottom: 12 
  },
  summaryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8 
  },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
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
  submitButton: { 
    backgroundColor: '#4CAF50', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 8 
  },
  submitButtonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600', 
    marginLeft: 4 
  }
});
