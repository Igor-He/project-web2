import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomePageComponent } from './components/home-page/home-page/home-page.component';
import { ProfileComponent } from './components/home-page/profile/profile/profile.component';
import { VerificationComponent } from './components/home-page/admin/verification/verification.component';
import { AddingProductsComponent } from './components/home-page/admin/adding-products/adding-products.component';
import { NewCurrentOrderComponent } from './components/home-page/customer/new-current-order/new-current-order.component';
import { NewOrderComponent } from './components/home-page/customer/new-order/new-order.component';
import { CurrentOrderComponent } from './components/home-page/customer/current-order/current-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    HomePageComponent,
    ProfileComponent,
    VerificationComponent,
    AddingProductsComponent,
    NewCurrentOrderComponent,
    NewOrderComponent,
    CurrentOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
