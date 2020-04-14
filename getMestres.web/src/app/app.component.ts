import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';
import { IMenu } from './interfaces/IMenu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  subscrip: Subscription;
  menu: Array<IMenu>  = new Array<IMenu>();
  constructor(private userService: UserService) {

  }

  ngOnDestroy() {
    this.subscrip.unsubscribe();
  }

  ngOnInit() {
    this.isLogged = this.userService.isStaticLogged;
    this.subscrip = this.userService.isLogged.subscribe(logged => {
      this.isLogged = logged;
    });

    this.menu.push({
      group: 'Cadastros',
      itens: [
        { icon: 'bookmark', label: 'Categorias', url: '/categorys'},
        { icon: 'bookmark_border', label: 'SubCategorias', url: '/subcategorys'},
        { icon: 'assignment', label: 'Questoes', url: '/questions'}
      ]
    });
    this.menu.push({
      group: 'Pessoas',
      itens: [
        { icon: 'person', label: 'Profissionais', url: '/serviceProviders'},
        { icon: 'person_pin', label: 'Clientes', url: '/customers'},

      ]
    });
    this.menu.push({
      group: 'Segurança',
      itens: [
        { icon: 'security', label: 'Usuarios', url: '/users'},
      ]
    });
    this.menu.push({
      group: 'Gerenciamento',
      itens: [
        { icon: 'format_list_bulleted', label: 'Pedidos', url: '/'},
      ]
    });
  }
}

