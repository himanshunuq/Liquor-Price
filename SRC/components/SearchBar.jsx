import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Spacing, FontSize, BorderRadius } from '../utils/theme';

const SearchBar = ({ value, onChangeText, onSubmit, placeholder = 'Search brand, label, category...' }) => {
  const { colors } = useTheme();

  return (
    <View style={[
      styles.container,
      { backgroundColor: colors.surface, borderColor: colors.border },
    ]}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={[styles.input, { color: colors.textPrimary }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearBtn}>
          <Text style={[styles.clearText, { color: colors.textMuted }]}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  icon: { fontSize: FontSize.lg, marginRight: Spacing.sm },
  input: { flex: 1, fontSize: FontSize.md, fontWeight: '500', padding: 0 },
  clearBtn: { padding: 4, marginLeft: Spacing.sm },
  clearText: { fontSize: FontSize.md, fontWeight: '700' },
});
