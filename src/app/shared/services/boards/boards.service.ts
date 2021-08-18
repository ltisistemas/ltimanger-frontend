import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { environment } from 'src/environments/environment';
import { BoardsModelService } from './boards.model';
import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import DevExpress from 'devextreme';

@Injectable()
export class BoardService {
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

  public async load(loadOptions: DevExpress.data.LoadOptions) {
    let params = new HttpParams();

    const { userData } = loadOptions
    Object.keys(userData).map(k => {
      params = params.set(k, userData[k]);
    })

    const url = `${environment.base_url}auth/boards`;

    return this.http
      .get<BoardsModelService[]>(url, {
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
  public async store(values: any) {
    const url = `${environment.base_url}auth/boards`;
    let headers = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded')

    return this.http.post(url, values).toPromise()
  }
  public async update(key: any, values: any) {
    const url = `${environment.base_url}auth/boards/${key}`;
    return this.http.put(url, values).toPromise()
  }
}
