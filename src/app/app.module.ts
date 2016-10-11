import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { PolymerElement } from '@vaadin/angular2-polymer';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders }  from './app.routing';
import { UserBlockComponent } from './shared/user-block/user-block.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserBlockComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    PolymerElement('vaadin-combo-box'),
    PolymerElement('paper-input'),
    PolymerElement('iron-icon'),
    PolymerElement('paper-fab'),
    PolymerElement('paper-slider')
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    InfiniteScrollModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
