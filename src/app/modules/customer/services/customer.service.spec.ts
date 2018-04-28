import { TestBed, inject } from '@angular/core/testing';

import { CustomerApiService } from './customer-api.service';
import {MatDialog} from '@angular/material';
import {CustomerService} from './customer.service';
import {CustomerApiServiceMock} from './customer-api.service.mock';
import {CustomerModel} from '../customer-model';

fdescribe('CustomerApiService', () => {
  let cut: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CustomerApiService, useClass: CustomerApiServiceMock},
        {
          provide: MatDialog,
          useValue: {}
        }]
    });
  });

  beforeEach(inject([CustomerApiService], (apiservice: CustomerApiService, matDialog: MatDialog) => {
    cut = new CustomerService(<any>matDialog, apiservice);
  }));

  it('should be created', inject([CustomerApiService], (service: CustomerApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('deleting', () =>{
    it('should send request to api', inject([CustomerApiService], (service: CustomerApiService) => {
      const deleteSpy = spyOn(service, 'delete');
      deleteSpy.and.returnValue(Promise.resolve());

      cut.delete(5);

      expect(deleteSpy).toHaveBeenCalledTimes(1);
    }));

    it('should remove deleted users', done => {
      inject([CustomerApiService], (service: CustomerApiService) => {
        cut.customers = [
          {
            id: 1,
            name: '',
            surname: '',
            telephoneNumber: '',
            address: ''
          },
          {
            id: 2,
            name: '',
            surname: '',
            telephoneNumber: '',
            address: ''
          }
        ];

        const deleteSpy = spyOn(service, 'delete');
        deleteSpy.and.returnValue(Promise.resolve());

        cut.delete(1).then(() => {
          expect(cut.customers.length).toBe(1);
          expect(cut.customers[0].id).toBe(2);
          done();
        });
      })();
    });

    it('refreshing', done => {
      inject([CustomerApiService], (service: CustomerApiService) => {
        const deleteSpy = spyOn(service, 'delete');
        deleteSpy.and.returnValue(Promise.resolve([]));

        cut.delete(5);

        cut.onChanged.subscribe(() => {
          done();
        });
      })();
    });
  });

  describe('getting from server', () =>{


    it('gets all users', done => {
      inject([CustomerApiService], (service: CustomerApiService) => {
        const deleteSpy = spyOn(service, 'get');
        const expectedCustomers = [
          {
            id: 1,
            name: 'name',
            surname: 'surname',
            telephoneNumber: '',
            address: ''
          },
          {
            id: 2,
            name: 'name',
            surname: 'surname',
            telephoneNumber: '',
            address: ''
          }
        ];
        deleteSpy.and.returnValue(Promise.resolve(expectedCustomers));

        cut.getFromEndpoint().then((result: CustomerModel[]) => {
          expect(result.length).toBe(2);
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
          expect(cut.customers).toBe(expectedCustomers);

          done();
        });

        expect(deleteSpy).toHaveBeenCalledTimes(1);
      })();
    });

    it('refreshing', done => {
      inject([CustomerApiService], (service: CustomerApiService) => {
        const deleteSpy = spyOn(service, 'get');
        deleteSpy.and.returnValue(Promise.resolve([]));

        cut.getFromEndpoint();

        cut.onChanged.subscribe(() => {
          done();
        });
      })();
    });

  });




});
