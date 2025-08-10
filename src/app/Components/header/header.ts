import { Component } from '@angular/core';
import Swal from 'sweetalert2'

interface Appointment {
  id: string;
  date: string;      // YYYY-MM-DD
  time: string;      // "HH:mm"
  type: 'consultation' | 'emergency' | 'followup' | 'checkup';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  // Otros campos si quieres agregarlos
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  selectedDate = new Date();
  notificationsEnabled = false;

  // Simulación de base de datos local
  private allAppointments: Appointment[] = [
  ];


  ngOnInit(): void {
    this.showNumberInputAlert();
    this.checkNotificationPermission();
    this.setupTodayAppointmentNotifications();
  }

  async showNumberInputAlert() {
    const { value: inputNumber } = await Swal.fire({
      title: 'Ingrese el código de acceso',
      input: 'password',
      inputPlaceholder: 'Ingrese el número...',
      inputAttributes: {
        min: '0',
        step: '1',
        class: 'custom-swal-input' // 👈 clase personalizada al input
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      customClass: {
        title: 'custom-swal-title',       // 👈 clase personalizada al título
        confirmButton: 'custom-swal-confirm-button' // 👈 botón personalizado
      },
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage('Debe ingresar un número');
          return false;
        }

        const expectedNumber = 131005725;
        if (parseInt(value, 10) !== expectedNumber) {
          Swal.showValidationMessage(`Contraseña incorrecta.`);
          return false;
        }

        return true;
      }
    });
  }

  async checkNotificationPermission(): Promise<void> {
    // Sin NotificationService, simula permiso concedido
    this.notificationsEnabled = true;
  }


  setupTodayAppointmentNotifications(): void {
    // Sin NotificationService, solo simula lógica
    const todayAppointments = this.getTodayAppointments();
    // Aquí podrías hacer algo con esas citas si quieres
    // Por ejemplo, console.log
    console.log('Notificaciones configuradas para:', todayAppointments.length, 'citas');
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
  }

  goToToday(): void {
    this.selectedDate = new Date();
  }

  // Método auxiliar para formatear fecha a 'YYYY-MM-DD'
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getTodayAppointments(): Appointment[] {
    const todayStr = this.formatDate(new Date());
    return this.allAppointments.filter(app => app.date === todayStr);
  }
}
