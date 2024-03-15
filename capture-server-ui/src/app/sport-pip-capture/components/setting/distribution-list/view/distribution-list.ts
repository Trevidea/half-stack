
import { Views } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { Collection,Range } from "app/blocks/collection";

export class DistributionRange implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    
    private _distribution : Range<DistributionListView>;
    public get distribution() : Range<DistributionListView> {
        if(!this._distribution){
            this._distribution = new Range<DistributionListView>()
        }
        return this._distribution;
    }
    public set distribution(v : Range<DistributionListView>) {
        this._distribution = v;
    }
    
}

export class DistributionListView implements Views.Datasource {


    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }


    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }




    private _emails:Collection<EmailView>;
    public get emails(): Collection<EmailView> {
        if (!this._emails) {
            this._emails = new Collection<EmailView>();
        }
        return this._emails;
    }
    public set emails(v:Collection<EmailView>) {
        this._emails = v;
    }


}
export class EmailView {


    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }


    private _email: string;
    public get email(): string {
        return this._email;
    }
    public set email(v: string) {
        this._email = v;
    }

}

