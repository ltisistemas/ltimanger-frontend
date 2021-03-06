import { Component, OnInit } from '@angular/core';
import { BoardsModelService } from 'src/app/shared/services/boards/boards.model';
import notify from 'devextreme/ui/notify';
import { BoardService } from 'src/app/shared/services/boards/boards.service';
import { AuthService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  public boards: BoardsModelService[] = [];
  public popupVisible = false;
  public formData: any = { title: '' };
  public emailButtonOptions: any;
  public closeButtonOptions: any;
  public isCompanyUser: boolean
  private user: any;
  public isLoadPanelVisible: boolean = true;

  constructor(
    private service: BoardService,
    private auth: AuthService,
    private router: Router
  ) {
    this.isCompanyUser = this.auth.isCompanyUser
    if (this.isCompanyUser) {
      this.boards.push({
        id: '0',
        title: 'Criar novo quadro',
        description: 'Clique aqui para criar um novo quadro',
        stylingMode: 'contained',
        type: 'normal',
        handle: () => this.onHandleClick(null),
      });
    }

    const that = this;
    this.emailButtonOptions = {
      icon: 'check',
      text: 'Salvar',
      onClick: function (e: any) {
        that.onHandleSave();
      },
    };
    this.closeButtonOptions = {
      text: 'Fechar',
      onClick: function (e: any) {
        that.popupVisible = false;
      },
    };
  }

  ngOnInit() {
    this.loadData();
  }
  private async loadData() {
    this.user = this.auth.getUserLogged;
    const loadOptions: any = { userData: { company_id: this.user.company_id } };
    const list = await this.service.load(loadOptions);
    list?.map((l: any) => {
      this.addBoard(l);
    });

    this.isLoadPanelVisible = false
  }

  public onHandleClick = (event: any) => this._onHandleClick(event);
  private _onHandleClick(e: any) {
    this.popupVisible = true;
  }
  public onHandleSave = () => this._onHandleSave();
  private async _onHandleSave() {
    const values = {
      company_id: this.user.company_id,
      title: this.formData.title,
      description: '.',
    };
    const { data, code }: any = await this.service.store(values);
    if (code === 200) {
      this.addBoard(data);
    }

    this.formData.title = '';
    this.popupVisible = false;
  }

  private addBoard(data: any) {
    this.boards.push({
      id: data._id,
      title: data.title,
      description: '',
      stylingMode: 'contained',
      type: 'default',
      handle: () => this.router.navigate(['quadros', data._id, data.title]),
    });
  }
}
