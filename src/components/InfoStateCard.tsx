import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/AppCard';
import { theme } from '@/theme';

type InfoStateCardProps = {
  title: string;
  text: string;
  variant?: 'default' | 'error' | 'loading';
};

export function InfoStateCard({
  title,
  text,
  variant = 'default',
}: InfoStateCardProps) {
  return (
    <AppCard>
      <View style={styles.container}>
        {variant === 'loading' ? <ActivityIndicator color={theme.colors.primary} /> : null}
        <Text
          style={[
            styles.title,
            variant === 'error' && styles.errorTitle,
          ]}
        >
          {title}
        </Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: '800',
  },
  errorTitle: {
    color: theme.colors.danger,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    color: theme.colors.textMuted,
  },
});
