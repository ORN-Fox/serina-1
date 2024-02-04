import { clone } from "lodash";

export class Translation {

    key: string;
    originalKey: string;
    values: string[];
    secondValue: string;
    save: boolean;
    modified: boolean;

    constructor(
        key: string,
        values: string[],
        secondValue: string = '',
        originalKey: string = key,
        save: boolean = false,
        modified: boolean = false
    ) {
        this.key = key;
        this.originalKey = originalKey;
        this.values = values;
        this.secondValue = secondValue;
        this.save = save;
        this.modified = modified;
    }

    duplicate(): Translation {
        let duplicateTranslation = clone(this);
        duplicateTranslation.key += '_copy';
        duplicateTranslation.save = false;
        duplicateTranslation.modified = false;
        return duplicateTranslation;
    }

    generatePlural(): Translation {
        let pluralTranslation = clone(this);
        pluralTranslation.key += '_plural';
        pluralTranslation.save = false;
        pluralTranslation.modified = false;
        return pluralTranslation;
    }

    shouldDisableSaveAction(): boolean {
        return !this.key || this.values.length == 0;
    }

    shouldDisabledDuplicateGeneralPluralMoveActions(): boolean {
        return !this.save || this.modified;
    }

}