import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ModelYear } from '../models/model-vehicle';
import { Vehicle } from '../models/vehicle';
import { Year } from '../models/year';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class FipeService extends AbstractService {

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient)
  }

  public getBrands(type: string): Observable<Array<Brand>> {
    const subject = new Subject<Array<Brand>>();

    this.get(`${environment.url}/${type}/marcas`)
      .pipe(catchError((error) => {
        subject.error(error)
        return error
      }),
        tap((result: Array<Brand>) => {
          subject.next(result)
        })
      ).subscribe();

    return subject;
  }

  public getModels(type: string, brand: string): Observable<ModelYear> {
    const subject = new Subject<ModelYear>();

    this.get(`${environment.url}/${type}/marcas/${brand}/modelos`)
      .pipe(catchError((error) => {
        subject.error(error)
        return error
      }),
        tap((result: ModelYear) => {
          subject.next(result)
        })
      ).subscribe();

    return subject;
  }

  public getYears(type: string, brand: string, model: string): Observable<Array<Year>> {
    const subject = new Subject<Array<Year>>();

    this.get(`${environment.url}/${type}/marcas/${brand}/modelos/${model}/anos`)
      .pipe(catchError((error) => {
        subject.error(error)
        return error
      }),
        tap((result: Array<Year>) => {
          subject.next(result)
        })
      ).subscribe();

    return subject;
  }

  public getVehicle(type: string, brand: string, model: string, year: string): Observable<Vehicle> {
    const subject = new Subject<Vehicle>();

    this.get(`${environment.url}/${type}/marcas/${brand}/modelos/${model}/anos/${year}`)
      .pipe(catchError((error) => {
        subject.error(error)
        return error
      }),
        tap((result: Vehicle) => {
          subject.next(result)
        })
      ).subscribe();

    return subject;
  }

}
