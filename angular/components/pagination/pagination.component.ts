import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pagination} from '@muzika/core';

@Component({
  selector: 'muzika-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input()
  pages: Pagination[];

  @Output()
  pageClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  _onPageClick(pageNum: string) {
    this.pageClick.emit(pageNum);
  }
}
