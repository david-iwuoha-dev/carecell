import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Switch 
} from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header Card */}
        <View style={styles.profileHeaderCard}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder for User
            style={styles.profileAvatar} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Owoade Opeyemi</Text>
            <Text style={styles.profileRole}>Parent/Guardian Account</Text>
            <View style={styles.genotypeBadge}>
              <Text style={styles.genotypeText}>Genotype: SS</Text>
            </View>
          </View>
        </View>

        {/* Section: App Controls */}
        <Text style={styles.sectionHeader}>App Controls</Text>
        <View style={styles.menuCard}>
          <MenuRow icon="user-edit" label="Edit Profile" type="fa5" />
          <Divider />
          <MenuRow icon="lock" label="Change Password" type="feather" />
          <Divider />
          <MenuRow icon="shield" label="App Permissions" type="feather" isLast />
        </View>

        {/* Section: Personal Details */}
        <Text style={styles.sectionHeader}>Personal Details</Text>
        <View style={styles.menuCard}>
          <DetailRow icon="phone" label="Phone" value="08107522288" color="#FCA5A5" />
          <Divider />
          <DetailRow icon="mail" label="Email" value="owoadeopeyemi11@gmail.com" color="#FCA5A5" />
          <Divider />
          <DetailRow icon="map-pin" label="Location" value="Lagos, Nigeria" color="#FCA5A5" />
          <Divider />
          <DetailRow icon="alert-circle" label="Emergency Contact" value="Aleje Sultan" subValue="09024269995" color="#FCA5A5" isLast />
        </View>

        {/* Section: Health Settings */}
        <Text style={styles.sectionHeader}>Health Settings</Text>
        <View style={styles.menuCard}>
          <ToggleRow icon="water" label="Hydration Reminders" sub="Daily water intake alerts" color="#3B82F6" initialValue={true} />
          <Divider />
          <ToggleRow icon="pill" label="Medication Reminders" sub="Med schedule alerts" color="#F87171" initialValue={true} />
          <Divider />
          <ToggleRow icon="alert" label="Crisis Alerts" sub="Environmental triggers" color="#EF4444" initialValue={true} isLast />
        </View>

        {/* Section: General Settings */}
        <Text style={styles.sectionHeader}>General Settings</Text>
        <View style={styles.menuCard}>
          <MenuRow icon="bell" label="Notifications" type="feather" />
          <Divider />
          <View style={styles.row}>
            <View style={[styles.iconBox, {backgroundColor: '#F3F4F6'}]}>
              <Feather name="moon" size={18} color="#4B5563" />
            </View>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <Switch value={isDark} onValueChange={setIsDark} />
          </View>
          <Divider />
          <MenuRow icon="info" label="About CareCell" type="feather" isLast />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Feather name="log-out" size={20} color="#B22222" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.footerBrand}>Your Data is Secure</Text>
        <Text style={styles.footerDetail}>Health data is encrypted end-to-end.</Text>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-Components ---
const MenuRow = ({ icon, label, type, isLast }) => (
  <TouchableOpacity style={styles.row}>
    <View style={[styles.iconBox, {backgroundColor: '#F3F4F6'}]}>
      {type === 'fa5' ? <FontAwesome5 name={icon} size={16} color="#4B5563" /> : <Feather name={icon} size={18} color="#4B5563" />}
    </View>
    <Text style={styles.rowLabel}>{label}</Text>
    <Feather name="chevron-right" size={20} color="#9CA3AF" />
  </TouchableOpacity>
);

const DetailRow = ({ icon, label, value, subValue, color, isLast }) => (
  <View style={styles.row}>
    <View style={[styles.iconBox, {backgroundColor: color + '20'}]}>
      <Feather name={icon} size={18} color="#B22222" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
      {subValue && <Text style={styles.detailSubValue}>{subValue}</Text>}
    </View>
  </View> // <--- Changed from </TouchableOpacity> to </View>
);

const ToggleRow = ({ icon, label, sub, color, initialValue }) => {
    const [enabled, setEnabled] = React.useState(initialValue);
    return (
        <View style={styles.row}>
            <View style={[styles.iconBox, {backgroundColor: color + '20'}]}>
                <MaterialCommunityIcons name={icon} size={20} color={color} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={styles.rowSubLabel}>{sub}</Text>
            </View>
            <Switch value={enabled} onValueChange={setEnabled} trackColor={{ true: '#B22222' }} />
        </View>
    );
}

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  scrollContent: { padding: 20 },
  
  profileHeaderCard: { backgroundColor: '#B22222', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  profileAvatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)' },
  profileInfo: { marginLeft: 15 },
  profileName: { color: '#FFF', fontSize: 18, fontFamily: 'Brand-Bold' },
  profileRole: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 8 },
  genotypeBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  genotypeText: { color: '#FFF', fontSize: 11, fontFamily: 'Brand-Bold' },

  sectionHeader: { fontSize: 14, fontFamily: 'Brand-Bold', color: '#6B7280', marginBottom: 10, marginLeft: 5 },
  menuCard: { backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 15, marginBottom: 20, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  rowLabel: { flex: 1, fontSize: 14, color: '#1F2937', fontFamily: 'Brand-Medium' },
  rowSubLabel: { fontSize: 11, color: '#9CA3AF' },
  divider: { height: 1, backgroundColor: '#F3F4F6' },

  detailLabel: { fontSize: 11, color: '#9CA3AF' },
  detailValue: { fontSize: 14, color: '#1F2937', fontFamily: 'Brand-Medium' },
  detailSubValue: { fontSize: 12, color: '#6B7280' },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEE2E2', padding: 18, borderRadius: 16, marginTop: 10 },
  logoutText: { color: '#B22222', fontFamily: 'Brand-Bold', marginLeft: 10 },
  footerBrand: { textAlign: 'center', color: '#1F2937', fontFamily: 'Brand-Bold', marginTop: 30 },
  footerDetail: { textAlign: 'center', color: '#9CA3AF', fontSize: 12, marginBottom: 10 }
});

export default ProfileScreen;