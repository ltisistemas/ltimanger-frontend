import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { environment } from 'src/environments/environment';
import { CompanyUserModelService } from './company-user.model';
import { Injectable } from '@angular/core';
import DevExpress from 'devextreme';

@Injectable()
export class CompanyUserService {
  private headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  private _company_id: any
  public set company_id(id: any) {
    this._company_id = id
  }
  public get company_id() {
    return this._company_id
  }

  dataSource: CustomStore;
  constructor(private http: HttpClient) {
    this.dataSource = new CustomStore({
      key: '_id',
      loadMode: 'raw',
      load: (loadOptions: DevExpress.data.LoadOptions) => this.load(loadOptions),
      insert: (values) => this.store(values),
      update: (key, values) => this.update(key, values),

    });
  }

  private isNotEmpty(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  private async load(loadOptions: DevExpress.data.LoadOptions) {
    let params = new HttpParams();
    params = params.set('company_id', this.company_id);

    const url = `${environment.base_url}auth/admin/companie-users`;

    return this.http
      .get<CompanyUserModelService[]>(url, {
        params,

      })
      .toPromise()
      .then(response => {
        const { data, code }: any = response
        const result = Array.from(data)
        result.map((r: any) => {
          r.state_code = parseInt(r.state_code, 10)
          r.city_code = parseInt(r.state_code, 10)
          return r
        })
        return code === 200 ? result : null
      });
  }

  private async store(values: any) {
    console.log('> store', values)
    const url = `${environment.base_url}auth/admin/companie-users`;
    let headers = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded')

    values['company_id'] = this.company_id
    return this.http.post(url, values).toPromise()
  }
  private async update(key: any, values: any) {
    const url = `${environment.base_url}auth/admin/companie-users/${key}`;
    console.log('> update:', key, values)

    return this.http.put(url, values).toPromise()
  }
}
