import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  URL_BACKEND:any = 'https://api.lacarorojas.cl/api/'
  
  constructor(
    public http: HttpClient
  ){}

  listCitas(){
    let URL = this.URL_BACKEND+"citas";

    return this.http.get(URL);
  }
}
