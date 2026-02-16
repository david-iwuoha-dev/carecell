import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Image,
  Dimensions,
  Animated
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FEATURED_NEWS = [
  {
    id: 1,
    title: "New Breakthroughs in SCD Gene Therapy for 2026",
    category: "RESEARCH",
    image: 'https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "How Lagos Medical Centers are Revolutionizing Care",
    category: "LOCAL NEWS",
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800',
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Understanding the Link Between Stress and Pain",
    category: "WELLNESS",
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800',
    readTime: "6 min read"
  }
];

const TrendsScreen = ({ onBack }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  // Automatic Slider Logic (4 Seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = activeIndex === FEATURED_NEWS.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }, 4000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={28} color="#B22222" />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.headerTitle}>Discover Trends</Text>
          <Text style={styles.headerSubtitle}>Latest health news & lifestyle tips</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Sliding Featured Section */}
        <View style={styles.sliderContainer}>
          <ScrollView 
            ref={scrollViewRef}
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {FEATURED_NEWS.map((news) => (
              <TouchableOpacity key={news.id} style={styles.heroCard} activeOpacity={0.9}>
                <Image source={{ uri: news.image }} style={styles.heroImage} />
                <View style={styles.heroOverlay}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{news.category}</Text>
                  </View>
                  <Text style={styles.heroTitle}>{news.title}</Text>
                  <Text style={styles.heroMeta}>{news.readTime} • Trending</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Pagination Dots */}
          <View style={styles.dotContainer}>
            {FEATURED_NEWS.map((_, i) => (
              <View key={i} style={[styles.dot, activeIndex === i && styles.activeDot]} />
            ))}
          </View>
        </View>

        <View style={styles.contentPadding}>
          
          {/* Health & Lifestyle Tips Section (Vibrant Grid) */}
          <Text style={styles.sectionLabel}>Daily Lifestyle Tips</Text>
          
          <View style={styles.masonryGrid}>
            <View style={styles.column}>
              <TipCard 
                title="Hydration Hack" 
                desc="Cucumber & Mint water improves mineral absorption." 
                icon="water" 
                color="#DBEAFE" 
                iconColor="#3B82F6"
                img="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=400"
              />
              <TipCard 
                title="Better Sleep" 
                desc="Try tart cherry juice before bed for natural melatonin." 
                icon="moon" 
                color="#F3E8FF" 
                iconColor="#A855F7"
                img="https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
            </View>
            <View style={styles.column}>
              <TipCard 
                title="Warmth First" 
                desc="Keep your socks on. Cold feet can trigger vessel constriction." 
                icon="thermometer" 
                color="#FEE2E2" 
                iconColor="#B22222"
                img="https://images.pexels.com/photos/5710241/pexels-photo-5710241.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
              <TipCard 
                title="Iron Boost" 
                desc="Pair spinach with lemon juice to double iron intake." 
                icon="leaf" 
                color="#DCFCE7" 
                iconColor="#16A34A"
                img="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400"
              />
            </View>
          </View>

          {/* Expanded Community Buzz Section */}
          <Text style={styles.sectionLabel}>Community Buzz</Text>
          
          <BuzzCard 
            title="The Best Legumes for Energy" 
            sub="Warriors in Lagos share their favorite high-protein meals."
            img="https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=400"
            likes="2.4k"
          />
          <BuzzCard 
            title="Mindfulness for Pain Relief" 
            sub="A 10-minute guide to breathing through a minor crisis."
            img="https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=400"
            likes="1.1k"
          />
          <BuzzCard 
            title="Travel Tips with SCD" 
            sub="Everything you need to pack for a safe flight."
            img="https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=400"
            likes="945"
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable Components
const TipCard = ({ title, desc, icon, color, iconColor, img }) => (
  <TouchableOpacity style={styles.tipCard}>
    {img && <Image source={{ uri: img }} style={styles.tipImage} />}
    <View style={styles.tipTextContent}>
      <View style={[styles.tipIconCircle, { backgroundColor: color }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.tipTitle}>{title}</Text>
      <Text style={styles.tipDescription}>{desc}</Text>
    </View>
  </TouchableOpacity>
);

const BuzzCard = ({ title, sub, img, likes }) => (
  <TouchableOpacity style={styles.buzzCard}>
    <View style={styles.buzzContent}>
       <Text style={styles.buzzTitle}>{title}</Text>
       <Text style={styles.buzzSub}>{sub}</Text>
       <View style={styles.buzzStats}>
          <Feather name="heart" size={14} color="#B22222" />
          <Text style={styles.statText}>{likes}</Text>
          <Feather name="share-2" size={14} color="#6B5E5E" style={{marginLeft: 15}} />
       </View>
    </View>
    <Image source={{ uri: img }} style={styles.buzzImage} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 22, fontFamily: 'Brand-Bold', color: '#1F2937' },
  headerSubtitle: { fontSize: 13, color: '#6B5E5E' },
  contentPadding: { paddingHorizontal: 20 },
  
  // Slider Styles
  sliderContainer: { height: 260, marginTop: 10 },
  heroCard: { width: width, height: 240, paddingHorizontal: 20 },
  heroImage: { width: '100%', height: '100%', borderRadius: 28 },
  heroOverlay: { position: 'absolute', bottom: 0, left: 20, right: 20, padding: 20, backgroundColor: 'rgba(0,0,0,0.35)', borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  categoryBadge: { backgroundColor: '#B22222', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 8 },
  categoryText: { color: '#FFF', fontSize: 10, fontFamily: 'Brand-Bold' },
  heroTitle: { color: '#FFF', fontSize: 20, fontFamily: 'Brand-Bold', lineHeight: 26 },
  heroMeta: { color: '#E5E7EB', fontSize: 11, marginTop: 5 },
  dotContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: -25 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.5)', marginHorizontal: 4 },
  activeDot: { width: 18, backgroundColor: '#FFF' },

  sectionLabel: { fontSize: 18, fontFamily: 'Brand-Bold', color: '#4B3F3F', marginBottom: 15, marginTop: 25 },

  // Masonry Grid
  masonryGrid: { flexDirection: 'row', gap: 12 },
  column: { flex: 1, gap: 12 },
  tipCard: { backgroundColor: '#FFF', borderRadius: 24, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  tipImage: { width: '100%', height: 100 },
  tipTextContent: { padding: 15 },
  tipIconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  tipTitle: { fontSize: 14, fontFamily: 'Brand-Bold', color: '#1F2937' },
  tipDescription: { fontSize: 11, color: '#6B5E5E', marginTop: 5, lineHeight: 16 },

  // Buzz Cards
  buzzCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 16, flexDirection: 'row', marginBottom: 12, elevation: 2 },
  buzzContent: { flex: 1, marginRight: 12 },
  buzzTitle: { fontSize: 15, fontFamily: 'Brand-Bold', color: '#1F2937' },
  buzzSub: { fontSize: 12, color: '#6B5E5E', marginTop: 6, lineHeight: 18 },
  buzzStats: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  statText: { fontSize: 11, color: '#6B5E5E', marginLeft: 5 },
  buzzImage: { width: 90, height: 90, borderRadius: 16 }
});

export default TrendsScreen;