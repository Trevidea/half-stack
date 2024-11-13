import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { OffCanvasService } from './off-canvas.service';
import { Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-off-canvas',
  standalone: true,
  imports: [MaterialModule, CommonModule, PortalModule],
  templateUrl: './off-canvas.component.html',
  styleUrl: './off-canvas.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OffCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  isOpen: boolean = false;
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'right';
  @ViewChild(CdkPortal) portal!: CdkPortal;
  private subscription!: Subscription;
  constructor(private overlay: Overlay, private offCanvasService: OffCanvasService) {
  }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

  openOffCanvas() {
    this.offCanvasService.open(this.portal);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
