import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  SideNavOuterToolbarModule,
  SideNavInnerToolbarModule,
  SingleCardModule,
} from './layouts';
import {
  FooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
} from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import {
  DxSelectBoxModule,
  DxDropDownBoxModule,
  DxTemplateModule,
  DxPopupModule,
  DxFormModule,
  DxScrollViewModule,
  DxTabPanelModule,
  DxTileViewModule,
  DxButtonModule,
  DxTextAreaModule,
  DxDraggableModule,
  DxListModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { CompanyService } from './shared/services/company/company.service';
import { InterceptorModule } from './shared/services/interceptors/interceptor.module';
import { IbgeService } from './shared/services/generals/ibge.service';
import { CompanyUserService } from './shared/services/company-user/company-user.service';
import { CommonModule } from '@angular/common';
import { BoardService } from './shared/services/boards/boards.service';
import { ListService } from './shared/services/lists/list.service';
import { DxoAppointmentDraggingModule } from 'devextreme-angular/ui/nested';
import { TaskService } from './shared/services/tasks/task.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxDropDownBoxModule,
    DxTemplateModule,
    DxFormModule,
    DxScrollViewModule,
    DxTabPanelModule,
    DxTileViewModule,
    DxButtonModule,
    DxTextAreaModule,
    DxDraggableModule,
    DxoAppointmentDraggingModule,
    DxListModule,
    DxLoadPanelModule,
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
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    CompanyService,
    IbgeService,
    CompanyUserService,
    BoardService,
    ListService,
    TaskService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
