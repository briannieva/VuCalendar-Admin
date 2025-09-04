import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CitasService } from '../../Services/citas.service';

@Component({
  selector: 'app-edit-cita',
  standalone: false,
  templateUrl: './edit-cita.html',
  styleUrl: './edit-cita.scss'
})
export class EditCita implements OnInit {
  @Input() citaData: any = {};

  idCita: any = null;

  servicios: any = [];
  horarios: any = [];
  sesiones: any = [''];

  servicioActual: string = '';
  horaActual: string = '';
  sesionActual: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    public citaService: CitasService
  ){}

  ngOnInit(){
    this.servicioActual = this.citaData.service;
    this.horaActual = this.citaData.time;
    this.sesionActual = this.citaData.type;
    this.idCita = this.citaData.id;
    
    this.citaService.listServicio().subscribe((resp:any) => {
      this.servicios = resp;
    })
    
    this.citaService.listHorarios().subscribe((resp:any) => {
      this.horarios = resp;
    })

    this.citaService.listSesiones().subscribe((resp: any) => {
      this.sesiones = resp;
    })
  }

  guardarCambios() {
    const datosActualizados = {
      "nombreServicioCita": this.servicioActual,
      "fechaHoraCita": this.horaActual,
      "tipoSesionCita": this.sesionActual
    };
    
    this.citaService.editCita(this.idCita, datosActualizados).subscribe((resp:any) => {
      this.citaService.emitirActualizacion();
    })

    this.activeModal.close(datosActualizados);
  }

  onServicioChange() {
    console.log('Nuevo servicio seleccionado:', this.servicioActual);
  }

  onHoraChange() {
    console.log('Nuevo horario seleccionado:', this.horaActual);
  }

  onSesionChange() {
    console.log('Nueva sesion seleccionado:', this.sesionActual);
  }

  cancelar() {
    this.activeModal.dismiss('cancel');
  }
}
