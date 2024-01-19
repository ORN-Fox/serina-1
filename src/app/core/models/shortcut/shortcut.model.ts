export class Shortcut {

    descriptionKey: string;
    key: string | null;
    icon: string | null;

    constructor(descriptionKey: string, key: string | null = null, icon: string | null = null) {
        this.descriptionKey = descriptionKey;
        this.key = key;
        this.icon = icon;
    }

}