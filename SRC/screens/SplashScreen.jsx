import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, FontSize } from '../utils/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(20)).current;
  const badgeOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence: logo bounces in → title fades up → badge + glow appear
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(100),
      Animated.timing(badgeOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to home after 2.8s
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigation, logoScale, logoOpacity, textOpacity, textTranslate, badgeOpacity, glowOpacity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Background glow */}
      <Animated.View style={[styles.glowCircle, { opacity: glowOpacity }]} />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}>
        <Text style={styles.logoEmoji}>🍾</Text>
        <View style={styles.logoRing} />
      </Animated.View>

      {/* App Name */}
      <Animated.View
        style={{
          opacity: textOpacity,
          transform: [{ translateY: textTranslate }],
          alignItems: 'center',
        }}>
        <Text style={styles.appName}>Liquor Price</Text>
        <Text style={styles.appSubName}>Jharkhand</Text>
        <View style={styles.divider} />
        <Text style={styles.tagline}>Official Rate List 2025-26</Text>
      </Animated.View>

      {/* State Badge */}
      <Animated.View style={[styles.badge, { opacity: badgeOpacity }]}>
        <Text style={styles.badgeText}>🏛️  JSBCL — Jharkhand</Text>
      </Animated.View>

      {/* Bottom dots */}
      <Animated.View style={[styles.dotsRow, { opacity: badgeOpacity }]}>
        {[0, 1, 2].map(i => (
          <View
            key={i}
            style={[styles.dot, i === 1 && styles.dotActive]}
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
  },
  glowCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.accent,
    opacity: 0.06,
    top: height / 2 - 200,
  },
  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.accent + '60',
    elevation: 20,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  logoRing: {
    position: 'absolute',
    width: 126,
    height: 126,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: Colors.accent + '30',
  },
  logoEmoji: {
    fontSize: 52,
  },
  appName: {
    color: Colors.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  appSubName: {
    color: Colors.textPrimary,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: -4,
  },
  divider: {
    width: 50,
    height: 2,
    backgroundColor: Colors.accent,
    borderRadius: 2,
    marginVertical: Spacing.md,
    opacity: 0.8,
  },
  tagline: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    letterSpacing: 1,
    fontWeight: '500',
    textAlign: 'center',
  },
  badge: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badgeText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  dotsRow: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.textMuted,
  },
  dotActive: {
    width: 20,
    backgroundColor: Colors.accent,
  },
});
