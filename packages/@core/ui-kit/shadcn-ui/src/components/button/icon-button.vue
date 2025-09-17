<script setup lang="ts">
import type { ButtonVariants } from '../../ui';
import type { repoButtonProps } from './button';

import { computed, useSlots } from 'vue';

import { cn } from '@repo-core/shared/utils';

import { repoTooltip } from '../tooltip';
import repoButton from './button.vue';

interface Props extends repoButtonProps {
  class?: any;
  disabled?: boolean;
  onClick?: () => void;
  tooltip?: string;
  tooltipDelayDuration?: number;
  tooltipSide?: 'bottom' | 'left' | 'right' | 'top';
  variant?: ButtonVariants;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  onClick: () => {},
  tooltipDelayDuration: 200,
  tooltipSide: 'bottom',
  variant: 'icon',
});

const slots = useSlots();

const showTooltip = computed(() => !!slots.tooltip || !!props.tooltip);
</script>

<template>
  <repoButton
    v-if="!showTooltip"
    :class="cn('rounded-full', props.class)"
    :disabled="disabled"
    :variant="variant"
    size="icon"
    @click="onClick"
  >
    <slot></slot>
  </repoButton>

  <repoTooltip
    v-else
    :delay-duration="tooltipDelayDuration"
    :side="tooltipSide"
  >
    <template #trigger>
      <repoButton
        :class="cn('rounded-full', props.class)"
        :disabled="disabled"
        :variant="variant"
        size="icon"
        @click="onClick"
      >
        <slot></slot>
      </repoButton>
    </template>
    <slot v-if="slots.tooltip" name="tooltip"> </slot>
    <template v-else>
      {{ tooltip }}
    </template>
  </repoTooltip>
</template>
