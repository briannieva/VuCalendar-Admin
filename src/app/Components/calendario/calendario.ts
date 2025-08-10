import { Component, EventEmitter, Output } from '@angular/core';

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointments: Appointment[];
}

interface Appointment {
  date: string;
  title: string;
  patient: string;
  type: string;
}

@Component({
  selector: 'app-calendario',
  standalone: false,
  templateUrl: './calendario.html',
  styleUrl: './calendario.scss'
})

export class Calendario {
  @Output() dateSelected = new EventEmitter<Date>();
  
  currentDate = new Date();
  calendarDays: CalendarDay[] = [];
  appointments: Appointment[] = [
    { date: '2025-08-10', title: 'Consulta con Juan', patient: 'Juan Pérez', type: 'Servicio' },
    { date: '2025-08-12', title: 'Consulta con Ana', patient: 'Ana López', type: 'Servicio' },
    { date: '2025-08-15', title: 'Revisión con Laura', patient: 'Laura Gómez', type: 'Servicio' }
  ];

  weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  constructor(){}

  ngOnInit(){
    this.generateCalendarDays();
  }

  generateCalendarDays(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    this.calendarDays = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0];
      const dayAppointments = this.appointments.filter(app => app.date === dateString);
      
      this.calendarDays.push({
        date: new Date(date),
        day: date.getDate(),
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        appointments: dayAppointments
      });
    }
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendarDays();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendarDays();
  }

  getMonthYearText(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  selectDate(date: Date): void {
    this.dateSelected.emit(date);
  }
}
