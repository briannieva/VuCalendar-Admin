import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Calendario } from './Components/calendario/calendario';
import { Citas } from './Components/citas/citas';
import { Header } from './Components/header/header';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    App,
    Calendario,
    Citas,
    Header,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
