import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { CategorysComponent } from './pages/categorys/categorys.component';
import { HomerComponent } from './pages/homer/homer.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminGuard } from './shared/admin.guard';
import { SubCategorysComponent } from './pages/sub-categorys/sub-categorys.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { QuestionComponent } from './pages/question/question.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { ServiceProvidersComponent } from './pages/service-providers/service-providers.component';
import { ServiceProviderComponent } from './pages/service-provider/service-provider.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomerComponent, canActivate: [AdminGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'categorys', component: CategorysComponent, canActivate: [AdminGuard]},
  { path: 'categorys/:id', component: CategoryComponent, canActivate: [AdminGuard]},
  { path: 'subcategorys', component: SubCategorysComponent, canActivate: [AdminGuard]},
  { path: 'subcategorys/:id', component: SubCategoryComponent, canActivate: [AdminGuard]},
  { path: 'questions', component: QuestionsComponent, canActivate: [AdminGuard]},
  { path: 'questions/:id', component: QuestionComponent, canActivate: [AdminGuard]},
  { path: 'customers', component: CustomersComponent, canActivate: [AdminGuard]},
  { path: 'customers/:id', component: CustomerComponent, canActivate: [AdminGuard]},
  { path: 'serviceProviders', component: ServiceProvidersComponent, canActivate: [AdminGuard]},
  { path: 'serviceProviders/:id', component: ServiceProviderComponent, canActivate: [AdminGuard]},
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard]},
  { path: 'users/:id', component: UserComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
