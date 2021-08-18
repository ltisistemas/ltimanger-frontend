import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { AuthService } from 'src/app/shared/services';
import { CompanyUserService } from 'src/app/shared/services/company-user/company-user.service';
import { CompanyModelService } from 'src/app/shared/services/company/company.model';

@Component({
  selector: 'app-empresa-usuarios',
  templateUrl: './empresa-usuarios.component.html',
  styleUrls: ['./empresa-usuarios.component.scss'],
})
export class EmpresaUsuariosComponent implements OnInit, OnChanges {
  public datasource: any;
  public dsPerfil: any[];
  public dsTipoContrato: any[];
  public formData: any = {};
  private user: any;
  @Input() empresa: CompanyModelService = {};

  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;

  constructor(private service: CompanyUserService, private auth: AuthService) {
    this.dsPerfil = [
      { id: 'COMPANY_ADMIN', describe: 'Admin' },
      { id: 'COMPANY_USER', describe: 'Usuário' },
    ];

    this.dsTipoContrato = [
      { id: 'PJ', describe: 'Contrato Continuo (PJ)' },
      { id: 'FREELA', describe: 'Contrato Pontual(Freela)' },
      { id: 'CLT', describe: 'CLT' },
    ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('> Entrou');
    this.empresa = changes.empresa.currentValue;

    setTimeout(() => {
      this.service.company_id = this.empresa._id;
      this.refreshDataGrid();
    });
  }

  ngOnInit() {
    this.user = this.auth.getUserLogged;

    if (!Object.keys(this.empresa).length) {
      this.service.company_id = this.user.company_id;
      this.datasource = this.service.dataSource;
    } else {
      this.service.company_id = this.empresa._id;
      this.datasource = this.service.dataSource;
    }

    console.log('> ', this.service.company_id)
  }

  public onEditingStart = (evt: any) => this._onEditingStart(evt);
  private _onEditingStart(evt: any) {
    this.formData.company_id = this.empresa._id;
  }
  public onRowInserting = (evt: any) => this._onRowInserting(evt);
  private _onRowInserting(evt: any) {
    console.log('> this.formData', this.formData);
    evt.data.company_id = this.empresa._id;
    console.log(evt);
    evt;
  }

  public onToolbarPreparing = async (e: any) => this._onToolbarPreparing(e);
  private async _onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this),
        },
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'plus',
          onClick: this.addRow.bind(this),
        },
      }
    );
  }
  private refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  public addRow = () => this._addRow();
  private _addRow() {
    this.dataGrid.instance.addRow();
  }
}
