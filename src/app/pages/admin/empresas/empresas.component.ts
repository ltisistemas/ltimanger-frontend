import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyModelService } from 'src/app/shared/services/company/company.model';
import { CompanyService } from 'src/app/shared/services/company/company.service';
import { Cidades, Estados, IbgeService } from 'src/app/shared/services/generals/ibge.service';

@Component({
  selector: 'app-admin-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {
  public list: CompanyModelService[] = []
  public estados: Estados[] = []
  public cidades: Cidades[] = []
  public editCellTemplate: any
  public loading = false
  public formData: any = {}
  public datasource: any = {}

  @ViewChild('dataGrid') dataGrid: any;

  constructor(private service: CompanyService, private ibge: IbgeService) { }

  ngOnInit() {
    this.loadData()
  }

  public onEditingStart(evt: any) {
    this.formData = evt.data
    console.log(this.formData, evt)
  }
  public onEditorPreparing(evt: any) {
    // console.log('> EVT: ', evt)

    if (evt.dataField === 'state_code') {
      const defaultValueChangeHandler = evt.editorOptions.onValueChanged;
      evt.editorOptions.onValueChanged = (e: any) => {
        const {value} = e
        if (value !== undefined) {
          this.onValueChangedEstados(value)
        }

        defaultValueChangeHandler(e)
      }
    }
  }

  private async loadData() {
    const loadOptions: any = {userData: {id: 4}}
    this.datasource = await this.service.dataSource.load(loadOptions)

    const estados = await this.ibge.estados()
    this.estados = estados && estados.map(_ => {
      return {
        id: _.id,
        sigla: _.sigla,
        nome: _.nome
      }
    }).sort((a, b) => a.nome > b.nome ? 1 : -1)
  }

  public showUsers() {

  }
  private async onValueChangedEstados(id: any) {
    console.log('> formData', this.formData)
    const estado = this.estados.find(est => est.id === id)
    this.formData.state_code = id
    this.cidades = estado && await (await this.ibge.cidades(estado.sigla)).sort((a, b) => a.nome > b.nome ? 1 : -1) || []
  }
}
