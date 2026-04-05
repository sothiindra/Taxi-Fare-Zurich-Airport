import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { HistoryActionsCard } from '@/components/HistoryActionsCard';
import { LanguagePickerCard } from '@/components/LanguagePickerCard';
import { ScreenBackground } from '@/components/ScreenBackground';
import { SectionTitle } from '@/components/SectionTitle';
import { useSettings } from '@/providers/SettingsProvider';

export function SettingsScreen() {
  const { t } = useTranslation();
  const {
    language,
    ready,
    setLanguage,
    recentDestinations,
    clearRecentDestinations,
  } = useSettings();

  if (!ready) {
    return (
      <ScreenBackground>
        <SectionTitle eyebrow={t('common.settings')} title={t('settings.title')} />
      </ScreenBackground>
    );
  }

  async function handleClearHistory() {
    await clearRecentDestinations();
    Alert.alert(t('settings.title'), t('settings.clearHistorySuccess'));
  }

  return (
    <ScreenBackground>
      <SectionTitle
        eyebrow={t('common.settings')}
        title={t('settings.title')}
      />

      <LanguagePickerCard
        title={t('settings.languageTitle')}
        description={t('settings.languageDescription')}
        currentLanguage={language}
        onChange={(nextLanguage) => void setLanguage(nextLanguage)}
        labels={{
          de: t('common.german'),
          en: t('common.english'),
        }}
      />

      <HistoryActionsCard
        title={t('settings.recentsTitle')}
        description={t('settings.recentsDescription')}
        buttonLabel={t('settings.clearHistoryButton')}
        helperLabel={
          recentDestinations.length === 0
            ? t('settings.clearHistoryDisabled')
            : t('settings.clearHistoryHelper', { count: recentDestinations.length })
        }
        disabled={recentDestinations.length === 0}
        onClear={() => void handleClearHistory()}
      />
    </ScreenBackground>
  );
}
