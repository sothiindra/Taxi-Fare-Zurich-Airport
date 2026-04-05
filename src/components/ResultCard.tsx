import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppCard } from '@/components/AppCard';
import { theme } from '@/theme';
import type { AppLanguage, FareBreakdown } from '@/types/google';
import { formatChf, formatDistanceKm, formatMinutes } from '@/utils/format';

type ResultCardProps = {
  breakdown: FareBreakdown;
  language: AppLanguage;
};

function ResultRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, emphasized && styles.emphasizedLabel]}>{label}</Text>
      <Text style={[styles.rowValue, emphasized && styles.emphasizedValue]}>{value}</Text>
    </View>
  );
}

export function ResultCard({ breakdown, language }: ResultCardProps) {
  const { t } = useTranslation();

  return (
    <AppCard>
      <View style={styles.header}>
        <Text style={styles.title}>{t('home.resultTitle')}</Text>
        <Text style={styles.total}>{formatChf(breakdown.total, language)}</Text>
      </View>

      <View style={styles.section}>
        <ResultRow label={t('home.baseFare')} value={formatChf(breakdown.baseFare, language)} />
        <ResultRow
          label={t('home.distanceCost')}
          value={formatChf(breakdown.distanceCost, language)}
        />
        <ResultRow label={t('home.timeCost')} value={formatChf(breakdown.timeCost, language)} />
        <View style={styles.divider} />
        <ResultRow
          label={t('home.totalFare')}
          value={formatChf(breakdown.total, language)}
          emphasized
        />
      </View>

      <View style={styles.metaGrid}>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>{t('home.distance')}</Text>
          <Text style={styles.metaValue}>{formatDistanceKm(breakdown.distanceKm, language)}</Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>{t('home.duration')}</Text>
          <Text style={styles.metaValue}>{formatMinutes(breakdown.durationMinutes, language)}</Text>
        </View>
      </View>

      <Text style={styles.trafficHint}>{t('home.trafficHint')}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: theme.spacing.lg,
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: theme.colors.textMuted,
  },
  total: {
    fontSize: 34,
    lineHeight: 40,
    color: theme.colors.cardHighlight,
    fontWeight: '800',
  },
  section: {
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  rowLabel: {
    fontSize: 15,
    color: theme.colors.textMuted,
  },
  rowValue: {
    fontSize: 15,
    color: theme.colors.text,
    fontWeight: '700',
  },
  emphasizedLabel: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  emphasizedValue: {
    color: theme.colors.primary,
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 4,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  metaCard: {
    flex: 1,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceMuted,
    padding: theme.spacing.md,
    gap: 4,
  },
  metaLabel: {
    fontSize: 13,
    color: theme.colors.textMuted,
    fontWeight: '700',
  },
  metaValue: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: '800',
  },
  trafficHint: {
    marginTop: theme.spacing.lg,
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textMuted,
  },
});
