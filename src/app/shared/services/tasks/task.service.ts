import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import DevExpress from 'devextreme';
import { TasksModelService } from './task.model';

@Injectable()
export class TaskService {
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

  public async load(loadOptions: DevExpress.data.LoadOptions) {
    let params = new HttpParams();

    const { userData } = loadOptions
    Object.keys(userData).map(k => {
      params = params.set(k, userData[k]);
    })

    const url = `${environment.base_url}auth/board-lists-tasks`;

    return this.http
      .get<TasksModelService[]>(url, {
        params,
      })
      .toPromise()
      .then(response => {
        const { data, code }: any = response
        const result = Array.from(data)
        return code === 200 ? result : null
      });
  }
  public async store(values: any) {
    const url = `${environment.base_url}auth/board-lists-tasks`;
    let headers = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded')

    return this.http.post(url, values).toPromise()
  }
  public async update(key: any, values: any) {
    const url = `${environment.base_url}auth/board-lists-tasks/${key}`;
    return this.http.put(url, values).toPromise()
  }
}
