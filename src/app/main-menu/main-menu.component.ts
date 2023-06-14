import { Component , OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  constructor(private router:Router, private changeDetectorRef:ChangeDetectorRef){}
  ngOnInit(): void {
  }

  GoPacientes(){
    this.router.navigate(['/Pacientes'])
  }

  GoAgenda(){
    this.router.navigate(['/Agenda'])
  }

}
