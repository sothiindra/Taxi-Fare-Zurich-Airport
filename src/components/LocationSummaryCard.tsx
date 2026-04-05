import { StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/AppCard';
import { theme } from '@/theme';

type LocationSummaryCardProps = {
  label: string;
  value: string;
  badge: string;
};

export function LocationSummaryCard({
  label,
  value,
  badge,
}: LocationSummaryCardProps) {
  return (
    <AppCard>
      <View style={styles.row}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
        <View style={styles.copy}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: theme.colors.primary,
    fontWeight: '800',
    fontSize: 16,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 13,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  value: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: '700',
  },
});
