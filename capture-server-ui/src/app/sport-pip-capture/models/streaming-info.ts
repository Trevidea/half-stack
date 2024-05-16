import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class StreamingInfoData extends DataBase<Data.StreamingInfo> {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    
    public get bitRate(): string {
        return this._model.bitRate;
    }
    public set bitRate(v: string) {
        this._model.bitRate = v;
    }

    public get frameRate(): string {
        return this._model.frameRate;
    }
    public set frameRate(v: string) {
        this._model.frameRate = v;
    }

    public get keyFrameInterval(): string {
        return this._model.keyFrameInterval;
    }
    public set keyFrameInterval(v: string) {
        this._model.keyFrameInterval = v;
    }

    public get sampleRate(): number {
        return this._model.sampleRate;
    }
    public set sampleRate(v: number) {
        this._model.sampleRate = v;
    }

    public get statusCode(): number {
        return this._model.statusCode;
    }
    public set statusCode(v: number) {
        this._model.statusCode = v;
    }


    public get height(): number {
        return this._model.height;
    }
    public set height(v: number) {
        this._model.height = v;
    }

    public get width(): number {
        return this._model.width;
    }
    public set width(v: number) {
        this._model.width = v;
    }

    public get frameType(): string {
        return this._model.frameType;
    }
    public set frameType(v: string) {
        this._model.frameType = v;
    }

    public get data(): string {
        return this._model.data;
    }
    public set data(v: string) {
        this._model.data = v;
    }

    public get outputStreamName(): string {
        return this._model.outputStreamName;
    }
    public set outputStreamName(v: string) {
        this._model.outputStreamName = v;
    }

}