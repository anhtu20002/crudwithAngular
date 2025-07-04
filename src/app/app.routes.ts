import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { adminGuard } from './admin.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export const routes: Routes = [

  {
    path: "",
    canActivate: [adminGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'product/list',
        component: ProductListComponent,
      },
      {
        path: 'product/add',
        component: ProductAddComponent,
      },
      {
        path: 'product/edit/:id',
        component: ProductEditComponent,
      },
      
    ]
  },
  {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
];
