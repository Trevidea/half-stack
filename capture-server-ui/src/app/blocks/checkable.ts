 export class CheckableView {
    constructor(label: string | null = null, checked: boolean | null = null) {
        if (label) this._label = label;
        if (checked) this._isChecked = checked;
    }
    private _label: string;
    public get label(): string {
        return this._label;
    }
    public set label(v: string) {
        this._label = v;
    }

    private _isChecked: boolean;
    public get isChecked(): boolean {
        return this._isChecked;
    }
    public set isChecked(v: boolean) {
        this._isChecked = v;
    }

}

export class CheckablePaperWorkView {
    constructor(label: string | null = null, checked: boolean | null = null ,visible:boolean | null) {
        if (label) this._label = label;
        if (checked) this._isChecked = checked;
        if (visible) this._isVisible = visible
    }
    private _label: string;
    public get label(): string {
        return this._label;
    }
    public set label(v: string) {
        this._label = v;
    }

    private _isChecked: boolean;
    public get isChecked(): boolean {
        return this._isChecked;
    }
    public set isChecked(v: boolean) {
        this._isChecked = v;
    }

private _isVisible : boolean
public get isVisible() :boolean {
    return this._isVisible;
}
public set isVisible(v :boolean) {
    this._isVisible = v;
}

}