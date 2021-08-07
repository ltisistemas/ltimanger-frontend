import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  public lista = ''

  constructor(private activeRoute: ActivatedRoute) {
    this.getParams()
  }

  ngOnInit() {
  }

  private async getParams() {
    this.activeRoute.params.subscribe(params => {
      this.lista = params.lista
    })
  }

}
