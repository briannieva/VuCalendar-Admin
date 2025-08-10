import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Header } from './Components/header/header';

const routes: Routes = [
  {
    path: '',
    component: Header
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
