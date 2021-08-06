import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { CompanyModelService } from 'src/app/shared/services/company/company.model';
import { CompanyService } from 'src/app/shared/services/company/company.service';
import {
  Cidades,
  Estados,
  IbgeService,
} from 'src/app/shared/services/generals/ibge.service';
import { ScreenService } from 'src/app/shared/services';

@Component({
  selector: 'app-admin-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
})
export class EmpresasComponent implements OnInit {
  public list: CompanyModelService[] = [];
  public estados: Estados[] = [];
  public cidades: Cidades[] = [];
  public editCellTemplate: any;
  public loading = false;
  public formData: any = {};
  public datasource: any = {};
  private selectedState: Estados | any = {};
  public popupVisible = false;
  public dimensions = { width: 0, height: 0 }
  public selected: CompanyModelService = {}

  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;

  constructor(private service: CompanyService, private ibge: IbgeService, private screen: ScreenService) {
    this.loadData();
    this.dimensions.width = document.body.offsetWidth * 0.98
    this.dimensions.height = document.body.offsetHeight * 0.98

  }

  ngOnInit() {}

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
  public addRow = () => this._addRow();
  private _addRow() {
    this.dataGrid.instance.addRow();
  }
  private refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  public async onEditingStart(evt: any) {
    this.formData = evt.data;

    const estado = this.estados.find(
      (est) => est.id === this.formData.state_code
    );
    this.cidades =
      (estado &&
        (await this.ibge.cidades(estado.sigla)).sort((a, b) =>
          a.nome > b.nome ? 1 : -1
        )) ||
      [];
  }
  public onEditorPreparing(evt: any) {
    if (evt.parentType === 'dataRow' && evt.dataField === 'city_code') {
      evt.editorOptions.disabled = typeof evt.row.data.state_code !== 'number';
    }
    if (evt.dataField === 'state_code') {
      // const defaultValueChangeHandler = evt.editorOptions.onValueChanged;
      // evt.editorOptions.onValueChanged = (e: any) => {
      //   const {value} = e
      //   if (value !== undefined) {
      //     this.onValueChangedEstados(value)
      //   }
      //   defaultValueChangeHandler(e)
      // }
    }
  }

  public setStateValue = async (rowData: any, value: any) =>
    this._setStateValue(rowData, value);
  private _setStateValue(rowData: any, value: any): void {
    rowData.city_code = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }

  private async loadData() {
    const loadOptions: any = { userData: {} };
    this.datasource = await this.service.dataSource;

    const estados = await this.ibge.estados();
    this.estados =
      estados &&
      estados
        .map((_) => {
          return {
            id: _.id,
            sigla: _.sigla,
            nome: _.nome,
          };
        })
        .sort((a, b) => (a.nome > b.nome ? 1 : -1));

    const cidades = await this.ibge.cidades('PE');
    this.cidades = cidades.sort((a, b) => (a.nome > b.nome ? 1 : -1));
  }

  public showUsers = (e: any) => this._showUsers(e)
  private _showUsers(e: any) {
    const { row } = e;
    const { data } = row;
    this.selected = {};
    this.selected = data;

    this.popupVisible = false;
    this.popupVisible = true;
  }
  private async onValueChangedEstados(id: any) {
    const estado = this.estados.find((est) => est.id === id);
    if (estado) {
      this.selectedState = estado;
    }

    this.formData.state_code = id;
    this.cidades =
      (estado &&
        (await this.ibge.cidades(estado.sigla)).sort((a, b) =>
          a.nome > b.nome ? 1 : -1
        )) ||
      [];
  }

  public get isEmpty() {
    return !!Object.keys(this.selected).length
  }
}
