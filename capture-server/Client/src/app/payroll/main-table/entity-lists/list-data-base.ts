
import { Observable } from "rxjs";
import { datasource } from "src/app/blocks/datasource";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { FilterBase } from "../filters/filter-base";
import { Router } from "@angular/router";

export interface ListAction {
    component: any;
    data: any;
}
export interface RowAction {
    label: any;
    action: any;
    icon?: string
}

export abstract class ListDataBase {

    _editUrl = '';
    _dsConfig: any = null;
    _actions: ListAction[] = [];
    _rowActions: RowAction[] = [];
    data = null;
    columns = null;
    selectedRow = null;

    public get actions(): ListAction[] {
        return this._actions;
    }

    public get rowActions(): RowAction[] {
        return this._rowActions;
    }

    editUrl(): string {
        return this._editUrl;
    }

    constructor() {

        this._dsConfig = this.getConfig();
        this._editUrl = this.getEditUrl();
        this._actions = this.getActions();

        this.rowActionEdit = this.rowActionEdit.bind(this);
        this.rowActionDelete = this.rowActionDelete.bind(this);

        this._rowActions = [
            {
                label: "Edit",
                action: this.rowActionEdit,
                icon: "bi bi-pencil-square"
            },
            {
                label: "Delete",
                action: this.rowActionDelete,
                icon: "bi bi-trash"
            }
        ]
    }

    rowActionEdit(row: any) {
        console.log("Row action edit hit..", row);
        if (this.getRouter()) {
            this.getRouter().navigate([this.editUrl(), { id: row["id"] }]);
        }
    }
    getDeleteConfirmation(yesAction: any, noAction: any): void { }
    
    rowActionDelete(row: any) {
        console.log("Row action delete hit..", row);

        this.getDeleteConfirmation(() => { 
            const modelService = this.getModelService();
            if (modelService) {
                modelService.delete(this._dsConfig.table, row.id).subscribe(
                    result => {
                        console.log(result);
                        const index = this.data.indexOf(row);
                        if (index !== -1) {
                            this.selectedRow = false
                            this.data.splice(index, 1);
                            this.data = [...this.data]
                            //          TO DO - this was being done in main-table.component.ts
                            //          this.selected = [];
                            //          this.rowChangedEvent.emit(null);
                        }
                    },
                    err => console.log(err)
                );
            }
        }, () => { 

        })

        
    }

    abstract getData(service: ModelServiceService): Observable<any>;
    abstract getConfig(): {};
    abstract getEditUrl(): string;
    getFilters(): FilterBase[] {
        return [];
    }
    getActions(): ListAction[] {
        return [];//[{component:DeleteButtonComponent, data:{"visible":true, "delete":this.delete}}]
    }
    getRouter(): Router | null {
        return null;
    }
    getModelService(): ModelServiceService | null {
        return null;
    }

    public get filters(): FilterBase[] {
        return this.getFilters()
    }
    onRowChanged(row: any) {
        this.selectedRow = row;
    }
    populate(service: ModelServiceService) {
        const data = this.getData(service);
        data.subscribe(d => {
            const ds = new datasource(d, this._dsConfig);
            this.columns = ds.columns();
            this.data = ds.rows();
        });
    }

    getDateStart(): string {
        var date = new Date();
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-01`;
    }

    getDateEnd(): string {
        var date = new Date();
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return `${lastDay.getFullYear()}-${(lastDay.getMonth() + 1).toString().padStart(2, '0')}-${lastDay.getDate().toString().padStart(2, '0')}`;
    }
    getLastDayOfMonth(year: number, month: string): string {
        const numericMonth = parseInt(month, 10) - 1; // Convert month to a number and subtract 1 (months are zero-indexed)
        const lastDay = new Date(year, numericMonth + 1, 0);
        return `${lastDay.getFullYear()}-${('0' + (lastDay.getMonth() + 1)).slice(-2)}-${('0' + lastDay.getDate()).slice(-2)}`;
    }


}