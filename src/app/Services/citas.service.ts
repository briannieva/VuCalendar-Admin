import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  URL_BACKEND:any = 'https://api.lacarorojas.cl/api/'

  
  // Observable para emitir cambios
  private citasActualizadas$ = new BehaviorSubject<boolean>(false);
  
  constructor(
    public http: HttpClient
  ){}

  // ✅ Observable que los componentes pueden suscribirse
  getCitasActualizadasObservable() {
    return this.citasActualizadas$.asObservable();
  }

  // ✅ Método para emitir cambios
  emitirActualizacion() {
    this.citasActualizadas$.next(true);
  }

  listCitas(){
    let URL = this.URL_BACKEND+"citas";

    return this.http.get(URL);
  }

  listServicio(){
    let URL = this.URL_BACKEND+"servicios";

    return this.http.get(URL);
  }

  listHorarios(){
    let URL = this.URL_BACKEND+"horarios";

    return this.http.get(URL);
  }

  listSesiones(){
    let URL = this.URL_BACKEND+"sesion";

    return this.http.get(URL);
  }

  editCita(id:any, data:any){
    let URL = this.URL_BACKEND+"citas/" + id;

    return this.http.patch(URL, data);
  }

  getInfoCita(id:any){
    let URL = this.URL_BACKEND+"citas/" + id;

    return this.http.get(URL);
  }
}
