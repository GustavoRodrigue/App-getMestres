import { Component, OnInit } from '@angular/core';
import { ServiceProviderModel } from 'src/app/model/serviceProviderModel';
import { ServiceProviderService } from 'src/app/services/service-provider.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FileManeger } from 'src/app/components/input-file/input-file.component';
import { SubCategoryModel } from 'src/app/model/SubCategoryModel';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { AddressService } from 'src/app/services/address.service';
import { IAddressState } from 'src/app/interfaces/IAddressState';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {
  model: ServiceProviderModel = new ServiceProviderModel();
  categoriesCare: Array<string> = new Array<string>();
  subCatgoriesSelect: Array<SubCategoryModel> = new Array<SubCategoryModel>();
  categories: Array<CategoryModel>;
  subCategories: Array<SubCategoryModel>;
  subCategorySelect: SubCategoryModel = new SubCategoryModel();
  categorySelect: string = '';
  cities: Array<string> = new Array<string>();
  citiesCare: Array<string> = new Array<string>();
  states: Array<IAddressState> = new Array<IAddressState>();
 
  constructor(
    private serviceProviderSrv: ServiceProviderService,
    private categorySrv: CategoryService,
    private subCategorySrv: SubCategoryService,
    private addressSrv: AddressService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute

  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
    this.bindCategorys();
    this.bindStates();
  }

  async bindCategorys(): Promise<void>{
    const result = await this.categorySrv.GetAll();
    if(result.success){
      this.categories = result.data as Array<CategoryModel>;
    }
  }

  async bindStates(): Promise<void>{
    const result = await this.addressSrv.getAllStates();
    if(result.success){
      this.states = result.data as Array<IAddressState>;
    }
  }

  async bindCities(state: string): Promise<void>{
    this.citiesCare = new Array<string>();
    const result = await this.addressSrv.getAllCities(state);
    if(result.success){
      this.cities = result.data as Array<string>;
    }
  }

  async bindSubCategorys(categoryUid: string): Promise<void>{
    const result = await this.subCategorySrv.getAllByCategory(categoryUid);
    if(result.success){
      this.subCategories = result.data as Array<SubCategoryModel>;
    }
  }

  async getId(uid: string): Promise<void>{
    if(uid === 'new'){ return;}
    const result = await this.serviceProviderSrv.GetById(uid);
    this.model = result.data as ServiceProviderModel;
    this.bindCities(this.model.state);
    this.citiesCare = this.model.citiesCare.split(',');
    this.categoriesCare = this.model.categoriesCare.split(',');
  }
  async save(): Promise<void> {
    this.model.citiesCare = this.citiesCare.join(', ');
    this.model.categoriesCare = this.categoriesCare.join(', ');
    const result = await this.serviceProviderSrv.post(this.model);
    if(result.success){
      this.matSnack.open('Prestador salvo com sucesso', undefined, {duration: 3000});
      this.router.navigateByUrl('/serviceProviders');
    }
  }

  selectedFile(file: FileManeger): void{
    if(file.base64Data){
      this.model.photo = file.base64Data;
    }
  }

  selectSubCategory(subcategory: SubCategoryModel): void {
    const exists = this.categoriesCare.filter(x => x === subcategory.name).length > 0;
    if(!exists) {
      this.categoriesCare.push(subcategory.name);
    } else {
      this.matSnack.open(`A Sub Categoria ${subcategory.name} já foi adicionada! `, undefined, {duration: 3000});
    }
  }

  selectCitieCare(citie: any): void{
    const exists = this.citiesCare.indexOf(citie) >-1;
    if(!exists){
      this.citiesCare.push(citie);
    }else {
      this.matSnack.open(`A Sub Categoria ${citie} já foi adicionada! `, undefined, {duration: 3000});
    }
  }

  removeCitiesCare(index: number): void {
    this.citiesCare.splice(index, 1);
  }

  removeCategoryCare(index: number): void {
    this.categoriesCare.splice(index, 1);
  }

}
