import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() pageCount:number;
  @Input() currentPage:number;
  @Output() getPage = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  getPages(): number[] {
    // const c = this.pageCount;
    // const p = this.pages || 1;
    const pages: number[] = [];
    for(var i = 0; i< this.pageCount; i++)
    {
      pages.push(i+1);
    }
    return pages;
  }
  onPage(page:number){
    this.getPage.emit(page);
  }

}
