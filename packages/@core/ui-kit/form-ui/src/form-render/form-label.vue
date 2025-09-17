<script setup lang="ts">
import type { CustomRenderType } from '../types';

import {
  FormLabel,
  repoHelpTooltip,
  repoRenderContent,
} from '@repo-core/shadcn-ui';
import { cn } from '@repo-core/shared/utils';

interface Props {
  class?: string;
  colon?: boolean;
  help?: CustomRenderType;
  label?: CustomRenderType;
  required?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <FormLabel :class="cn('flex items-center', props.class)">
    <span v-if="required" class="text-destructive mr-[2px]">*</span>
    <slot></slot>
    <repoHelpTooltip v-if="help" trigger-class="size-3.5 ml-1">
      <repoRenderContent :content="help" />
    </repoHelpTooltip>
    <span v-if="colon && label" class="ml-[2px]">:</span>
  </FormLabel>
</template>
