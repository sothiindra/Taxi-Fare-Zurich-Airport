import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/AppCard';
import { theme } from '@/theme';
import type { AppLanguage } from '@/types/location';

type LanguagePickerCardProps = {
  title: string;
  description: string;
  currentLanguage: AppLanguage;
  onChange: (language: AppLanguage) => void;
  labels: Record<AppLanguage, string>;
};

export function LanguagePickerCard({
  title,
  description,
  currentLanguage,
  onChange,
  labels,
}: LanguagePickerCardProps) {
  return (
    <AppCard>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.segmented}>
          {(['de', 'en'] as AppLanguage[]).map((language) => {
            const active = currentLanguage === language;

            return (
              <Pressable
                key={language}
                onPress={() => onChange(language)}
                style={({ pressed }) => [
                  styles.option,
                  active && styles.optionActive,
                  pressed && styles.optionPressed,
                ]}
              >
                <Text style={[styles.optionText, active && styles.optionTextActive]}>
                  {labels[language]}
                </Text>
              </Pressable>
            );
          })}
        </View>
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
  segmented: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: 4,
  },
  option: {
    flex: 1,
    minHeight: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#FBFDFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  optionPressed: {
    opacity: 0.92,
  },
  optionText: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
});
