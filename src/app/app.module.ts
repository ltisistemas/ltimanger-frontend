import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { DxSelectBoxModule, DxDropDownBoxModule, DxTemplateModule, DxPopupModule, DxFormModule } from 'devextreme-angular';
import { CompanyService } from './shared/services/company/company.service';
import { InterceptorModule } from './shared/services/interceptors/interceptor.module';
import { IbgeService } from './shared/services/generals/ibge.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxDropDownBoxModule,
    DxTemplateModule,
    DxFormModule,
    HttpClientModule,
    InterceptorModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
  ],
  providers: [AuthService, ScreenService, AppInfoService, CompanyService, IbgeService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
