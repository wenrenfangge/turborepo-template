<script setup lang="ts">
import { useAppConfig } from '@repo/hooks';
import { MdiGithub, MdiGoogle, MdiQqchat, MdiWechat } from '@repo/icons';
import { $t } from '@repo/locales';

import { repoIconButton } from '@repo-core/shadcn-ui';

import DingdingLogin from './dingding-login.vue';

defineOptions({
  name: 'ThirdPartyLogin',
});

const {
  auth: { dingding: dingdingAuthConfig },
} = useAppConfig(import.meta.env, import.meta.env.PROD);
</script>

<template>
  <div class="w-full sm:mx-auto md:max-w-md">
    <div class="mt-4 flex items-center justify-between">
      <span class="border-input w-[35%] border-b dark:border-gray-600"></span>
      <span class="text-muted-foreground text-center text-xs uppercase">
        {{ $t('authentication.thirdPartyLogin') }}
      </span>
      <span class="border-input w-[35%] border-b dark:border-gray-600"></span>
    </div>

    <div class="mt-4 flex flex-wrap justify-center">
      <repoIconButton
        :tooltip="$t('authentication.wechatLogin')"
        tooltip-side="top"
        class="mb-3"
      >
        <MdiWechat />
      </repoIconButton>
      <repoIconButton
        :tooltip="$t('authentication.qqLogin')"
        tooltip-side="top"
        class="mb-3"
      >
        <MdiQqchat />
      </repoIconButton>
      <repoIconButton
        :tooltip="$t('authentication.githubLogin')"
        tooltip-side="top"
        class="mb-3"
      >
        <MdiGithub />
      </repoIconButton>
      <repoIconButton
        :tooltip="$t('authentication.googleLogin')"
        tooltip-side="top"
        class="mb-3"
      >
        <MdiGoogle />
      </repoIconButton>
      <DingdingLogin
        v-if="dingdingAuthConfig"
        :corp-id="dingdingAuthConfig.corpId"
        :client-id="dingdingAuthConfig.clientId"
        class="mb-3"
      />
    </div>
  </div>
</template>
