import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/AppCard';
import { theme } from '@/theme';

type HistoryActionsCardProps = {
  title: string;
  description: string;
  buttonLabel: string;
  helperLabel: string;
  disabled?: boolean;
  onClear: () => void;
};

export function HistoryActionsCard({
  title,
  description,
  buttonLabel,
  helperLabel,
  disabled = false,
  onClear,
}: HistoryActionsCardProps) {
  return (
    <AppCard>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Pressable
          onPress={onClear}
          disabled={disabled}
          style={({ pressed }) => [
            styles.button,
            disabled && styles.buttonDisabled,
            pressed && !disabled && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
            {buttonLabel}
          </Text>
        </Pressable>
        <Text style={styles.helper}>{helperLabel}</Text>
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
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.textMuted,
  },
  button: {
    minHeight: 50,
    borderRadius: theme.radius.md,
    backgroundColor: '#FFF3F1',
    borderWidth: 1,
    borderColor: '#FFD2CB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#F4F5F7',
    borderColor: theme.colors.border,
  },
  buttonPressed: {
    opacity: 0.92,
  },
  buttonText: {
    color: theme.colors.danger,
    fontSize: 15,
    fontWeight: '700',
  },
  buttonTextDisabled: {
    color: theme.colors.textMuted,
  },
  helper: {
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textMuted,
  },
});
