import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
// import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { Views } from "../model-service/payroll-interface";
import { AbstractBuilder } from "./strategies";
import { Transformer } from "./transformer";

export class PresenterActions<M, V> implements Views.FormActions {
    protected state: Views.FormState = null;
    fn: () => V = null;
    static fromLazyPull<M, V>(
        resource: string,
        primaryView: () => V,
        saveAction: { (data: M): Observable<M> },
        builder: new () => AbstractBuilder<M, V>,
        router: Router) {
        const p = new PresenterActions(resource, null, saveAction, builder, router)
        p.fn = primaryView;
        return p;
    }
    constructor(
        private resource: string,
        public primaryView: V,
        public saveAction: { (data: M): Observable<M> },
        public builder: new () => AbstractBuilder<M, V>,
        private router: Router) {
        this.state = { error: false, data: [] };
    }
    onSave(): void {
        if (this.fn)
            this.primaryView = this.fn();

        Transformer.Serialize(this.primaryView, this.saveAction, this.builder,
            ((success: boolean, data: any, err: any = null) => {
                console.log('data', data)
                console.log('err', err)
                if (!success) {
                    this.state = { error: true, data: err };    
                    this.opensweetalertsave();
                }
                else {
                    this.state = { error: false, data: data };
                    //navigate
                    console.log(data)
                    this.opensweetalertsave();
                    this.router.navigate([this.resource])
                }
            }));
    }

    onCancel(): void {
        //navigate
        this.router.navigate([this.resource])
    }

    opensweetalertsave() {
        if (this.state.error == true) {
            var msg = "";
            msg = this.state.data?.error?.error?.message;
            const errs = this.state.data?.error?.error?.details?.errors;
            if (Array.isArray(errs)) {
                errs.forEach(err => {
                    msg += `<h5 style="color: red;">${(err as any).path[0]}</h5><br /><br>`
                })
            }
            if (errs && errs.find(err => (err as any).path[0] === "roNumber")) {
                Swal.fire({
                    title: "Validation Error",
                    html: `<h5 style="color: red;">RO Number not available. Your RO Number has been incremented. Try saving again.</h5><br /><br>`,
                    icon: 'error'
                });
            }
            else {
                Swal.fire({
                    title: "Validation Error",
                    html: msg,
                    icon: 'error'
                });
            }
        }
        else {
            Swal.fire({
                title: "Success",
                html: `<h5 style="color: green;">Record Saved</h5><br /><br>`,
                icon: 'success',
            });
        }
    }
}
export class ModalActions<M, V> implements Views.FormActions {
    constructor(
        public primaryView: V,
        public saveAction: { (data: M): Observable<M> },
        public builder: new () => AbstractBuilder<M, V>,
        private onClose: EventEmitter<any>) {
        this.state = { error: false, data: [] };
    }
    protected state: Views.FormState = null;
    onSave(): void {
        Transformer.Serialize(this.primaryView, this.saveAction, this.builder,
            ((success: boolean, data: any, err: any = null) => {
                if (!success) {
                    this.state = { error: true, data: err };
                }
                else {
                    this.state = { error: false, data: data };
                    //navigate
                    this.onClose.emit(data);
                }
            }));
    }
    onCancel(): void {
        this.onClose.emit(null);
    }

}


@Injectable(
    {
        providedIn: "root"
    }
)
export class WorkflowActions implements Views.FormActions {

    private _resource: string;
    public get resource(): string {
        return this._resource;
    }
    public set resource(v: string) {
        this._resource = v;
    }

    constructor(private router: Router) {

    }
    onSave(): void {
        this.router.navigate([this.resource])
    }
    onCancel(): void {
        this.router.navigate([this.resource])
    }

}