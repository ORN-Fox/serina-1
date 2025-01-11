import { clone, cloneDeep } from "lodash";

export class Translation {

    key: string;
    values: string[];
    save: boolean;
    modified: boolean;

    // local data
    savedKey: string;
    savedValues: string[];

    constructor(
        key: string,
        values: string[] = [],
        save: boolean = false,
        modified: boolean = false
    ) {
        this.key = key;
        this.values = values;
        this.save = save;
        this.modified = modified;

        this.setSavedValues();
    }

    duplicate(): Translation {
        let duplicateTranslation = new Translation(`${this.key}_copy`, cloneDeep(this.values));
        return duplicateTranslation;
    }

    generatePlural(): Translation {
        let pluralTranslation = new Translation(`${this.key}_plural`, cloneDeep(this.values));
        return pluralTranslation;
    }

    handleKeyUpdate(key: string) {
        this.modified = key !== this.savedKey;
    }

    handleValueUpdate(valueIndex: number, value: string) {
        this.modified = value !== this.savedValues[valueIndex];
    }

    applySave() {
        this.save = true;
        this.modified = false;
        this.setSavedValues();
    }

    isValid(): boolean {
        return this.key !== '' && this.values[0] !== '';
    }

    shouldDisplaySaveAction(): boolean {
        return !this.save || this.modified;
    }

    shouldDisableSaveAction(): boolean {
        return !this.key || this.values.length == 0;
    }

    shouldDisabledDuplicateGeneralPluralMoveActions(): boolean {
        return !this.save || this.modified;
    }

    private setSavedValues() {
        this.savedKey = clone(this.key);
        this.savedValues = cloneDeep(this.values);
    }

}