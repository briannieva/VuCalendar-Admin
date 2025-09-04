import { Component, Input } from '@angular/core';
import { CitasService } from '../../Services/citas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCita } from '../edit-cita/edit-cita';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-citas',
  standalone: false,
  templateUrl: './citas.html',
  styleUrl: './citas.scss'
})
export class Citas {
@Input() selectedDate: Date = new Date();

  citas:any[] = [];
  private actualizacionSub!: Subscription;

  idCita:any = null;

  hora:any = null;
  sesion:any = null;
  servicio:any = null;

  constructor(
    private citasService: CitasService,
    public modalService: NgbModal
  ){}

  ngOnInit(){
    this.loadCitas();
  }

  ngOnChanges(){
    this.loadCitas();

    this.actualizacionSub = this.citasService.getCitasActualizadasObservable()
    .subscribe(actualizado => {
      if (actualizado) {
        this.loadCitas();
      }
    });
  }

  ngOnDestroy() {
    if (this.actualizacionSub) {
      this.actualizacionSub.unsubscribe();
    }
  }

  loadCitas(): void {
    this.citasService.listCitas().subscribe((resp:any) => {

      const dateString = this.selectedDate.toISOString().split('T')[0];

      this.citas = resp
        .filter((cita: any) => cita.fechaHoraCita.startsWith(dateString))
        .map((cita: any) => {
          this.hora = cita.fechaHoraCita.split('T')[1].substring(0, 5); // "HH:MM"

          return {
            id: cita._id,
            date: cita.fechaHoraCita,
            time: this.hora,
            duration: '60',
            type: cita.tipoSesionCita,
            patient: {
              name: cita.nombreClienteCita,
              phone: cita.whatsAppClienteCita
            },
            service: cita.nombreServicioCita,
            notes: cita.descripcionServicioCita,
            price: cita.precioServicioCita,
            status: 'Agendada'
          };
        })
        .sort((a: any, b: any) => a.time.localeCompare(b.time));
    });
  }

  updateStatus(id: string, status: string): void {
    const appointment = this.citas.find(a => a.id === id);
    if (appointment) {
      appointment.status = status;
    }
  }

  getFormattedDate(): string {
    return this.selectedDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  openModalEditCita(id: any) {
    // Encontrar la cita por ID
    const cita = this.citas.find(c => c.id === id);
    
    if (cita) {
      // Crear referencia del modal
      const modalRef = this.modalService.open(EditCita, {
        centered: true,
        size: 'md'
      });
      
      // Pasar los datos de la cita al modal
      modalRef.componentInstance.citaData = cita;
      
      // Manejar el resultado cuando se cierra el modal
      modalRef.result.then((result) => {
        if (result && result !== 'cancel') {
          // Actualizar la cita en el array local
          const index = this.citas.findIndex(c => c.id === result.id);
          if (index !== -1) {
            this.citas[index].service = result.servicio;
            this.citas[index].time = result.hora;
            this.citas[index].type = result.sesion;
          }
          // console.log('Cita actualizada:', result);
        }
      }).catch((error) => {
        console.log('Modal cerrado sin cambios:', error);
      });
    }
  }

}
