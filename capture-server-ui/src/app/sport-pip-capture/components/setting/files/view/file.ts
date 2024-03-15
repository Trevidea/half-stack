import { Views } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { Collection, Range } from "app/blocks/collection";
export class FileRangeView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }


    private _file: Range<FileView>;
    public get file(): Range<FileView> {
        if (!this._file) {
            this._file = new Range<FileView>()
        }
        return this._file;
    }
    public set file(v: Range<FileView>) {
        this._file = v;
    }


}
export class FileView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }


    private _fileName: string;
    public get fileName(): string {
        return this._fileName;
    }
    public set fileName(v: string) {
        this._fileName = v;
    }
   

    private _date: string;
    public get date(): string {
        return this._date;
    }
    public set date(v: string) {
        this._date = v;
    }


    private _size: number;
    public get size(): number {
        return this._size;
    }
    public set size(v: number) {
        this._size = v;
    }

    
}