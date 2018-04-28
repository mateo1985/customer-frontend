import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {ActionsComponent} from './actions.component';
import {CustomerService} from '../services/customer.service';
import {CustomerServiceMock} from '../services/customer.service.mock';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

fdescribe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;
  let customerServiceMock: CustomerServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsComponent ],
      providers: [
        {provide: CustomerService, useClass: CustomerServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([CustomerService], (service: CustomerServiceMock) => {
    customerServiceMock = service;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add customer', () => {
      const customerServiceSpy = spyOn(customerServiceMock, 'addEditModal');
      const actionsElement: DebugElement = fixture.debugElement;
      const addButton = actionsElement.query(By.css('button[matTooltip="Add customer"]'));
      addButton.nativeElement.click();

      fixture.whenStable().then(() => {
        expect(customerServiceSpy).toHaveBeenCalledTimes(1);
      });
    }
  );

  it('should refresh customers', () => {
      const customerServiceSpy = spyOn(customerServiceMock, 'getFromEndpoint');
      const actionsElement: DebugElement = fixture.debugElement;
      const refreshButton = actionsElement.query(By.css('button[matTooltip="Refresh data"]'));
      refreshButton.nativeElement.click();

      fixture.whenStable().then(() => {
        expect(customerServiceSpy).toHaveBeenCalledTimes(1);
      });
    }
  );
});
