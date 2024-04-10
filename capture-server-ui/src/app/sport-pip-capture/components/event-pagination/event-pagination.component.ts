import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-event-pagination',
  templateUrl: './event-pagination.component.html',
  styleUrls: ['./event-pagination.component.scss']
})
export class EventPaginationComponent implements OnInit {
  @Input() totalItems:any
  @Input() startIndex: number = 0
  @Input() endIndex: number
  @Output() pageChange = new EventEmitter<{ startIndex: number, endIndex: number }>();
  @Output() pageSizeChange = new EventEmitter<number>();
  currentPage: number = 1;
  @Input() pageSize: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.startIndex) {
      this.updateCurrentPage();
    }
  }

  emitPreviousPage() {
    if (this.startIndex - this.pageSize >= 0) {
      const newStartIndex = this.startIndex - this.pageSize;
      this.pageChange.emit({ startIndex: newStartIndex, endIndex: newStartIndex + this.pageSize });
    }
  }

  emitNextPage() {
    const newStartIndex = this.startIndex + this.pageSize;
    this.pageChange.emit({ startIndex: newStartIndex, endIndex: newStartIndex + this.pageSize });
  }

  private updateCurrentPage() {
    this.currentPage = Math.floor(this.startIndex / this.pageSize) + 1;
  }

  updatePageSize(event: any) {
    this.pageSize = +event.target.value;
    this.pageSizeChange.emit(this.pageSize);
    this.pageChange.emit({ startIndex: 0, endIndex: this.pageSize });
  }
  constructor() { }

  ngOnInit(): void {
  }

}
