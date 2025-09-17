<script setup lang="ts">
import type { AuthPageLayoutType } from '@repo/types';

import type { repoDropdownMenuItem } from '@repo-core/shadcn-ui';

import { computed } from 'vue';

import { InspectionPanel, PanelLeft, PanelRight } from '@repo/icons';
import { $t } from '@repo/locales';
import {
  preferences,
  updatePreferences,
  usePreferences,
} from '@repo/preferences';

import { repoDropdownRadioMenu, repoIconButton } from '@repo-core/shadcn-ui';

defineOptions({
  name: 'AuthenticationLayoutToggle',
});

const menus = computed((): repoDropdownMenuItem[] => [
  {
    icon: PanelLeft,
    label: $t('authentication.layout.alignLeft'),
    value: 'panel-left',
  },
  {
    icon: InspectionPanel,
    label: $t('authentication.layout.center'),
    value: 'panel-center',
  },
  {
    icon: PanelRight,
    label: $t('authentication.layout.alignRight'),
    value: 'panel-right',
  },
]);

const { authPanelCenter, authPanelLeft, authPanelRight } = usePreferences();

function handleUpdate(value: string | undefined) {
  if (!value) return;
  updatePreferences({
    app: {
      authPageLayout: value as AuthPageLayoutType,
    },
  });
}
</script>

<template>
  <repoDropdownRadioMenu
    :menus="menus"
    :model-value="preferences.app.authPageLayout"
    @update:model-value="handleUpdate"
  >
    <repoIconButton>
      <PanelRight v-if="authPanelRight" class="size-4" />
      <PanelLeft v-if="authPanelLeft" class="size-4" />
      <InspectionPanel v-if="authPanelCenter" class="size-4" />
    </repoIconButton>
  </repoDropdownRadioMenu>
</template>
