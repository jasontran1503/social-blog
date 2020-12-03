import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Page } from '../../enum/page.enum';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() postsCount: number;
  @Input() currentPage: number;
  @Output() choosePage = new EventEmitter<number>();
  @Output() changePage = new EventEmitter<number>();
  pagesCount: number;

  constructor() { }

  ngOnChanges(): void {
    this.pagesCount = Math.ceil(this.postsCount / Page.PAGE_SIZE);
  }

  ngOnInit(): void { }

  pages(i: number) {
    return new Array(i);
  }

  setPage(page: number) {
    this.currentPage = page;
    this.choosePage.emit(this.currentPage);
  }

  previous() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    } else {
      return;
    }
    this.changePage.emit(this.currentPage);
  }

  next() {
    if (this.currentPage < this.pagesCount) {
      this.currentPage = this.currentPage + 1;
    } else {
      return;
    }
    this.changePage.emit(this.currentPage);
  }
}
