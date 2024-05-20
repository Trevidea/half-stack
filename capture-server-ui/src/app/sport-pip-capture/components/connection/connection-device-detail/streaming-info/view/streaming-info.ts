import { Views } from "app/sport-pip-capture/models/capture-interface";

export class StreamingInfoView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _bitRate: string;
    public get bitRate(): string {
        return this._bitRate;
    }
    public set bitRate(v: string) {
        this._bitRate = v;
    }

    private _frameRate: string;
    public get frameRate(): string {
        return this._frameRate;
    }
    public set frameRate(v: string) {
        this._frameRate = v;
    }

    private _keyFrameInterval: string;
    public get keyFrameInterval(): string {
        return this._keyFrameInterval;
    }
    public set keyFrameInterval(v: string) {
        this._keyFrameInterval = v;
    }

    private _sampleRate: number;
    public get sampleRate(): number {
        return this._sampleRate;
    }
    public set sampleRate(v: number) {
        this._sampleRate = v;
    }

    private _statusCode: number;
    public get statusCode(): number {
        return this._statusCode;
    }
    public set statusCode(v: number) {
        this._statusCode = v;
    }

    private _height: number;
    public get height(): number {
        return this._height;
    }
    public set height(v: number) {
        this._height = v;
    }

    private _width: number;
    public get width(): number {
        return this._width;
    }
    public set width(v: number) {
        this._width = v;
    }

    private _frameType: string;
    public get frameType(): string {
        return this._frameType;
    }
    public set frameType(v: string) {
        this._frameType = v;
    }

    private _data: string;
    public get data(): string {
        return this._data;
    }
    public set data(v: string) {
        this._data = v;
    }


    private _outputStreamName: string;
    public get outputStreamName(): string {
        return this._outputStreamName;
    }
    public set outputStreamName(v: string) {
        this._outputStreamName = v;
    }

}