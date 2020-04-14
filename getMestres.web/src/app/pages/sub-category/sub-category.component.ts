import { Component, OnInit } from '@angular/core';
import { SubCategoryModel } from 'src/app/model/SubCategoryModel';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  subCategory: SubCategoryModel = new SubCategoryModel();
  categorys: Array<CategoryModel>;
  constructor(
    private subCategorySrv: SubCategoryService,
    private categorySrv: CategoryService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute

  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id))
    this.bindCategorys();
  }

  async bindCategorys(): Promise<void> {
    const result = await this.categorySrv.GetAll();
    if(result.success)
      this.categorys = result.data as Array<CategoryModel>;
  }

  async getId(uid: string): Promise<void>{
    if(uid === 'new'){ return;}
    const result = await this.subCategorySrv.GetById(uid);
    this.subCategory = result.data as SubCategoryModel;
  }
  async save(): Promise<void> {
    const result = await this.subCategorySrv.post(this.subCategory);
    if(result.success){
      this.matSnack.open('sub categoria salva com sucesso', undefined, {duration: 3000});
      this.router.navigateByUrl('/subcategorys');
    }
  }
}
