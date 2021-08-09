import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsCreateCardComponent } from './lists-create-card.component';

describe('ListsCreateCardComponent', () => {
  let component: ListsCreateCardComponent;
  let fixture: ComponentFixture<ListsCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsCreateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
