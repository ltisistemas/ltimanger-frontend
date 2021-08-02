import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

export interface Estados {
  id: number,
  nome: string,
  sigla: string,
}
export interface Cidades {
  id: string,
  nome: string
}

@Injectable()
export class IbgeService {
  constructor(private http: HttpClient) {}

  async estados() {
    const url = 'https://brasilapi.com.br/api/ibge/uf/v1'
    return await this.http.get<Estados[]>(url).toPromise();
  }
  async cidades(UF: string) {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`
    return await this.http.get<Cidades[]>(url).toPromise();
  }
}
