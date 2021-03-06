import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/model/customerModel';
import { CustomerService } from 'src/app/services/customer.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FileManeger } from 'src/app/components/input-file/input-file.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  model: CustomerModel = new CustomerModel();
 
  constructor(
    private customerSrv: CustomerService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute

  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
    
  }

  async getId(uid: string): Promise<void>{
    if(uid === 'new'){ return;}
    const result = await this.customerSrv.GetById(uid);
    this.model = result.data as CustomerModel;
  }
  async save(): Promise<void> {
    const result = await this.customerSrv.post(this.model);
    if(result.success){
      this.matSnack.open('Cliente salvo com sucesso', undefined, {duration: 3000});
      this.router.navigateByUrl('/customers');
    }
  }

  selectedFile(file: FileManeger): void{
    if(file.base64Data){
      this.model.photo = file.base64Data;
    }
  }


}
