import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ServiceProviderModel } from 'src/app/model/serviceProviderModel';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';
import { ServiceProviderService } from 'src/app/services/service-provider.service';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.scss']
})
export class ServiceProvidersComponent implements OnInit {
  columns: string[] = ['Nome', 'E-mail', 'uid'];
  dataSource: MatTableDataSource<ServiceProviderModel>;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(
    private serviceProviderSrv: ServiceProviderService
  ) { }

  ngOnInit() {
    this.bind();
  }
  async bind(): Promise<void>{
    const serviceProvider = await this.serviceProviderSrv.GetAll();
    this.dataSource = new MatTableDataSource(serviceProvider.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(model: ServiceProviderModel):Promise<void>{
    const options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir o prestador ${model.name}`
    }
    const { value } = await Swal.fire(options);
    if(value){
      const result = await this.serviceProviderSrv.delete(model.uid);
      if(result.success){
        this.bind();
      }
    }
  }

}
