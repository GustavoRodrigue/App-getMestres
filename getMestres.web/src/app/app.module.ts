import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgxSpinnerModule} from 'ngx-spinner';

import {
  MatToolbarModule, MatIconModule, 
  MatButtonModule, MatSidenavModule, 
  MatListModule, MatTableModule, 
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatPaginatorIntl,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';
import { PedidosPendentesComponent } from './components/pedidos-pendentes/pedidos-pendentes.component';
import { CardsDashboardComponent } from './components/cards-dashboard/cards-dashboard.component';
import { CategorysComponent } from './pages/categorys/categorys.component';
import { CategoryComponent } from './pages/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { HomerComponent } from './pages/homer/homer.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getPaginatorIntl } from './shared/paginator-intl';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { SubCategorysComponent } from './pages/sub-categorys/sub-categorys.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { QuestionComponent } from './pages/question/question.component';
import { QuestionTypePipe } from './pipes/question-type.pipe';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { ServiceProviderComponent } from './pages/service-provider/service-provider.component';
import { ServiceProvidersComponent } from './pages/service-providers/service-providers.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    PedidosPendentesComponent,
    CardsDashboardComponent,
    CategorysComponent,
    CategoryComponent,
    HomerComponent,
    LoginComponent,
    SubCategoryComponent,
    SubCategorysComponent,
    QuestionsComponent,
    QuestionComponent,
    QuestionTypePipe,
    CustomerComponent,
    CustomersComponent,
    InputFileComponent,
    ServiceProviderComponent,
    ServiceProvidersComponent,
    UsersComponent,
    UserComponent
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [{
    provide: MatPaginatorIntl, useValue: getPaginatorIntl()
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
