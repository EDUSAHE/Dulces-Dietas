import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }
}

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit{
  Pacientes: any
  constructor(private changeDetectorRef:ChangeDetectorRef){
    this.Pacientes = []
  }
  ngOnInit(): void {
    window.ipcRenderer.send("DataBase","ListPacientes")
    window.ipcRenderer.on("resPacientes",(event, resPacientes) =>{
      this.Pacientes = resPacientes;
      console.log(this.Pacientes,resPacientes)
      this.changeDetectorRef.detectChanges()
    })
  }
}
