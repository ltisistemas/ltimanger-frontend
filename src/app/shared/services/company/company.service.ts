import { HttpClient, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { environment } from 'src/environments/environment';
import { CompanyModelService } from './company.model';
import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import DevExpress from 'devextreme';

@Injectable()
export class CompanyService {
  dataSource: CustomStore;
  constructor(private http: HttpClient) {
    this.dataSource = new CustomStore({
      key: 'id',
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

    const { userData } = loadOptions
    Object.keys(userData).map(k => {
      params = params.set(k, userData[k]);
    })

    const url = `${environment.base_url}auth/admin/companies`;

    return this.http
      .get<CompanyModelService[]>(url, {
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
    const url = `${environment.base_url}auth/admin/companies`;
    return this.http.post(url, values).toPromise()
  }
  private async update(key: any, values: any) {
    const url = `${environment.base_url}auth/admin/companies/${key}`;
    console.log('> update:', key, values)

    return this.http.put(url, values).toPromise()
  }
}
