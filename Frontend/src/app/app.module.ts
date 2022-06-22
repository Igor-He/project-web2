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
import { AllOrdersComponent } from './components/home-page/customer/all-orders/all-orders.component';
import { GetOrderComponent } from './components/home-page/customer//get-order/get-order.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ErrorHandlerService } from './services/error-handler-service/error-handler.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ForbiddenComponent } from './components/errors/forbidden/forbidden.component';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

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
    CurrentOrderComponent,
    AllOrdersComponent,
    GetOrderComponent,
    ForbiddenComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
