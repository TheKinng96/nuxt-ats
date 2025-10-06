import type { LocaleMessages, AvailableLocale as Locale } from '~/i18n/locales'
import type { UseI18nOptions } from 'vue-i18n'

/**
 * Re-export locale type for easier access
 * Type: 'ja'
 */
export type AvailableLocale = Locale

/**
 * Deep key path type helper
 * Generates all possible nested key paths as string literals
 * Example: 'common.buttons.save' | 'common.buttons.cancel' | ...
 */
export type DeepKeyOf<T, K extends string = ''> = T extends object
  ? {
      [P in keyof T & string]: T[P] extends object
        ? DeepKeyOf<T[P], `${K}${P}.`>
        : `${K}${P}`
    }[keyof T & string]
  : never

/**
 * Translation key type
 * All valid translation paths for autocomplete
 */
export type TranslationKey = DeepKeyOf<LocaleMessages>

/**
 * Map of available locales and component message schemas
 * Used for component-level i18n with proper typing
 */
export type LocaleSchema<Schema = any> = Record<AvailableLocale, Schema>

/**
 * Schema for component-level i18n
 * Used internally by useComponentI18n for type inference
 */
export interface LocalI18nSchema<MessageSchema> {
  message: MessageSchema
  number: {}
  datetime: {}
}

/**
 * Options for useComponentI18n composable
 * Same as regular useI18n but with more specific typing for component messages
 */
export interface UseComponentI18nOptions<Messages extends LocaleSchema>
  extends Omit<UseI18nOptions<LocalI18nSchema<Messages['ja']>, AvailableLocale>, 'messages'> {
  /** Component-specific messages */
  messages: Messages
}

/**
 * Extend @nuxtjs/i18n types for autocomplete
 */
declare module '@nuxtjs/i18n' {
  interface I18nOptions {
    messages: {
      ja: LocaleMessages
    }
  }
}

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends LocaleMessages {}

  export interface DefineDateTimeFormat {}

  export interface DefineNumberFormat {}
}

export {}
