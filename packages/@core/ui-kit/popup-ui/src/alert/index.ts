export type {
  AlertProps,
  BeforeCloseScope,
  IconType,
  PromptProps,
} from './alert';
export { useAlertContext } from './alert';
export { default as Alert } from './alert.vue';
export {
  repoAlert as alert,
  clearAllAlerts,
  repoConfirm as confirm,
  repoPrompt as prompt,
} from './AlertBuilder';
