export enum SettingLanguageDisplayFormat {
  Card = 'card',
  List = 'list'
}

export enum SettingAppLanguage {
  EnUS = 'en-US',
  EsES = 'es-ES',
  FrFR = 'fr-FR'
}

export enum SettingAppTheme {
  DeeppurpleAmber = 'deeppurple-amber',
  IndigoPink = 'indigo-pink',
  PinkBluegrey = 'pink-bluegrey',
  PurpleGreen = 'purple-green'
}

export class Settings {

  customTranslationsPathEnabled: boolean;
  customTranslationsPath: string | null;
  enableSortAscJson: boolean;
  keepLanguagesEdit: boolean;
  locale: string;
  theme: string;
  selectedDisplayFormat: string;

  constructor(
    customTranslationsPathEnabled: boolean = false, 
    customTranslationsPath: string | null = null, 
    enableSortAscJson: boolean = true, 
    keepLanguagesEdit: boolean = false,
    locale: string = SettingAppLanguage.EnUS,
    theme: string = SettingAppTheme.PurpleGreen,
    selectedDisplayFormat: string = SettingLanguageDisplayFormat.Card
  ) {
    this.customTranslationsPathEnabled = customTranslationsPathEnabled;
    this.customTranslationsPath = customTranslationsPath;
    this.enableSortAscJson = enableSortAscJson;
    this.keepLanguagesEdit = keepLanguagesEdit;
    this.locale = locale;
    this.theme = theme;
    this.selectedDisplayFormat = selectedDisplayFormat;
  }

  // Language display format related

  shouldDisplayLanguageInCardFormat(): boolean {
    return this.selectedDisplayFormat == SettingLanguageDisplayFormat.Card;
  }

  shouldDisplayLanguageInListFormat(): boolean {
    return this.selectedDisplayFormat == SettingLanguageDisplayFormat.List;
  }

}