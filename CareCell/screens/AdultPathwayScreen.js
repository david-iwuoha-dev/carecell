import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Image
} from 'react-native';

const AdultPathwayScreen = ({ onBack, onContinue }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.heroSection}>
          <View style={styles.heartCircle}>
            <Image 
              source={require('../assets/icon/icon-health.png')} 
              style={styles.heartIcon} 
            />
          </View>
          <Text style={styles.headerTitle}>Curative Pathway for Adults</Text>
          <Text style={styles.headerSubtitle}>Exploring long-term cure possibilities</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardSectionTitle}>Modern Adult Curative Options</Text>
          <Text style={styles.bodyText}>
            While historically focused on pediatrics, curative therapies are now highly successful for adults thanks to advances in conditioning and donor matching.
          </Text>

          <View style={styles.therapyItem}>
            <View style={styles.redDot} />
            <Text style={styles.therapyText}>
              <Text style={styles.boldText}>Haploidentical Transplant: </Text>
              Allows for "half-matches" from adult children or parents, greatly expanding the donor pool.
            </Text>
          </View>

          <View style={styles.therapyItem}>
            <View style={styles.redDot} />
            <Text style={styles.therapyText}>
              <Text style={styles.boldText}>Gene Therapy (Exa-cel): </Text>
              Uses your own stem cells, eliminating the need for a donor and the risk of rejection.
            </Text>
          </View>

          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              For adults, eligibility is determined by both a biological match and "organ fitness" (heart, liver, and lung health).
            </Text>
          </View>
        </View>

        <View style={styles.nextStepsCard}>
          <Text style={styles.nextStepsTitle}>Your Assessment Steps</Text>
          
          {[
            'Identify sibling or offspring donors',
            'Screen for HLA matching availability',
            'Document organ health & transfusion load',
            'Establish adult hematology baseline'
          ].map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <Text style={styles.arrowIcon}>→</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.mainButton} activeOpacity={0.8} onPress={onContinue}>
          <Text style={styles.mainButtonText}>Continue to Adult Assessment</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backButton: {
    marginTop: 10,
    marginLeft: -8,
    padding: 8,
  },
  backIcon: {
    fontSize: 40,
    color: '#B22222',
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heartCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
  },
  heartIcon: {
    width: 72,
    height: 68,
    tintColor: '#B22222',
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Brand-Bold',
    color: '#B22222',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B5E5E',
    marginTop: 4,
    fontFamily: 'Brand-Medium',
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardSectionTitle: {
    fontSize: 16,
    fontFamily: 'Brand-Bold',
    color: '#B22222',
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 14,
    color: '#6B5E5E',
    lineHeight: 20,
    marginBottom: 20,
    fontFamily: 'Brand-Medium',
  },
  therapyItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B22222',
    marginTop: 6,
    marginRight: 10,
  },
  therapyText: {
    flex: 1,
    fontSize: 13,
    color: '#6B5E5E',
    lineHeight: 18,
    fontFamily: 'Brand-Medium',
  },
  boldText: {
    fontFamily: 'Brand-Bold',
    color: '#333',
  },
  noteBox: {
    backgroundColor: '#FFF4E6',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  noteText: {
    fontSize: 13,
    color: '#6B5E5E',
    lineHeight: 18,
    fontFamily: 'Brand-Medium',
  },
  nextStepsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  nextStepsTitle: {
    fontSize: 15,
    fontFamily: 'Brand-Bold',
    color: '#333',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  arrowIcon: {
    fontSize: 18,
    color: '#B22222',
  },
  stepText: {
    fontSize: 14,
    color: '#6B5E5E',
    marginLeft: 10,
    fontFamily: 'Brand-Medium',
  },
  mainButton: {
    backgroundColor: '#B22222',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdultPathwayScreen;