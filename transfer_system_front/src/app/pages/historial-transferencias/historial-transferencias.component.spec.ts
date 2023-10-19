import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTransferenciasComponent } from './historial-transferencias.component';

describe('HistorialTransferenciasComponent', () => {
  let component: HistorialTransferenciasComponent;
  let fixture: ComponentFixture<HistorialTransferenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialTransferenciasComponent]
    });
    fixture = TestBed.createComponent(HistorialTransferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
