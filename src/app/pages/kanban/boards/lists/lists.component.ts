import {
  AfterViewInit,
  Component,
  Input,
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
  public currentTextAreaValue = ''

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
    private taskService: TaskService
  ) {
    this.getParams();
  }
  ngAfterViewInit(): void {
  }

  ngOnInit() {}

  private async getParams() {
    this.activeRoute.params.subscribe(async (params) => {
      this.lista = params.lista;
      this.boradId = params.board_id;
      this.user = this.auth.getUserLogged;

      const loadOptions: any = {
        userData: {
          company_id: this.user.company_id,
          company_board_id: this.boradId,
        },
      };

      const lists: any = await this.service.load(loadOptions);

      this.listas = lists.map(async (list: ListsModelService) => {
        const cards: any[] = [];
        const object = Object.assign({ cards, uuid: UUID.UUID(), editing: false }, list);

        const id: any = list._id
        const loadOptions: any = {
          userData: {
            company_list_id: id,
          },
        };
        // const tasks: any = await this.taskService.load(loadOptions);

        return object;
      });
    });
  }

  public addCard = (lista: any) => this._addCard(lista);
  private _addCard(lista: any) {
    lista.editing = true
  }
  public createCard = (lista: any) => this._createCard(lista);
  private _createCard(lista: any) {
    const card = {
      id: 0,
      title: this.currentTextAreaValue,
      uuid: UUID.UUID(),
    };

    if (!lista.hasOwnProperty('cards')) {
      lista.cards = []
    }

    lista.cards.push(card);
    this.currentTextAreaValue = ''
    lista.editing = false;

    // (async () => {
    //   await this.taskService.store({ title: card.title, description: '' })
    // })()
  }

  public removeCard = (lista: any, index: number) =>
    this._removeCard(lista, index);
  private _removeCard(lista: any, index: number) {
    lista.editing = false
  }
  //

  onDragStart(e: any) {
    e.itemData = e.fromData[e.fromIndex];
  }

  onAdd(e: any) {
    e.toData.splice(e.toIndex, 0, e.itemData);
  }

  onRemove(e: any) {
    e.fromData.splice(e.fromIndex, 1);
  }
}
