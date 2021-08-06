import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './shared/components';
import { AdminGuardService, AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import {
  DxDataGridModule,
  DxSelectBoxModule,
  DxDropDownBoxModule,
  DxTemplateModule,
  DxPopupModule,
  DxFormModule,
  DxScrollViewModule,
  DxTabPanelModule
} from 'devextreme-angular';
import { EmpresasComponent } from './pages/admin/empresas/empresas.component';
import { EmpresaUsuariosComponent } from './pages/admin/empresas/empresa-usuarios/empresa-usuarios.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'pages/admin/empresa-usuarios',
    component: EmpresaUsuariosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/admin/empresas',
    component: EmpresasComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    CommonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxDropDownBoxModule,
    DxTemplateModule,
    DxPopupModule,
    DxFormModule,
    DxScrollViewModule,
    DxTabPanelModule,
  ],
  providers: [AuthGuardService, AdminGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, EmpresasComponent, EmpresaUsuariosComponent],
})
export class AppRoutingModule {}
