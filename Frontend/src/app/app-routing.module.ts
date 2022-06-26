import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './components/errors/forbidden/forbidden.component';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { AddingProductsComponent } from './components/home-page/admin/adding-products/adding-products.component';
import { VerificationComponent } from './components/home-page/admin/verification/verification.component';
import { AllOrdersComponent } from './components/home-page/customer/all-orders/all-orders.component';
import { CurrentOrderComponent } from './components/home-page/customer/current-order/current-order.component';
import { GetOrderComponent } from './components/home-page/customer/get-order/get-order.component';
import { NewCurrentOrderComponent } from './components/home-page/customer/new-current-order/new-current-order.component';
import { HomePageComponent } from './components/home-page/home-page/home-page.component';
import { ProfileComponent } from './components/home-page/profile/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminGuard } from './guards/admin-guard/admin.guard';
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { CustomerGuard } from './guards/customer-guard/customer.guard';
import { DelivererGuard } from './guards/deliverer-guard/deliverer.guard';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegistrationComponent
  },
  {
    path: "",
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    component:  ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "verification",
    component: VerificationComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path:"add-new-product",
    component: AddingProductsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "new-current-order",
    component: NewCurrentOrderComponent,
    canActivate: [AuthGuard, (CustomerGuard || DelivererGuard)]
  },
  {
    path: "all-orders",
    component: AllOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "forbidden",
    component: ForbiddenComponent
  },
  {
    path: "404",
    component: PageNotFoundComponent
  },
  {
    path: '**', 
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
