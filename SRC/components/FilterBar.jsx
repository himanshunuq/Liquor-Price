import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getCategoryColor, Spacing, FontSize, BorderRadius } from '../utils/theme';

// All possible categories across all states
const FILTER_CATEGORIES = [
  'All', 'Whisky', 'Beer', 'Rum', 'Vodka', 'Wine',
  'Gin', 'CL', 'Brandy', 'LAB', 'Tequila', 'Liqueur',
];

const FilterBar = ({ selected, onSelect }) => {
  const { colors, isDark } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scroll}>
      {FILTER_CATEGORIES.map(cat => {
        const isSelected = selected === cat;
        const color = cat === 'All' ? null : getCategoryColor(cat, isDark);

        return (
          <TouchableOpacity
            key={cat}
            activeOpacity={0.75}
            onPress={() => onSelect(cat)}
            style={[
              styles.pill,
              isSelected
                ? {
                    backgroundColor: color ? color.bg : colors.accent + '30',
                    borderColor: color ? color.border : colors.accent,
                  }
                : { backgroundColor: colors.surface, borderColor: colors.border },
            ]}>
            <Text
              style={[
                styles.pillText,
                isSelected
                  ? { color: color ? color.text : colors.accent, fontWeight: '700' }
                  : { color: colors.textSecondary, fontWeight: '500' },
              ]}>
              {cat === 'All' ? '✦ All' : cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  scroll: { marginBottom: Spacing.md },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
  },
  pillText: { fontSize: FontSize.sm, letterSpacing: 0.3 },
});
