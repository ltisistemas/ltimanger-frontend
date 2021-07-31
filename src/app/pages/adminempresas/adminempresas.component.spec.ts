import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminempresasComponent } from './adminempresas.component';

describe('AdminempresasComponent', () => {
  let component: AdminempresasComponent;
  let fixture: ComponentFixture<AdminempresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminempresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminempresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
