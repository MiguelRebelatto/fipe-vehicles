import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  constructor(
    private httpClient: HttpClient
  ) { }


  get(url: string) {
    return this.httpClient.get<any>(url)
  }

}
