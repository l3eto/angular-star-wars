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

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor } from './interceptors/caching/caching.interceptor';
import { CacheService } from './services/cache/cache.service';
import { httpInterceptorProviders } from './interceptors/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StarshipListComponent,
    StarshipViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    CacheService,
    { provide: Cache, useClass: CacheService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }