export class Language {

  code: string;
  nbTranslations: number = 0;

  constructor(code: string, nbTranslations: number) {
    this.code = code;
    this.nbTranslations = nbTranslations;
  }

  getFlagSrc(): string {
    return `/assets/images/svg-country-flags/${this.code.slice(-2).toLowerCase()}.svg`;
  }

}