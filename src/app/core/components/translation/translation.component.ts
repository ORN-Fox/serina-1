import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Translation } from '../../models/translation/translation.model';

@Component({
    selector: 'app-translation',
    templateUrl: './translation.component.html',
    styleUrls: ['./translation.component.scss'],
    standalone: false
})
export class TranslationComponent {

  @Input() languages: string[];
  @Input() translation: Translation;

  @Output() TranslationComponentDidDeleteTranslationEvent: EventEmitter<{ translation: Translation }> = new EventEmitter();
  @Output() TranslationComponentDidDuplicateTranslationEvent: EventEmitter<{ translation: Translation }> = new EventEmitter();
  @Output() TranslationComponentDidGeneratePluralTranslationEvent: EventEmitter<{ translation: Translation }> = new EventEmitter();
  @Output() TranslationComponentDidMoveTranslationEvent: EventEmitter<{ translation: Translation }> = new EventEmitter();
  @Output() TranslationComponentDidSaveTranslationEvent: EventEmitter<{ translation: Translation }> = new EventEmitter();

  constructor() {}

  deleteTranslation(translation: Translation) {
    this.TranslationComponentDidDeleteTranslationEvent.emit({ translation: translation });
  }

  duplicateTranslation(translation: Translation) {
    this.TranslationComponentDidDuplicateTranslationEvent.emit({ translation: translation });
  }

  generatePluralTranslation(translation: Translation) {
    this.TranslationComponentDidGeneratePluralTranslationEvent.emit({ translation: translation });
  }

  moveTranslation(translation: Translation) {
    this.TranslationComponentDidMoveTranslationEvent.emit({ translation: translation });
  }

  saveTranslation(translation: Translation) {
    this.TranslationComponentDidSaveTranslationEvent.emit({ translation: translation });
  }

}
