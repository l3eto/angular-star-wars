import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { StarshipViewComponent } from './components/starship-view/starship-view.component';

import { CacheService } from './services/cache/cache.service';
import { httpInterceptorProviders } from './interceptors/interceptors';
import { OtherComponent } from './components/other/other.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StarshipListComponent,
    StarshipViewComponent,
    OtherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    HttpClientModule,
    httpInterceptorProviders,
    CacheService,
    { provide: Cache, useClass: CacheService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }