import { Component, Input, OnInit } from '@angular/core';
import { CompanyModelService } from 'src/app/shared/services/company/company.model';

@Component({
  selector: 'app-empresa-usuarios',
  templateUrl: './empresa-usuarios.component.html',
  styleUrls: ['./empresa-usuarios.component.scss']
})
export class EmpresaUsuariosComponent implements OnInit {

  @Input() empresa: CompanyModelService = {};

  constructor() {

   }

  ngOnInit() {
    console.log(this.empresa)
  }

}
