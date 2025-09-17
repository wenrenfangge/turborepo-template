import type {
  BaseFormComponentType,
  ExtendedFormApi,
  repoFormProps,
} from './types';

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';

import { useStore } from '@repo-core/shared/store';

import { FormApi } from './form-api';
import repoUseForm from './repo-use-form.vue';

export function userepoForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: repoFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Form = defineComponent(
    (props: repoFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () =>
        h(repoUseForm, { ...props, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'RepoUseForm',
      inheritAttrs: false,
    },
  );
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        api.setState({ schema: options.schema });
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
