import { Component, Input } from '@angular/core';
import { CitasService } from '../../Services/citas.service';

@Component({
  selector: 'app-citas',
  standalone: false,
  templateUrl: './citas.html',
  styleUrl: './citas.scss'
})
export class Citas {
@Input() selectedDate: Date = new Date();

  citas:any[] = [];

  constructor(
    private citasService: CitasService
  ){}

  ngOnInit(){
    this.loadCitas();
  }

  ngOnChanges(){
    this.loadCitas();
  }

  loadCitas(): void {
    this.citasService.listCitas().subscribe((resp:any) => {
      const dateString = this.selectedDate.toISOString().split('T')[0];

      this.citas = resp
        .filter((cita: any) => cita.fechaHoraCita.startsWith(dateString))
        .map((cita: any) => {
          const horaCita = cita.fechaHoraCita.split('T')[1].substring(0, 5); // "HH:MM"

          return {
            id: cita._id,
            date: cita.fechaHoraCita,
            time: horaCita,
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

}
