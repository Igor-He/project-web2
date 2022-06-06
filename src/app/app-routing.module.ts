import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page/home-page.component';
import { ProfileComponent } from './components/home-page/profile/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminGuard } from './guards/admin-guard/admin.guard';
import { CustomerGuard } from './guards/customer-guard/customer.guard';
import { DelivererGuard } from './guards/deliverer-guard/deliverer.guard';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegistrationComponent
  },
  {
    path: "home",
    component: HomePageComponent,
    canActivate: [AdminGuard, CustomerGuard, DelivererGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AdminGuard, CustomerGuard, DelivererGuard]

  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
