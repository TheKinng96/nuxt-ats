import ja from './ja'

export type LocaleMessages = typeof ja

export const messages = {
  ja,
}

export const availableLocales = ['ja'] as const
export type AvailableLocale = typeof availableLocales[number]

export default messages
