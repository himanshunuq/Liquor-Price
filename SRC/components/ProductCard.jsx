import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getCategoryColor, Spacing, FontSize, BorderRadius } from '../utils/theme';

const CategoryBadge = ({ category, size = 'sm' }) => {
  const { isDark } = useTheme();
  const color = getCategoryColor(category, isDark);
  const isLarge = size === 'lg';
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: color.bg,
          borderColor: color.border,
          paddingHorizontal: isLarge ? 10 : 6,
          paddingVertical: isLarge ? 4 : 2,
        },
      ]}>
      <Text
        style={[
          styles.badgeText,
          { color: color.text, fontSize: isLarge ? FontSize.sm : FontSize.xs },
        ]}>
        {category}
      </Text>
    </View>
  );
};

const ProductCard = ({ item, onPress }) => {
  const { colors, isDark } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, {
        backgroundColor: colors.card,
        borderColor: colors.border,
        shadowColor: isDark ? '#000' : colors.accent,
      }]}
      activeOpacity={0.85}
      onPress={onPress}>
      {/* Top row */}
      <View style={styles.topRow}>
        <CategoryBadge category={item.category} />
        <View style={[styles.packSizePill, { backgroundColor: colors.surfaceLight, borderColor: colors.border }]}>
          <Text style={[styles.packSizeText, { color: colors.textSecondary }]}>{item.packSize}</Text>
        </View>
      </View>

      {/* Label Name */}
      <Text style={[styles.labelName, { color: colors.textPrimary }]} numberOfLines={2}>
        {item.labelName}
      </Text>

      {/* Brand Name */}
      <Text style={[styles.brandName, { color: colors.textSecondary }]} numberOfLines={1}>
        {item.brandName}
      </Text>

      {/* Bottom row */}
      <View style={styles.bottomRow}>
        <View style={styles.mrpContainer}>
          <Text style={[styles.mrpLabel, { color: colors.textMuted }]}>MRP</Text>
          <Text style={[styles.mrpValue, { color: colors.accent }]}>₹{item.mrp.toFixed(0)}</Text>
        </View>
        <Text style={[styles.viewDetail, { color: colors.accentLight }]}>View Details →</Text>
      </View>

      {/* Gold accent line */}
      <View style={[styles.accentLine, { backgroundColor: colors.accent }]} />
    </TouchableOpacity>
  );
};

export { CategoryBadge };
export default ProductCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  badge: {
    borderRadius: BorderRadius.round,
    borderWidth: 1,
  },
  badgeText: { fontWeight: '700', letterSpacing: 0.5 },
  packSizePill: {
    borderRadius: BorderRadius.round,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
  },
  packSizeText: { fontSize: FontSize.xs, fontWeight: '600', letterSpacing: 0.5 },
  labelName: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 22,
  },
  brandName: {
    fontSize: FontSize.sm,
    fontWeight: '500',
    marginBottom: Spacing.md,
    letterSpacing: 0.3,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  mrpContainer: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  mrpLabel: { fontSize: FontSize.xs, fontWeight: '600', letterSpacing: 0.5 },
  mrpValue: { fontSize: FontSize.xxl, fontWeight: '800', letterSpacing: -0.5 },
  viewDetail: { fontSize: FontSize.xs, fontWeight: '600', opacity: 0.8 },
  accentLine: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, opacity: 0.4,
  },
});
