import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompanyModelService } from './company.model';

@Injectable()
export class _CompanyService {
  constructor(private http: HttpClient) { }

  async index(id = 0) {
    let params = new HttpParams()
    if (id !== 0) {
      params = params.append('id', id)
    }

    const url = `${environment.base_url}auth/admin/companies`
    const { data, code }: any = await this.http.get<CompanyModelService>(url, {
      params
    }).toPromise()
    return code === 200 ? data : null
  }
}
