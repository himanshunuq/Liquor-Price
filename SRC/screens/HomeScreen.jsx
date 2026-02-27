import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Spacing, FontSize, BorderRadius } from '../utils/theme';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

const STATES = [{ label: 'Jharkhand', value: 'jharkhand' }];

const SORT_OPTIONS = [
  { label: 'Default', value: 'none', icon: '↕' },
  { label: 'Price: Low → High', value: 'asc', icon: '↑' },
  { label: 'Price: High → Low', value: 'desc', icon: '↓' },
];

const HomeScreen = ({ navigation }) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState(STATES[0]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('none');

  const handleSearch = () => {
    navigation.navigate('ProductList', { searchQuery, category: selectedCategory, sortOrder });
  };

  const handleBrowseAll = () => {
    navigation.navigate('ProductList', { searchQuery: '', category: 'All', sortOrder });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.surface} />

      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View>
          <Text style={[styles.headerGreeting, { color: colors.textMuted }]}>🍾 Rate List 2025-26</Text>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Liquor Price</Text>
          <Text style={[styles.headerAccent, { color: colors.accent }]}>Jharkhand</Text>
        </View>

        <View style={styles.headerRight}>
          {/* Theme Toggle Button */}
          <TouchableOpacity
            style={[styles.themeToggle, {
              backgroundColor: colors.background,
              borderColor: colors.accent + '60',
            }]}
            onPress={toggleTheme}
            activeOpacity={0.8}>
            <Text style={styles.themeIcon}>{isDark ? '☀️' : '🌙'}</Text>
            <Text style={[styles.themeLabel, { color: colors.accent }]}>
              {isDark ? 'Light' : 'Dark'}
            </Text>
          </TouchableOpacity>

          {/* JSBCL badge */}
          <View style={[styles.headerBadge, {
            backgroundColor: colors.accent + '15',
            borderColor: colors.accent + '40',
          }]}>
            <Text style={[styles.headerBadgeText, { color: colors.accent }]}>JSBCL</Text>
            <Text style={[styles.headerBadgeYear, { color: colors.textMuted }]}>Official</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* State Selector */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Select State</Text>
          <View style={styles.stateContainer}>
            {STATES.map(s => (
              <TouchableOpacity
                key={s.value}
                activeOpacity={0.8}
                style={[
                  styles.statePill,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  selectedState.value === s.value && {
                    backgroundColor: colors.accent + '20',
                    borderColor: colors.accent,
                  },
                ]}
                onPress={() => setSelectedState(s)}>
                <Text style={[
                  styles.statePillText,
                  { color: colors.textSecondary },
                  selectedState.value === s.value && { color: colors.accent, fontWeight: '700' },
                ]}>
                  🏛️  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
            <View style={[styles.moreStatesBadge, { borderColor: colors.border }]}>
              <Text style={[styles.moreStatesText, { color: colors.textMuted }]}>+ More states soon</Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Search</Text>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmit={handleSearch}
            placeholder="Brand, label or category..."
          />
        </View>

        {/* Filter */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Filter by Category</Text>
          <FilterBar selected={selectedCategory} onSelect={setSelectedCategory} />
        </View>

        {/* Sort */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Sort by Price</Text>
          <View style={styles.sortRow}>
            {SORT_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.value}
                activeOpacity={0.8}
                onPress={() => setSortOrder(opt.value)}
                style={[
                  styles.sortBtn,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  sortOrder === opt.value && {
                    backgroundColor: colors.accent + '20',
                    borderColor: colors.accent,
                  },
                ]}>
                <Text style={[
                  styles.sortBtnIcon,
                  { color: colors.textMuted },
                  sortOrder === opt.value && { color: colors.accent },
                ]}>
                  {opt.icon}
                </Text>
                <Text style={[
                  styles.sortBtnText,
                  { color: colors.textSecondary },
                  sortOrder === opt.value && { color: colors.accent, fontWeight: '700' },
                ]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.searchBtn, { backgroundColor: colors.accent }]}
            activeOpacity={0.85}
            onPress={handleSearch}>
            <Text style={[styles.searchBtnText, { color: isDark ? '#0D0D0D' : '#fff' }]}>
              🔍  Search Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.browseBtn, { borderColor: colors.border, backgroundColor: colors.surface }]}
            activeOpacity={0.85}
            onPress={handleBrowseAll}>
            <Text style={[styles.browseBtnText, { color: colors.textSecondary }]}>
              Browse All Products →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Grid */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Quick Browse</Text>
          <View style={styles.quickGrid}>
            {[
              { label: 'Whisky', icon: '🥃', cat: 'Whisky' },
              { label: 'Beer',   icon: '🍺', cat: 'Beer' },
              { label: 'Rum',    icon: '🍹', cat: 'Rum' },
              { label: 'Vodka',  icon: '🍸', cat: 'Vodka' },
              { label: 'Wine',   icon: '🍷', cat: 'Wine' },
              { label: 'Gin',    icon: '🍃', cat: 'Gin' },
              { label: 'Brandy', icon: '🥂', cat: 'Brandy' },
              { label: 'CL',     icon: '🫙', cat: 'CL' },
            ].map(item => (
              <TouchableOpacity
                key={item.cat}
                activeOpacity={0.8}
                style={[styles.quickCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() =>
                  navigation.navigate('ProductList', {
                    searchQuery: '', category: item.cat, sortOrder: 'none',
                  })
                }>
                <Text style={styles.quickIcon}>{item.icon}</Text>
                <Text style={[styles.quickLabel, { color: colors.textSecondary }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
            Data sourced from JSBCL official rate list.{'\n'}Prices effective from 01 Apr 2025.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingTop: 50,
    paddingBottom: Spacing.xl,
    borderBottomWidth: 1,
  },
  headerGreeting: { fontSize: FontSize.sm, marginBottom: 4, letterSpacing: 0.5 },
  headerTitle: { fontSize: 26, fontWeight: '800', letterSpacing: -0.3 },
  headerAccent: { fontSize: 22, fontWeight: '700', letterSpacing: 1, marginTop: -4 },
  headerRight: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm },

  // ── Theme Toggle ──
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: BorderRadius.round,
    borderWidth: 1.5,
    marginBottom: 2,
  },
  themeIcon: { fontSize: 16 },
  themeLabel: { fontSize: FontSize.xs, fontWeight: '700', letterSpacing: 0.5 },

  headerBadge: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  headerBadgeText: { fontSize: FontSize.md, fontWeight: '800', letterSpacing: 0.5 },
  headerBadgeYear: { fontSize: FontSize.xs, fontWeight: '600', letterSpacing: 0.5 },

  section: { marginTop: Spacing.xl },
  sectionLabel: {
    fontSize: FontSize.sm, fontWeight: '600', letterSpacing: 0.8,
    textTransform: 'uppercase', marginBottom: Spacing.sm, paddingHorizontal: Spacing.lg,
  },
  stateContainer: {
    flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm,
    paddingHorizontal: Spacing.lg, alignItems: 'center',
  },
  statePill: {
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: BorderRadius.round, borderWidth: 1,
  },
  statePillText: { fontSize: FontSize.md, fontWeight: '600' },
  moreStatesBadge: {
    paddingHorizontal: 12, paddingVertical: 9,
    borderRadius: BorderRadius.round, borderWidth: 1, borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
  moreStatesText: { fontSize: FontSize.sm, fontStyle: 'italic' },
  sortRow: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.lg, flexWrap: 'wrap' },
  sortBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: BorderRadius.md, borderWidth: 1,
  },
  sortBtnIcon: { fontSize: FontSize.md, fontWeight: '700' },
  sortBtnText: { fontSize: FontSize.sm, fontWeight: '600' },
  actionContainer: { paddingHorizontal: Spacing.lg, marginTop: Spacing.xl, gap: Spacing.md },
  searchBtn: {
    borderRadius: BorderRadius.lg, paddingVertical: 15, alignItems: 'center',
    elevation: 8, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12,
  },
  searchBtnText: { fontSize: FontSize.lg, fontWeight: '800', letterSpacing: 0.5 },
  browseBtn: {
    borderRadius: BorderRadius.lg, paddingVertical: 14,
    alignItems: 'center', borderWidth: 1,
  },
  browseBtnText: { fontSize: FontSize.md, fontWeight: '600' },
  quickGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.lg, gap: Spacing.sm,
  },
  quickCard: {
    width: '22%', aspectRatio: 1, borderRadius: BorderRadius.lg,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, gap: 4,
  },
  quickIcon: { fontSize: 26 },
  quickLabel: { fontSize: FontSize.xs, fontWeight: '600', textAlign: 'center' },
  footer: { marginTop: Spacing.xxl, marginBottom: 40, paddingHorizontal: Spacing.lg, alignItems: 'center' },
  footerText: { fontSize: FontSize.xs, textAlign: 'center', lineHeight: 18 },
});
