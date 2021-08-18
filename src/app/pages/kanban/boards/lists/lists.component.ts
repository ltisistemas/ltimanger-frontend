import {
  AfterViewInit,
  Component,
  Input,
  NgZone,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services';
import { ListsModelService } from 'src/app/shared/services/lists/list.model';
import { ListService } from 'src/app/shared/services/lists/list.service';
import { UUID } from 'angular2-uuid';
import { on, trigger, off } from 'devextreme/events';
import Draggable from 'devextreme/ui/draggable';
import { TaskService } from 'src/app/shared/services/tasks/task.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit, AfterViewInit {
  public lista = '';
  public listas: any[] = [];
  public boradId = '';
  private user: any;
  public currentTextAreaValue = '';
  public isLoadPanelVisible: boolean = true;
  public isCompanyUser: boolean;

  public doingTasks: any[] = [
    { id: 1, text: 'Prepare 2019 Financial' },
    { id: 2, text: 'Prepare 2019 Marketing Plan' },
    { id: 3, text: 'Update Personnel Files' },
    {
      id: 4,
      text: 'Review Health Insurance Options Under the Affordable Care Act',
    },
  ];
  public plannedTasks: any[] = [
    { id: 5, text: 'New Brochures' },
    { id: 6, text: '2019 Brochure Designs' },
    { id: 7, text: 'Brochure Design Review' },
    { id: 8, text: 'Website Re-Design Plan' },
    { id: 9, text: 'Rollout of New Website and Marketing Brochures' },
    { id: 10, text: 'Create 2018 Sales Report' },
  ];

  constructor(
    private activeRoute: ActivatedRoute,
    private auth: AuthService,
    private service: ListService,
    private taskService: TaskService,
    private _ngZone: NgZone
  ) {
    this.isLoadPanelVisible = true;
    this.getParams();
    this.isCompanyUser = this.auth.isCompanyUser;
  }
  ngAfterViewInit(): void {}

  ngOnInit() {}

  public getParams = () => this._getParams();
  private async _getParams() {
    const $this = this;
    $this.activeRoute.params.subscribe(async (params) => {
      $this.lista = params.lista;
      $this.boradId = params.board_id;
      $this.user = $this.auth.getUserLogged;

      const loadOptions: any = {
        userData: {
          company_id: $this.user.company_id,
          company_board_id: $this.boradId,
        },
      };

      setTimeout(async () => {
        $this._ngZone.runOutsideAngular(async () => {
          $this.service.load(loadOptions).then((response) => {
            const { data, code }: any = response;
            const lists: any[] = code === 200 ? Array.from(data) : [];

            $this.listas = lists.map((list: ListsModelService) => {
              const cards: any[] = list.list_tasks ?? [];
              const object = {
                ...list,
                cards,
                uuid: UUID.UUID(),
                editing: false,
              };
              object.cards.map((card) => {
                card.list_id = list._id;
              });

              delete list.list_tasks;
              return object;
            });

            $this._ngZone.run(() => {
              this.isLoadPanelVisible = false;
            });
          });
        });
      }, 1000);
    });
  }

  public addCard = (lista: any) => this._addCard(lista);
  private _addCard(lista: any) {
    lista.editing = true;
  }
  public createCard = (lista: any) => this._createCard(lista);
  private _createCard(lista: any) {
    const card = {
      _id: UUID.UUID(),
      title: this.currentTextAreaValue,
      uuid: UUID.UUID(),
    };

    this.taskService.store(card).then((response: any) => {
      if (response.code === 200) {
        lista.cards.push(response.data);
        notify('Card incluido com sucesso', 'success', 2000);
      } else {
        notify('Erro ao incluir o novo card. Tente novamente', 'error', 2000);
      }

      this.currentTextAreaValue = '';
      lista.editing = false;
    });
  }

  public removeCard = (lista: any, index: number) =>
    this._removeCard(lista, index);
  private _removeCard(lista: any, index: number) {
    lista.editing = false;
  }

  private fromData = {};

  public onDragStart = (e: any) => this._onDragStart(e);
  private _onDragStart(e: any) {
    e.itemData = e.fromData[e.fromIndex];
  }

  public onAdd = (e: any) => this._onAdd(e);
  private _onAdd(e: any) {
    this.isLoadPanelVisible = true;
    const element = <HTMLElement>e.element;
    this.taskService
      .update(e.itemData._id, {
        company_list_id: element.getAttribute('data-lista-id'),
      })
      .then((data) => {
        e.toData.splice(e.toIndex, 0, e.itemData);
        console.log(data);
        this.isLoadPanelVisible = false;
      })
      .catch((error) => {
        this.isLoadPanelVisible = false;
        console.log('> Error: ', error);
      });
  }

  public onRemove = (e: any) => this._onRemove(e);
  private _onRemove(e: any) {
    e.fromData.splice(e.fromIndex, 1);
  }
}
