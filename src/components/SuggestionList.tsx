import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppCard } from '@/components/AppCard';
import { theme } from '@/theme';
import type { DestinationSuggestion } from '@/types/location';

type SuggestionListProps = {
  suggestions: DestinationSuggestion[];
  onSelect: (suggestion: DestinationSuggestion) => void;
  title?: string;
  emptyLabel?: string;
};

export function SuggestionList({
  suggestions,
  onSelect,
  title,
  emptyLabel,
}: SuggestionListProps) {
  const { t } = useTranslation();

  return (
    <AppCard>
      <View style={styles.container}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {suggestions.length === 0 && emptyLabel ? (
          <Text style={styles.empty}>{emptyLabel}</Text>
        ) : null}
        {suggestions.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item)}
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
            {item.subtitle ? <Text style={styles.itemSubtitle}>{item.subtitle}</Text> : null}
          </Pressable>
        ))}
        <Text style={styles.poweredBy}>{t('common.poweredByHere')}</Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  empty: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  item: {
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: '#FBFDFF',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  itemPressed: {
    opacity: 0.9,
  },
  itemTitle: {
    fontSize: 15,
    color: theme.colors.text,
    fontWeight: '700',
  },
  itemSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  poweredBy: {
    marginTop: 4,
    fontSize: 12,
    color: theme.colors.textMuted,
    textAlign: 'right',
    fontWeight: '600',
  },
});
