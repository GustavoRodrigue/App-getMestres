import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { promise } from 'protractor';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: CategoryModel = new CategoryModel();
  constructor(private categoryService: CategoryService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
  }

  async getId(uid: string):Promise<void>{
    if(uid === 'new'){return;}
    const result = await this.categoryService.GetById(uid);
    this.category = result.data as CategoryModel;
  }

  async save():Promise<void>{
    const result = await this.categoryService.post(this.category);
    if(result.success){
      this.matSnack.open('Categoria salva com sucesso', undefined, {duration: 3000});
      this.router.navigateByUrl('/categorys');
    }
    
  }
}
