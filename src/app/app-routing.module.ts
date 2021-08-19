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
  DxTabPanelModule,
  DxTileViewModule,
  DxButtonModule,
  DxTextAreaModule,
  DxDraggableModule,
  DxListModule,
  DxLoadPanelModule
} from 'devextreme-angular';
import { EmpresasComponent } from './pages/admin/empresas/empresas.component';
import { EmpresaUsuariosComponent } from './pages/admin/empresas/empresa-usuarios/empresa-usuarios.component';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './pages/kanban/boards/boards/boards.component';
import { ListsComponent } from './pages/kanban/boards/lists/lists.component';
import { DxoAppointmentDraggingModule } from 'devextreme-angular/ui/nested';
import { ListsCreateCardComponent } from './pages/kanban/boards/lists/lists-create-card/lists-create-card.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'pages/kanban/boards/lists/lists-create-card',
    component: ListsCreateCardComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'quadros/:board_id/:lista',
    component: ListsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'quadros',
    component: BoardsComponent,
    canActivate: [ AuthGuardService ]
  },
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
    redirectTo: 'quadros',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    CommonModule,
    FormsModule,
    DxDataGridModule,
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
    DxoAppointmentDraggingModule,
    DxListModule,
    DxLoadPanelModule
  ],
  providers: [AuthGuardService, AdminGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, EmpresasComponent, EmpresaUsuariosComponent, BoardsComponent, ListsComponent, ListsCreateCardComponent],
})
export class AppRoutingModule {}
