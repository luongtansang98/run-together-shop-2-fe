import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserToCreate, User } from '../employee.model';
import { PagingModel } from 'src/app/utilities/paging-model.model';
import { EmployeeService } from '../employee.service';
declare var $: any;
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  positions: any;
  public users: User[] = [];
  searchModel = {
    customerName: '',
    positionId: '',
    page: 1
  };
  isLoad: boolean = false;
  pagingResult: PagingModel = new PagingModel();
  pageCount: number;
  constructor(private http: HttpClient, private empService: EmployeeService) { }

  ngOnInit() {
    this.getList(event);
    this.getPositions();
  }

  getList(event?: any) {
    if (!event) this.searchModel.page = 1;
    else this.searchModel.page = event;
    this.isLoad = true;
    window.scroll(0, 0);
    setTimeout(() => {
      this.empService.getList(this.searchModel)
        .subscribe(
          (res: any) => {
                          this.pagingResult = res;
                          this.users = res.results as User[] || [];
                          this.pageCount = res.pageCount as number;
                        },
          null,
          () => this.isLoad = false
          );
    }, 1000);

  }

  public createImgPath = (serverPath: string) => {
    return `http://localhost:52070/${serverPath}`;
  }
  getPositions() {
    this.http.get('http://localhost:52070/api/user/GetPosition')
      .subscribe((res: any) => {
        this.positions = res;
      });
  }
}
