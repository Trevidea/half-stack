import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VirtualHostFormComponent } from './virtual-host-form/virtual-host-form.component';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
interface ColumnData {
  title: string;
  content: string;
}
@Component({
  selector: 'app-virtual-host',
  templateUrl: './virtual-host.component.html',
  styleUrls: ['./virtual-host.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VirtualHostComponent implements OnInit {

  columns: ColumnData[] = [
    { title: 'Virtual Hosts', content: 'ABCDCD' },
    { title: 'Hosts', content: 'ABCDCD' },
    { title: 'TLS', content: 'ABCDCD' },
    { title: 'CORS Settings', content: 'ABCDCD' }
  ];

  constructor(private ngbmodalService: NgbModal, private modelservice: ModelServiceService) { }

  ngOnInit(): void {
    this.modelservice.getVirtualHost().subscribe(
      (data: any) => {
        console.log(data)
        const spipValue = data["Gateway Response"][0];
        console.log(spipValue);
      }
    )
  }
  modalOpenMd() {
    this.ngbmodalService.open(VirtualHostFormComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
}
