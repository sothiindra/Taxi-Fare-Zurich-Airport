import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppCard } from '@/components/AppCard';
import { theme } from '@/theme';
import type { DestinationSuggestion } from '@/types/google';

type DestinationSearchCardProps = {
  query: string;
  onChangeText: (value: string) => void;
  selectedLabel?: string;
  suggestions: DestinationSuggestion[];
  showSuggestions: boolean;
  suggestionsEmptyLabel?: string;
  onSelectSuggestion: (suggestion: DestinationSuggestion) => void;
};

export function DestinationSearchCard({
  query,
  onChangeText,
  selectedLabel,
  suggestions,
  showSuggestions,
  suggestionsEmptyLabel,
  onSelectSuggestion,
}: DestinationSearchCardProps) {
  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [inputLayout, setInputLayout] = useState({
    pageY: 0,
    height: 56,
  });
  const comboBoxRef = useRef<View>(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  function updateMeasuredLayout(heightOverride?: number) {
    comboBoxRef.current?.measureInWindow((_x, y, _width, height) => {
      setInputLayout({
        pageY: y,
        height: heightOverride ?? height,
      });
    });
  }

  function handleInputLayout(event: LayoutChangeEvent) {
    const { height } = event.nativeEvent.layout;
    updateMeasuredLayout(height);
  }

  useEffect(() => {
    updateMeasuredLayout();
  }, [keyboardHeight, query, showSuggestions, windowHeight]);

  const spaceBelow = windowHeight - (inputLayout.pageY + inputLayout.height) - keyboardHeight - 24;
  const shouldOpenAbove = showSuggestions && keyboardHeight > 0 && spaceBelow < 220;
  const dropdownMaxHeight = shouldOpenAbove
    ? Math.max(180, inputLayout.pageY - 24)
    : Math.max(180, spaceBelow);

  return (
    <View style={styles.root}>
      <AppCard>
        <View style={styles.headerRow}>
          <Text style={styles.label}>{t('common.destination')}</Text>
          {selectedLabel ? <Text style={styles.selected}>{selectedLabel}</Text> : null}
        </View>

        <View style={styles.comboArea}>
          <View ref={comboBoxRef} style={styles.comboBox} onLayout={handleInputLayout}>
            <TextInput
              value={query}
              onChangeText={onChangeText}
              placeholder={t('home.destinationPlaceholder')}
              placeholderTextColor={theme.colors.textMuted}
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="search"
            />
          </View>

          {showSuggestions ? (
            <View
              style={[
                styles.localDropdown,
                shouldOpenAbove ? styles.localDropdownAbove : styles.localDropdownBelow,
                { maxHeight: dropdownMaxHeight },
              ]}
            >
              <View style={styles.dropdownWrapper}>
                <Text style={styles.dropdownTitle}>{t('home.destinationDropdownLabel')}</Text>

                {suggestions.length === 0 && suggestionsEmptyLabel ? (
                  <Text style={styles.empty}>{suggestionsEmptyLabel}</Text>
                ) : (
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    nestedScrollEnabled
                    style={styles.dropdownScroll}
                    contentContainerStyle={styles.dropdownContent}
                    showsVerticalScrollIndicator
                  >
                    {suggestions.map((item) => (
                      <Pressable
                        key={item.placeId}
                        onPress={() => onSelectSuggestion(item)}
                        style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
                      >
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        {item.subtitle ? <Text style={styles.itemSubtitle}>{item.subtitle}</Text> : null}
                      </Pressable>
                    ))}
                  </ScrollView>
                )}

                <Text style={styles.poweredBy}>{t('common.poweredByGoogle')}</Text>
              </View>
            </View>
          ) : null}
        </View>

        <Text style={styles.hint}>{t('home.destinationHint')}</Text>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    zIndex: 20,
    elevation: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  label: {
    color: theme.colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  selected: {
    color: theme.colors.success,
    fontWeight: '700',
    fontSize: 13,
  },
  comboBox: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#FBFDFF',
    overflow: 'hidden',
  },
  input: {
    minHeight: 56,
    paddingHorizontal: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  hint: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  comboArea: {
    position: 'relative',
  },
  localDropdown: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 60,
  },
  localDropdownBelow: {
    top: 64,
  },
  localDropdownAbove: {
    bottom: 64,
  },
  dropdownWrapper: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#FBFDFF',
    shadowColor: '#102542',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 10,
  },
  dropdownTitle: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dropdownScroll: {
    minHeight: 80,
  },
  dropdownContent: {
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  empty: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  item: {
    borderRadius: theme.radius.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  itemPressed: {
    opacity: 0.88,
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
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
});
