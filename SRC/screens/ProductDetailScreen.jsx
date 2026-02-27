import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar,
} from 'react-native';
import { getProductVariants } from '../DATA/dataUtils';
import { CategoryBadge } from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';
import { getCategoryColor, Spacing, FontSize, BorderRadius } from '../utils/theme';

const PACK_ORDER = ['60ML','90ML','180ML','200ML','275ML','300ML','375ML','500ML','650ML','750ML','1000ML','1LTR'];

const sortPackSizes = variants =>
  [...variants].sort((a, b) => {
    const ai = PACK_ORDER.findIndex(p => a.packSize.includes(p));
    const bi = PACK_ORDER.findIndex(p => b.packSize.includes(p));
    if (ai === -1 && bi === -1) return a.mrp - b.mrp;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

const ProductDetailScreen = ({ navigation, route }) => {
  const { colors, isDark } = useTheme();
  const { item, stateKey = 'jharkhand' } = route.params;
  const allVariants = getProductVariants(item.brandName, item.labelName, stateKey);
  const sortedVariants = sortPackSizes(allVariants);
  const catColor = getCategoryColor(item.category, isDark);
  const cheapest = Math.min(...allVariants.map(v => v.mrp));
  const mostExpensive = Math.max(...allVariants.map(v => v.mrp));

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
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Product Detail</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Hero Card */}
        <View style={[styles.heroCard, { backgroundColor: colors.card, borderColor: catColor.border + '60' }]}>
          <View style={[styles.heroGlow, { backgroundColor: catColor.bg }]} />
          <View style={styles.heroTop}>
            <CategoryBadge category={item.category} size="lg" />
            <View style={[styles.stateTag, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.stateTagText, { color: colors.textMuted }]}>🏛️ {item.state}</Text>
            </View>
          </View>
          <Text style={[styles.heroLabel, { color: colors.textPrimary }]}>{item.labelName}</Text>
          <Text style={[styles.heroBrand, { color: colors.textSecondary }]}>{item.brandName}</Text>
          <View style={[styles.yearBadge, { backgroundColor: colors.accent + '15', borderColor: colors.accent + '30' }]}>
            <Text style={[styles.yearText, { color: colors.accent }]}>📅 {item.year}</Text>
          </View>
        </View>

        {/* Price Summary */}
        {allVariants.length > 1 && (
          <View style={[styles.priceSummary, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Starting From</Text>
              <Text style={[styles.summaryValue, { color: colors.accent }]}>₹{cheapest}</Text>
            </View>
            <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Up To</Text>
              <Text style={[styles.summaryValue, { color: colors.textSecondary }]}>₹{mostExpensive}</Text>
            </View>
            <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Pack Sizes</Text>
              <Text style={[styles.summaryValue, { color: colors.accent }]}>{allVariants.length}</Text>
            </View>
          </View>
        )}

        {/* Pack Sizes */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Available Pack Sizes & MRP</Text>
          {sortedVariants.map((variant, index) => (
            <View
              key={`${variant.packSize}-${index}`}
              style={[
                styles.variantRow,
                { backgroundColor: colors.card, borderColor: colors.border },
                index === 0 && { borderColor: colors.accent + '50', backgroundColor: colors.accent + '08' },
              ]}>
              <View style={styles.variantLeft}>
                <View style={[styles.packIndexDot, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Text style={[styles.packIndexText, { color: colors.textMuted }]}>{index + 1}</Text>
                </View>
                <View>
                  <Text style={[styles.variantPackSize, { color: colors.textPrimary }]}>{variant.packSize}</Text>
                  <Text style={[styles.variantDate, { color: colors.textMuted }]}>Eff. {variant.effectiveDate}</Text>
                </View>
              </View>
              <View style={styles.variantRight}>
                <Text style={[styles.variantMRP, { color: colors.accent }]}>₹{variant.mrp.toFixed(0)}</Text>
                <Text style={[styles.variantMRPLabel, { color: colors.textMuted }]}>MRP</Text>
                {index === 0 && allVariants.length > 1 && (
                  <View style={[styles.cheapestBadge, { backgroundColor: colors.success + '20', borderColor: colors.success + '50' }]}>
                    <Text style={[styles.cheapestText, { color: colors.success }]}>Best Value</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Info Card */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Details</Text>
          <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {[
              { label: 'State', value: item.state },
              { label: 'Financial Year', value: item.year },
              { label: 'Category', value: item.category },
              { label: 'Effective Date', value: item.effectiveDate },
              { label: 'Manufacturer', value: item.brandName },
            ].map(({ label, value }) => (
              <View key={label} style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>{label}</Text>
                <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Disclaimer */}
        <View style={[styles.disclaimer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.disclaimerText, { color: colors.textMuted }]}>
            {'⚠️ Prices are official MRP as per ' + item.state + ' excise authority.\nActual prices may vary at retail outlets. 18+ only.'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingTop: 44, paddingBottom: Spacing.md, borderBottomWidth: 1,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  backIcon: { fontSize: 20, fontWeight: '700' },
  headerTitle: { fontSize: FontSize.xl, fontWeight: '700' },
  scrollContent: { paddingBottom: 40 },
  heroCard: {
    margin: Spacing.lg, borderRadius: BorderRadius.xl, padding: Spacing.xl,
    borderWidth: 1, overflow: 'hidden', elevation: 8,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12,
  },
  heroGlow: {
    position: 'absolute', top: 0, right: 0, width: 150, height: 150, borderRadius: 75,
    opacity: 0.2, transform: [{ translateX: 50 }, { translateY: -50 }],
  },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.lg },
  stateTag: { borderRadius: BorderRadius.round, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1 },
  stateTagText: { fontSize: FontSize.xs, fontWeight: '600' },
  heroLabel: { fontSize: FontSize.xxl, fontWeight: '800', lineHeight: 30, marginBottom: Spacing.sm },
  heroBrand: { fontSize: FontSize.md, fontWeight: '500', marginBottom: Spacing.lg, lineHeight: 20 },
  yearBadge: { borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md, paddingVertical: 6, borderWidth: 1, alignSelf: 'flex-start' },
  yearText: { fontSize: FontSize.sm, fontWeight: '600' },
  priceSummary: {
    flexDirection: 'row', marginHorizontal: Spacing.lg, marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.lg,
  },
  summaryItem: { flex: 1, alignItems: 'center', gap: 4 },
  summaryLabel: { fontSize: FontSize.xs, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  summaryValue: { fontSize: FontSize.xl, fontWeight: '800' },
  summaryDivider: { width: 1, height: '80%', alignSelf: 'center' },
  section: { marginHorizontal: Spacing.lg, marginTop: Spacing.md },
  sectionTitle: { fontSize: FontSize.sm, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: Spacing.md },
  variantRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1,
  },
  variantLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  packIndexDot: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  packIndexText: { fontSize: FontSize.xs, fontWeight: '700' },
  variantPackSize: { fontSize: FontSize.md, fontWeight: '700' },
  variantDate: { fontSize: FontSize.xs, marginTop: 2 },
  variantRight: { alignItems: 'flex-end', gap: 2 },
  variantMRP: { fontSize: FontSize.xxl, fontWeight: '800' },
  variantMRPLabel: { fontSize: FontSize.xs, fontWeight: '600', letterSpacing: 0.5 },
  cheapestBadge: { borderRadius: BorderRadius.round, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, marginTop: 2 },
  cheapestText: { fontSize: FontSize.xs, fontWeight: '700' },
  infoCard: { borderRadius: BorderRadius.lg, borderWidth: 1, overflow: 'hidden' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: 12, borderBottomWidth: 1 },
  infoLabel: { fontSize: FontSize.sm, fontWeight: '500' },
  infoValue: { fontSize: FontSize.sm, fontWeight: '700', flex: 1, textAlign: 'right' },
  disclaimer: { marginHorizontal: Spacing.lg, marginTop: Spacing.xl, borderRadius: BorderRadius.md, padding: Spacing.md, borderWidth: 1 },
  disclaimerText: { fontSize: FontSize.xs, lineHeight: 18, textAlign: 'center' },
});
