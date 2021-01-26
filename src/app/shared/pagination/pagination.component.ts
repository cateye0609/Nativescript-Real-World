import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ns-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
  @Input() public total_pages: number;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  // Trang hiện tại
  current_index: number = 1;

  constructor() { }

  ngOnInit() { }

  // Change pages
  changePage(page: number) {
    if (page > 0 && page <= this.total_pages && page != this.current_index) {
      this.current_index = page;
      this.onChange.emit(this.current_index);
    }
  }
}