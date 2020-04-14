import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Constants } from '../../shared/constants';
import { ICategory } from 'src/app/interfaces/ICategory';
import { CategoryService } from 'src/app/services/category.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {
  columns: string[] = ['Nome', 'Descricao', 'uid'];
  dataSource: MatTableDataSource<ICategory>;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(private categorySrv: CategoryService) { }

  async ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void>{
    const categorys = await this.categorySrv.GetAll();
    this.dataSource = new MatTableDataSource(categorys.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(category: ICategory):Promise<void>{
    const options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir a categoria ${category.name}`
    }
    const { value } = await swal.fire(options);
    if(value){
      const result = await this.categorySrv.delete(category.uid);
      if(result.success){
        this.bind();
      }
    }
  }
}
