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
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ContactComponent} from './pages/contact/contact.component';
import {YouTubePlayerModule} from "@angular/youtube-player";
import {MatButtonModule} from "@angular/material/button";
import {ToastrModule} from "ngx-toastr";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import {PassageModule} from "./passage/passage.module";
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MaterialModule} from "./material/material.module";
import {OrderModule} from "./order/order.module";
import {ConsommateurComponent} from './pages/consommateur/consommateur.component';
import {ProducerListComponent} from './pages/producer-list/producer-list.component';
import {ProducerEngagementComponent} from './pages/producer-engagement/producer-engagement.component';
import {ResellerEngagementComponent} from './pages/reseller-engagement/reseller-engagement.component';
import {ResellerListComponent} from './pages/reseller-list/reseller-list.component';
import {ReemploiComponent} from './pages/reemploi/reemploi.component';
import {PresentationComponent} from './pages/presentation/presentation.component';
import {PartnersComponent} from './pages/partners/partners.component';
import {NewsComponent} from './pages/news/news.component';
import {MapComponent} from './pages/map/map.component';
import {MapModule} from "./map/map.module";
import {FaqComponent} from './pages/faq/faq.component';
import {MatInputModule} from "@angular/material/input";

registerLocaleData(localeFr);

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        DashboardComponent,
        ConsommateurComponent,
        ProducerListComponent,
        ProducerEngagementComponent,
        ResellerEngagementComponent,
        ResellerListComponent,
        ReemploiComponent,
        PresentationComponent,
        PartnersComponent,
        NewsComponent,
        MapComponent,
        FaqComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            countDuplicates: true,
            resetTimeoutOnDuplicate: true
        }),
        SweetAlert2Module.forRoot(),
        AuthModule,
        SharedModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
        // NgbModule,
        YouTubePlayerModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        PassageModule,
        MaterialModule,
        OrderModule,
        MapModule,
        MatInputModule,
        ReactiveFormsModule
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
