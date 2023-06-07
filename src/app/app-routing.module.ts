import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PacientesComponent } from './pacientes/pacientes.component';

const routes: Routes = [
  {
    path:'', component: MainMenuComponent
  },
  {
    path:'Pacientes', component: PacientesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
