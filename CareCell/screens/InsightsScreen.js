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
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart, BarChart } from "react-native-gifted-charts"; // <--- ADDED THIS

const { width } = Dimensions.get('window');

const InsightsScreen = () => {
  // Data for Pain Level (Single Curved Line)
  const painData = [
    {value: 2, label: 'M'}, {value: 5, label: 'T'}, 
    {value: 3, label: 'W'}, {value: 1, label: 'T'}, 
    {value: 2, label: 'F'}, {value: 4, label: 'S'}, {value: 3, label: 'S'}
  ];

  // Data for Hydration vs Pain (Multi-Line)
  const hydrationData = [
    {value: 6, label: 'M'}, {value: 8, label: 'T'}, {value: 7, label: 'W'}, 
    {value: 9, label: 'T'}, {value: 6, label: 'F'}, {value: 7, label: 'S'}, {value: 8, label: 'S'}
  ];
  const painCompareData = [
    {value: 3, label: 'M'}, {value: 1, label: 'T'}, {value: 2, label: 'W'}, 
    {value: 1, label: 'T'}, {value: 4, label: 'F'}, {value: 2, label: 'S'}, {value: 1, label: 'S'}
  ];

  // Data for Mood (Bars)
  const moodData = [
    {value: 80, label: 'M', frontColor: '#EAB308'}, 
    {value: 60, label: 'T', frontColor: '#EAB308'}, 
    {value: 90, label: 'W', frontColor: '#EAB308'}, 
    {value: 100, label: 'T', frontColor: '#EAB308'},
    {value: 70, label: 'F', frontColor: '#EAB308'}
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Area - No Back Button (Threaded Layout) */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Insights</Text>
          <Text style={styles.headerSubtitle}>Your personalized analytics</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Week/Month Toggle */}
        <View style={styles.toggleContainer}>
           <TouchableOpacity style={[styles.toggleBtn, styles.activeToggle]}>
              <Text style={styles.activeToggleText}>Week</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.toggleBtn}>
              <Text style={styles.toggleText}>Month</Text>
           </TouchableOpacity>
        </View>

        {/* Top Metric Row */}
        <View style={styles.metricsRow}>
           <MetricCard icon="tint" label="Avg Pain" value="2.1" color="#B22222" />
           <MetricCard icon="water" label="Avg Water" value="6.4" color="#3B82F6" />
           <MetricCard icon="bed" label="Avg Sleep" value="7.1h" color="#A855F7" />
        </View>

        {/* 1. Pain Level Trend (Curved Line Chart) */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Pain Level Trend</Text>
          <LineChart
            data={painData}
            curved
            thickness={3}
            color="#B22222"
            hideRules
            dataPointsColor="#B22222"
            dataPointsRadius={4}
            areaChart
            startFillColor="rgba(178, 34, 34, 0.2)"
            endFillColor="rgba(178, 34, 34, 0.01)"
            yAxisThickness={0}
            xAxisThickness={0}
            hideYAxisText
            xAxisLabelTextStyle={{color: '#9CA3AF', fontSize: 10}}
            width={width - 80}
          />
        </View>

        {/* 2. Hydration vs Pain (Multi-Line Curved) */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeaderRow}>
             <Text style={styles.chartTitle}>Hydration vs Pain</Text>
             <View style={styles.legend}>
                <View style={[styles.dot, {backgroundColor: '#3B82F6'}]} /><Text style={styles.legendText}>Hydr.</Text>
                <View style={[styles.dot, {backgroundColor: '#B22222', marginLeft: 8}]} /><Text style={styles.legendText}>Pain</Text>
             </View>
          </View>
          <LineChart
            data={hydrationData}
            data2={painCompareData}
            curved
            thickness={3}
            color="#3B82F6"
            color2="#B22222"
            hideRules
            hideDataPoints
            yAxisThickness={0}
            xAxisThickness={0}
            hideYAxisText
            xAxisLabelTextStyle={{color: '#9CA3AF', fontSize: 10}}
            width={width - 80}
          />
        </View>

        {/* 3. Mood This Week (Proper Bar Chart) */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Mood This Week</Text>
          <BarChart
            data={moodData}
            barWidth={22}
            capRadius={4}
            hideRules
            yAxisThickness={0}
            xAxisThickness={0}
            hideYAxisText
            xAxisLabelTextStyle={{color: '#9CA3AF', fontSize: 10}}
            width={width - 80}
          />
        </View>

        {/* AI Insights Section */}
        <View style={styles.aiCard}>
           <View style={styles.aiHeader}>
              <MaterialCommunityIcons name="robot" size={20} color="#B22222" />
              <Text style={styles.aiTitle}>AI Insights</Text>
           </View>
           <View style={styles.aiBullet}>
              <View style={styles.bullet} />
              <Text style={styles.aiText}>You have normal hemoglobin - excellent health status</Text>
           </View>
           <View style={styles.aiBullet}>
              <View style={styles.bullet} />
              <Text style={styles.aiText}>Continue maintaining healthy lifestyle habits</Text>
           </View>
           <View style={styles.aiBullet}>
              <View style={styles.bullet} />
              <Text style={styles.aiText}>Regular check-ups recommended for overall wellness</Text>
           </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity style={styles.updateButton}>
           <Text style={styles.updateButtonText}>Update Hematology Data</Text>
        </TouchableOpacity>

        {/* Extra spacing for Bottom Nav */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Sub-components
const MetricCard = ({ icon, label, value, color }) => (
  <View style={styles.metricCard}>
    <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
       <FontAwesome5 name={icon} size={16} color={color} />
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }, // Modified for threaded look
  headerTitle: { fontSize: 22, fontFamily: 'Brand-Bold', color: '#1F2937' },
  headerSubtitle: { fontSize: 13, color: '#6B5E5E' },
  scrollContent: { padding: 20 },

  toggleContainer: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 12, padding: 4, marginBottom: 20 },
  toggleBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  activeToggle: { backgroundColor: '#FFF', elevation: 2 },
  activeToggleText: { fontFamily: 'Brand-Bold', color: '#B22222', fontSize: 14 },
  toggleText: { color: '#6B5E5E', fontSize: 14 },

  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  metricCard: { width: '31%', backgroundColor: '#FFF', padding: 15, borderRadius: 20, alignItems: 'center', elevation: 2 },
  iconCircle: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  metricValue: { fontSize: 16, fontFamily: 'Brand-Bold', color: '#1F2937' },
  metricLabel: { fontSize: 10, color: '#6B5E5E' },

  chartCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 15, elevation: 2 },
  chartTitle: { fontSize: 14, fontFamily: 'Brand-Bold', color: '#4B3F3F', marginBottom: 15 },
  chartHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  legend: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 10, marginLeft: 4, color: '#6B5E5E' },

  aiCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 20 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  aiTitle: { fontSize: 16, fontFamily: 'Brand-Bold', color: '#1F2937', marginLeft: 10 },
  aiBullet: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#B22222', marginRight: 10 },
  aiText: { fontSize: 13, color: '#4B3F3F', flex: 1 },

  updateButton: { backgroundColor: '#B22222', borderRadius: 16, padding: 18, alignItems: 'center' },
  updateButtonText: { color: '#FFF', fontFamily: 'Brand-Bold', fontSize: 16 }
});

export default InsightsScreen;