import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CustomerModel } from 'src/app/model/customerModel';
import { CustomerService } from 'src/app/services/customer.service';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  columns: string[] = ['Nome', 'E-mail', 'uid'];
  dataSource: MatTableDataSource<CustomerModel>;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(
    private customerSrv: CustomerService
  ) { }

  ngOnInit() {
    this.bind();
  }
  async bind(): Promise<void>{
    const questions = await this.customerSrv.GetAll();
    this.dataSource = new MatTableDataSource(questions.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(model: CustomerModel):Promise<void>{
    const options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir o cliente ${model.name}`
    }
    const { value } = await Swal.fire(options);
    if(value){
      const result = await this.customerSrv.delete(model.uid);
      if(result.success){
        this.bind();
      }
    }
  }

}
