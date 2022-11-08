import * as prism from 'prismjs';

export as namespace codeflask

export type LanguageDefinition = {
  [token: string]: prism.LanguageDefinition | RegExp
}

export interface CodeFlaskOptions {
  language?: string
  tabSize?: number
  autocorrect?: boolean
  defaultTheme?: boolean
  readonly?: boolean
  handleTabs?: boolean
}

export default class CodeFlask {
  constructor(selectorOrElement: Element | string, opts: CodeFlaskOptions)

  updateCode(newCode: string): void 
  updateLanguage(newLanguage: string): void
  addLanguage(name: string, options: LanguageDefinition): void

  getCode(): string
  onUpdate(callback: (code: string) => void): void

  disableReadonlyMode(): void
  enableReadonlyMode(): void
}
