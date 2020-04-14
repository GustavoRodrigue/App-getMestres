import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  columns: string[] = ['Nome', 'E-mail', 'Administrador', 'uid'];
  dataSource: MatTableDataSource<UserModel>;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(
    private userSrv: UserService
  ) { }

  ngOnInit() {
    this.bind();
  }
  async bind(): Promise<void>{
    const users = await this.userSrv.GetAll();
    this.dataSource = new MatTableDataSource(users.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(model: UserModel):Promise<void>{
    const options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir o usuário ${model.name}`
    }
    const { value } = await Swal.fire(options);
    if(value){
      const result = await this.userSrv.delete(model.uid);
      if(result.success){
        this.bind();
      }
    }
  }

}