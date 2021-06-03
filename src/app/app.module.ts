import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AuthModule} from "./auth/auth.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {HomeComponent} from "./pages/home/home.component";
import {AuthService} from "./shared/services/auth.service";
import {LoggedInGuardService} from "./shared/services/logged-in-guard.service";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ErrorInterceptor} from "./shared/error.interceptor";
import {JwtInterceptor} from "./shared/jwt.interceptor";
import {DescriptionComponent} from './pages/description/description.component';
import {ShopsListComponent} from './pages/shops-list/shops-list.component';
import {ProducersListComponent} from './pages/producers-list/producers-list.component';
import {NewsListComponent} from './pages/news-list/news-list.component';
import {ContactComponent} from './pages/contact/contact.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DescriptionComponent,
        ShopsListComponent,
        ProducersListComponent,
        NewsListComponent,
        ContactComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AuthModule,
        SharedModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'fr-FR'},
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        AuthService,
        LoggedInGuardService,
        FormBuilder,
        MatSnackBar
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
