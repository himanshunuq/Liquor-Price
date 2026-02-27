import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Spacing, FontSize, BorderRadius } from '../utils/theme';

const NoResults = ({ searchQuery, category }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={styles.iconText}>🍷</Text>
      </View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>No Products Found</Text>
      {searchQuery ? (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          No results for{' '}
          <Text style={[styles.query, { color: colors.accent }]}>"{searchQuery}"</Text>
        </Text>
      ) : category && category !== 'All' ? (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          No products in{' '}
          <Text style={[styles.query, { color: colors.accent }]}>{category}</Text> category
        </Text>
      ) : (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Try a different search or filter
        </Text>
      )}
      <View style={[styles.hintContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.hint, { color: colors.textMuted }]}>
          💡 Try searching by brand name, label, or category
        </Text>
      </View>
    </View>
  );
};

export default NoResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: 60,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  iconText: { fontSize: 40 },
  title: { fontSize: FontSize.xxl, fontWeight: '700', marginBottom: Spacing.sm, textAlign: 'center' },
  subtitle: { fontSize: FontSize.md, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xl },
  query: { fontWeight: '700' },
  hintContainer: {
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
  },
  hint: { fontSize: FontSize.sm, textAlign: 'center', lineHeight: 18 },
});
