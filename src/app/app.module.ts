import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from 'src/material.module';
import { InitLayoutComponent } from './share/init-layout/init-layout.component';
import { AdminLayoutComponent } from './share/admin-layout/admin-layout.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { NgxsModule } from '@ngxs/store';
import { CitiesState } from './core/state/cities.state';
import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { MembershipStateState } from './core/state/membership/state/membership-state.state';


@NgModule({
  declarations: [
    AppComponent,
    InitLayoutComponent,
    AdminLayoutComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CookieModule.withOptions(),
    NgxsModule.forRoot([CitiesState, MembershipStateState], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
