import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator,
} from 'react-native';
import { filterProducts } from '../DATA/dataUtils';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import NoResults from '../components/NoResults';
import { Spacing, FontSize, BorderRadius } from '../utils/theme';

const SORT_OPTIONS = [
  { label: 'Default', value: 'none' },
  { label: '↑ Low→High', value: 'asc' },
  { label: '↓ High→Low', value: 'desc' },
];

const ProductListScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const {
    searchQuery: initialSearch = '',
    category: initialCategory = 'All',
    sortOrder: initialSort = 'none',
    stateKey = 'jharkhand',
    stateName = 'Jharkhand',
  } = route.params || {};

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState(initialSort);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(() => {
    setLoading(true);
    const result = filterProducts({ searchQuery, category: selectedCategory, sortOrder, stateKey });
    setProducts(result);
    setLoading(false);
  }, [searchQuery, selectedCategory, sortOrder, stateKey]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const handleProductPress = item =>
    navigation.navigate('ProductDetail', { item, stateKey });

  const renderItem = ({ item }) => (
    <ProductCard item={item} onPress={() => handleProductPress(item)} />
  );

  const renderHeader = () => (
    <>
      <View style={styles.searchSection}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} onSubmit={loadProducts} placeholder="Refine search..." />
      </View>
      <FilterBar selected={selectedCategory} onSelect={setSelectedCategory} />
      <View style={[styles.metaRow, { borderBottomColor: colors.border }]}>
        <View style={styles.countBadge}>
          <Text style={[styles.countNumber, { color: colors.accent }]}>{products.length}</Text>
          <Text style={[styles.countLabel, { color: colors.textMuted }]}>
            {products.length === 1 ? 'product' : 'products'}
          </Text>
        </View>
        <View style={styles.sortRow}>
          {SORT_OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt.value}
              activeOpacity={0.8}
              onPress={() => setSortOrder(opt.value)}
              style={[
                styles.sortChip,
                { backgroundColor: colors.surface, borderColor: colors.border },
                sortOrder === opt.value && { backgroundColor: colors.accent + '25', borderColor: colors.accent },
              ]}>
              <Text style={[
                styles.sortChipText,
                { color: colors.textMuted },
                sortOrder === opt.value && { color: colors.accent, fontWeight: '700' },
              ]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.surface} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          activeOpacity={0.7}>
          <Text style={[styles.backIcon, { color: colors.accent }]}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            {selectedCategory !== 'All' ? selectedCategory : 'All Products'}
          </Text>
          <Text style={[styles.headerSub, { color: colors.textMuted }]} numberOfLines={1}>
            {stateName}
            {initialSearch ? `  ·  "${initialSearch}"` : ''}
          </Text>
        </View>
        <View style={[styles.stateTagHeader, { borderColor: colors.accent + '50', backgroundColor: colors.accent + '10' }]}>
          <Text style={[styles.stateTagText, { color: colors.accent }]}>
            {stateName === 'Tamil Nadu' ? 'TN' : 'JH'}
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={[styles.loadingText, { color: colors.textMuted }]}>Loading {stateName} products...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={<NoResults searchQuery={searchQuery} category={selectedCategory} />}
          contentContainerStyle={products.length === 0 ? styles.emptyContent : styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={10}
          maxToRenderPerBatch={20}
          windowSize={10}
        />
      )}
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingTop: 44, paddingBottom: Spacing.md, borderBottomWidth: 1,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  backIcon: { fontSize: 20, fontWeight: '700' },
  headerCenter: { flex: 1, paddingHorizontal: Spacing.md },
  headerTitle: { fontSize: FontSize.xl, fontWeight: '800' },
  headerSub: { fontSize: FontSize.xs, marginTop: 1 },
  stateTagHeader: {
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: BorderRadius.md, borderWidth: 1, minWidth: 36, alignItems: 'center',
  },
  stateTagText: { fontSize: FontSize.sm, fontWeight: '800', letterSpacing: 1 },
  searchSection: { marginTop: Spacing.md, marginBottom: Spacing.xs },
  metaRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, borderBottomWidth: 1, marginBottom: Spacing.sm,
  },
  countBadge: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  countNumber: { fontSize: FontSize.xxl, fontWeight: '800' },
  countLabel: { fontSize: FontSize.sm, fontWeight: '500' },
  sortRow: { flexDirection: 'row', gap: 6 },
  sortChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: BorderRadius.round, borderWidth: 1 },
  sortChipText: { fontSize: FontSize.xs, fontWeight: '600' },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  loadingText: { fontSize: FontSize.md },
  listContent: { paddingBottom: 30 },
  emptyContent: { flex: 1, paddingBottom: 30 },
});
