import { Component, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Views } from 'app/sport-pip-capture/models/capture-interface';
import { DistributionListPresenter } from '../distribution-list/distribution-list.presenter';
import { DataFactoryService } from 'app/sport-pip-capture/models/data-factory.service';
import { Transformer } from 'app/blocks/transformer';
import { ShareBuilder } from './builder/sharing';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharingComponent implements OnInit {
  @Input() datasource: any;
 coachHomeSidebarData:any;
  constructor(private _coreSidebarService: CoreSidebarService, private modalService: NgbModal, private dataFactory: DataFactoryService) {


  }

  ngOnInit(): void {
  }
  loadRefreshData(){
    Transformer.ComposeCollectionAsync(this.dataFactory.DistributionsListJson(), this.datasource.distribution, ShareBuilder);
  }
  distributionDetail(data:any) {
    console.log(data,)
     this.coachHomeSidebarData =data;
    this._coreSidebarService.getSidebarRegistry('coach-home-sidebar').toggleOpen();
  }

//open model 
  _openModal() {
    const modalRef = this.modalService.open(DistributionListPresenter, {
      centered: true,
      size: 'lg'
    });
    modalRef.shown.subscribe(o => {
      const inst: DistributionListPresenter = modalRef.componentInstance;
      inst.onUpdate.subscribe(res => {
        console.log(res)
        if (res) {
          this.loadRefreshData()
        }
      });
    })
  }

  //Open Model for edit mode
  openModal(id: number) {
    const modalRef = this.modalService.open(DistributionListPresenter, {
      centered: true,
      backdrop: false,
      size: 'lg'
    });
    modalRef.componentInstance.cardId = id;
    modalRef.shown.subscribe(o => {
      const inst: DistributionListPresenter = modalRef.componentInstance;
      inst.onUpdate.subscribe(res => {
        console.log(res)
        if (res) {
          this.loadRefreshData()
        }
      });
    })
  }

  //delete Distribution  list
  deleteDistribution(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgba(33, 96, 147, 1)',
      cancelButtonColor: '#d33',
    
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataFactory.DeleteDistributionJson(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.loadRefreshData()
      }
    })
   

  }

}

