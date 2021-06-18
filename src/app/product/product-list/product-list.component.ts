import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagingModel } from 'src/app/utilities/paging-model.model';
import { ProductDTO } from 'src/app/admin/product-management/product-management.model';
import { ProductManagementService } from 'src/app/admin/product-management/product-management.service';
import { Filter } from 'src/app/helper/enum/user-role.enum';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  test: Filter;
  rowIndexArray: any[];
  searchModel = {
    CodeOrNameProduct: '',
    GroupProductId: '',
    CategoryId: '',
    ProductGroupId: '',
    page: 1,
    isClientSide: true,
    filterId: ''
  };
  isLoad: boolean = false;
  pagingResult: PagingModel = new PagingModel();
  pageCount: number;
  products: ProductDTO[] = [];
  currentSearchText = 'Tìm kiếm theo...';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductManagementService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.declareSelect2();
    var productGroupId = this.route.snapshot.paramMap.get("product-group-id");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.getCurrentSearchText(productGroupId);
    this.searchModel.ProductGroupId = productGroupId;
    this.getList();
  }
  getList(event?: any) {
    window.scroll(0, 0);
    // this.spinner.show();
    if (!event) this.searchModel.page = 1;
    else this.searchModel.page = event;
    // this.isLoad = true;

    this.productService.getList(this.searchModel).subscribe(
      (res: any) => {
        this.pagingResult = res;
        this.products = res.results as ProductDTO[] || [];
        this.pageCount = res.pageCount as number;
        // tính ra số dòng sẽ render từ list với 3 cột
        this.rowIndexArray = Array.from(Array(Math.ceil((this.products.length + 1) / 3)).keys());
      },
      null,
      () => {
        // this.spinner.hide();
      }
    );

  }
  public onClickViewItem(item: any): void {
    this.router.navigate(['./', item], { relativeTo: this.route });
  }

  public createImgPath = (serverPath: string) => {
    return `http://localhost:52070/${serverPath}`;
  }
  showProductDetail(id: any) {

  }
  declareSelect2() {
    $('#select2').select2({
      containerCssClass: 'select2-full-color select2-primary',
      minimumResultsForSearch: Infinity // disabling search
    });
  }
  getCurrentSearchText(productGroupId: any) {
    if (!productGroupId)
      return;
    if (productGroupId == 1)
      return this.currentSearchText = 'Tìm trong giày nam...';
    else if (productGroupId == 2)
      return this.currentSearchText = 'Tìm trong giày nữ...';
    else
      return this.currentSearchText = 'Tìm trong giày trẻ em...';
  }
  getListByFilter(filterId: any) {
    if (!filterId) return;
    this.searchModel.filterId = filterId;
    this.getList();
  }
}
