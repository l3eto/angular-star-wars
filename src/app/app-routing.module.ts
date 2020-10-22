import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { StarshipViewComponent } from './components/starship-view/starship-view.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'ships',
    component: StarshipListComponent
  },
  {
    path: 'ship/:id',
    component: StarshipViewComponent
  },
  {
    path: '',
    redirectTo: 'ships',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
