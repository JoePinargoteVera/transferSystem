import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeDepositoComponent } from './formulario-de-deposito.component';

describe('FormularioDeDepositoComponent', () => {
  let component: FormularioDeDepositoComponent;
  let fixture: ComponentFixture<FormularioDeDepositoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioDeDepositoComponent]
    });
    fixture = TestBed.createComponent(FormularioDeDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
