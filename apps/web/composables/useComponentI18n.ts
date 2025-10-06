import { useI18n } from 'vue-i18n'
import type { LocaleSchema, LocalI18nSchema, AvailableLocale, UseComponentI18nOptions } from '~/types/i18n'

/**
 * Component-level i18n composable with full TypeScript autocomplete
 *
 * This composable uses Vue I18n's local scope feature to provide component-specific
 * translations with full type safety and autocomplete for both component and global keys.
 *
 * @example
 * ```ts
 * // In ComponentName.locale.ja.ts
 * export default {
 *   componentName: {
 *     title: 'タイトル',
 *     description: '説明'
 *   }
 * }
 *
 * // In ComponentName.vue
 * import ja from './ComponentName.locale.ja'
 * const { t } = useComponentI18n({ messages: { ja } })
 *
 * // Full autocomplete works!
 * t('componentName.title') // 'タイトル' - component-level key
 * t('common.buttons.save') // Access global translations too
 * ```
 *
 * @param options - Component i18n options with messages
 * @returns i18n instance with typed t() function for autocomplete
 */
export function useComponentI18n<Messages extends LocaleSchema>(
  options: UseComponentI18nOptions<Messages>
) {
  return useI18n<LocalI18nSchema<Messages['ja']>, AvailableLocale>({
    useScope: 'local',
    ...options,
  })
}
