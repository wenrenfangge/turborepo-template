<script setup lang="ts">
import type { SupportedLanguagesType } from '@repo/locales';

import { SUPPORT_LANGUAGES } from '@repo/constants';
import { Languages } from '@repo/icons';
import { loadLocaleMessages } from '@repo/locales';
import { preferences, updatePreferences } from '@repo/preferences';

import { repoDropdownRadioMenu, repoIconButton } from '@repo-core/shadcn-ui';

defineOptions({
  name: 'LanguageToggle',
});

async function handleUpdate(value: string | undefined) {
  if (!value) return;
  const locale = value as SupportedLanguagesType;
  updatePreferences({
    app: {
      locale,
    },
  });
  await loadLocaleMessages(locale);
}
</script>

<template>
  <div>
    <repoDropdownRadioMenu
      :menus="SUPPORT_LANGUAGES"
      :model-value="preferences.app.locale"
      @update:model-value="handleUpdate"
    >
      <repoIconButton>
        <Languages class="text-foreground size-4" />
      </repoIconButton>
    </repoDropdownRadioMenu>
  </div>
</template>
