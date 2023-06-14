import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay } from 'date-fns';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {EventColor} from 'calendar-utils'
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { addMonths, subDays, addDays } from 'date-fns';
import { IpcRenderer } from 'electron';
registerLocaleData(localeEs);
declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }
}
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  confirmado: {
    primary: '#00B300',
    secondary: '#C8FACD',
  },
  pendiente: {
    primary: '#FFD700',
    secondary: '#FFF7D3',
  },
  cancelado: {
    primary: '#FF0000',
    secondary: '#FFCACA',
  },
};

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})  
export class AgendaComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  isDayView: boolean;
  modalRef: NgbModalRef;
  newEventTitle: string;
  newEventStart: string;
  newEventEnd: string;
  locale: string = "es";
  view: CalendarView = CalendarView.Month;
  newEventStatus: string;
  names: string[] = ['Jose, Pavel, Litro', 'Andres, Cruz, Rios'];
  Pacientes: any;
  constructor(private modalService: NgbModal, private changeDetectorRef:ChangeDetectorRef) {
    this.newEventTitle = '';
    this.newEventStart = new Date().toISOString();
    this.newEventEnd = new Date().toISOString();
    this.newEventStatus = 'confirmado';
    this.Pacientes = []
  }
  ngOnInit():void{
    window.ipcRenderer.send("DataBase","ListPacientes")
    window.ipcRenderer.on("resPacientes",(event, resPacientes) =>{
      this.Pacientes = resPacientes;
      console.log(this.Pacientes,resPacientes)
      this.changeDetectorRef.detectChanges()
    })
  }


  agregarEvento() {
    const nuevoEvento: CalendarEvent = {
      title: this.newEventTitle,
      start: new Date(this.newEventStart),
      end: new Date(this.newEventEnd),
      color: colors[this.newEventStatus],
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    };
    this.events = [...this.events, nuevoEvento];
  }
  

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  openModal(content: any): void {
    this.modalRef = this.modalService.open(content);
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  changeToDayView() {
    this.isDayView = true;
  }

  changeToMonthView() {
    this.isDayView = false;
  }
  

  prev(): void {
    if (this.view === CalendarView.Month) {
      this.viewDate = addMonths(this.viewDate, -1); // Restar 1 mes
    } 
  }
  
  next(): void {
    if (this.view === CalendarView.Month) {
      this.viewDate = addMonths(this.viewDate, 1); // Sumar 1 mes
    }
  }
}
