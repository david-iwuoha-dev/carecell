import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HealthReportScreen = ({ onBack }) => {
  // Chart Data Alignment: PDF (5), QR (3), Link (7) = Total 15
  const chartData = [
    { label: 'PDF', value: 5, height: 100 },
    { label: 'QR Code', value: 3, height: 60 },
    { label: 'Link', value: 7, height: 140 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Uniform Header Structure */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={28} color="#B22222" />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.headerTitle}>Health Report</Text>
          <Text style={styles.headerSubtitle}>Share your health data securely</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Clinician Data Access Activity */}
        <Text style={styles.sectionLabel}>Clinician Data Access Activity</Text>
        
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Access Methods (Last 30 Days)</Text>
            <Ionicons name="eye-outline" size={20} color="#EAB308" />
          </View>

          {/* Bar Chart - Aligned with screenshot values */}
          <View style={styles.barChartContainer}>
             <View style={styles.yAxis}>
                <Text style={styles.axisText}>8</Text>
                <Text style={styles.axisText}>6</Text>
                <Text style={styles.axisText}>4</Text>
                <Text style={styles.axisText}>2</Text>
                <Text style={styles.axisText}>0</Text>
             </View>
             <View style={styles.barsArea}>
                {chartData.map((item, index) => (
                  <View key={index} style={styles.barWrapper}>
                    <View style={[styles.bar, { height: item.height }]} />
                    <Text style={styles.barLabelText}>{item.label}</Text>
                  </View>
                ))}
             </View>
          </View>
          
          <View style={styles.divider} />
          <Text style={styles.totalAccessText}>Total Accesses: <Text style={{fontFamily: 'Brand-Bold'}}>15</Text></Text>
        </View>

        {/* Recent Access History */}
        <View style={styles.historyCard}>
          <Text style={styles.chartTitle}>Recent Access History</Text>
          
          <AccessItem hospital="Lagos University Hospital" date="Jan 10, 2026" type="PDF" />
          <AccessItem hospital="SCD Treatment Center" date="Jan 8, 2026" type="QR Code" color="#FEF9C3" textColor="#EAB308" />
          <AccessItem hospital="General Hospital SCD Treatment Center" date="Jan 8, 2026" type="QR Code" color="#FEF9C3" textColor="#EAB308" />
          <AccessItem hospital="General Hospital" date="Jan 5, 2026" type="Link" color="#DBEAFE" textColor="#3B82F6" />
        </View>

        {/* Share My History Section */}
        <Text style={styles.sectionLabel}>Share My History</Text>
        
        <ShareOption 
          icon="download" 
          title="Download PDF" 
          sub="Get a complete health report" 
          color="#B22222" 
        />
        <ShareOption 
          icon="qrcode" 
          title="Create QR Code" 
          sub="Quick scan access for clinicians" 
          color="#EAB308" 
        />
        <ShareOption 
          icon="link" 
          title="Create Secure Shareable Link" 
          sub="Share with time-limited access" 
          color="#3B82F6" 
        />

        {/* Control Footer */}
        <View style={styles.controlBox}>
           <Feather name="shield" size={20} color="#EAB308" style={{ marginRight: 12 }} />
           <View style={{ flex: 1 }}>
              <Text style={styles.controlTitle}>You are always in control</Text>
              <Text style={styles.controlSub}>Data is shared only with your consent. You can revoke access at any time.</Text>
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// Sub-components
const AccessItem = ({ hospital, date, type, color = "#FEE2E2", textColor = "#B22222" }) => (
  <View style={styles.historyItem}>
    <View style={{ flex: 1 }}>
      <Text style={styles.hospitalName}>{hospital}</Text>
      <Text style={styles.accessDate}>{date}</Text>
    </View>
    <View style={[styles.typeBadge, { backgroundColor: color }]}>
      <Text style={[styles.typeText, { color: textColor }]}>{type}</Text>
    </View>
  </View>
);

const ShareOption = ({ icon, title, sub, color }) => (
  <TouchableOpacity style={styles.shareOptionCard}>
    <View style={[styles.shareIconCircle, { backgroundColor: color }]}>
      <MaterialCommunityIcons name={icon} size={24} color="#FFF" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.shareTitle}>{title}</Text>
      <Text style={styles.shareSub}>{sub}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 22, fontFamily: 'Brand-Bold', color: '#1F2937' },
  headerSubtitle: { fontSize: 13, color: '#6B5E5E' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  sectionLabel: { fontSize: 16, fontFamily: 'Brand-Bold', color: '#4B3F3F', marginBottom: 15, marginTop: 10 },
  
  // Chart Styles
  chartCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 20, elevation: 2 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  chartTitle: { fontSize: 14, fontFamily: 'Brand-Bold', color: '#4B3F3F' },
  barChartContainer: { flexDirection: 'row', height: 180, alignItems: 'flex-end' },
  yAxis: { height: '100%', justifyContent: 'space-between', paddingRight: 10 },
  axisText: { fontSize: 10, color: '#9CA3AF' },
  barsArea: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', borderLeftWidth: 1, borderBottomWidth: 1, borderColor: '#F3F4F6' },
  barWrapper: { alignItems: 'center', width: '25%' },
  bar: { width: '100%', backgroundColor: '#8B0000', borderRadius: 4 },
  barLabelText: { fontSize: 10, color: '#6B5E5E', marginTop: 8 },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 15 },
  totalAccessText: { fontSize: 13, color: '#6B5E5E' },

  // History Styles
  historyCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 25 },
  historyItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
  hospitalName: { fontSize: 13, fontFamily: 'Brand-Medium', color: '#1F2937' },
  accessDate: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeText: { fontSize: 10, fontFamily: 'Brand-Bold' },

  // Share Styles
  shareOptionCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  shareIconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  shareTitle: { fontSize: 14, fontFamily: 'Brand-Bold', color: '#1F2937' },
  shareSub: { fontSize: 11, color: '#6B5E5E', marginTop: 2 },

  // Control Footer
  controlBox: { backgroundColor: '#FEF9C3', borderRadius: 16, padding: 16, flexDirection: 'row', marginTop: 10 },
  controlTitle: { fontSize: 13, fontFamily: 'Brand-Bold', color: '#4B3F3F' },
  controlSub: { fontSize: 11, color: '#6B5E5E', marginTop: 4 }
});

export default HealthReportScreen;