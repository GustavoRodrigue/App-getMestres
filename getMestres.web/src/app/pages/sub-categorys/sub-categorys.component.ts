import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { SubCategoryModel } from 'src/app/model/SubCategoryModel';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-categorys',
  templateUrl: './sub-categorys.component.html',
  styleUrls: ['./sub-categorys.component.scss']
})
export class SubCategorysComponent implements OnInit {
  columns: string[] = ['Nome', 'Descricao', 'Categoria', 'uid'];
  dataSource: MatTableDataSource<SubCategoryModel>;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(
    private subCategoriSrv: SubCategoryService
  ) { }

  ngOnInit() {
    this.bind();
  }
  async bind(): Promise<void>{
    const subCategorys = await this.subCategoriSrv.GetAll();
    this.dataSource = new MatTableDataSource(subCategorys.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(subCategory: SubCategoryModel):Promise<void>{
    const options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir a sub categoria ${subCategory.name}`
    }
    const { value } = await Swal.fire(options);
    if(value){
      const result = await this.subCategoriSrv.delete(subCategory.uid);
      if(result.success){
        this.bind();
      }
    }
  }
}
