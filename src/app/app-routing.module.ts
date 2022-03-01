import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoggedInGuardService} from './shared/services/logged-in-guard.service';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {ContactComponent} from "./pages/contact/contact.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {Role} from "./user/data/Role";
import {ProfilComponent} from "./user/profil/profil.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ConsommateurComponent} from "./pages/consommateur/consommateur.component";
import {ProducerListComponent} from "./pages/producer-list/producer-list.component";
import {ProducerEngagementComponent} from "./pages/producer-engagement/producer-engagement.component";
import {ResellerEngagementComponent} from "./pages/reseller-engagement/reseller-engagement.component";
import {ResellerListComponent} from "./pages/reseller-list/reseller-list.component";
import {ReemploiComponent} from "./pages/reemploi/reemploi.component";
import {PresentationComponent} from "./pages/presentation/presentation.component";
import {PartnersComponent} from "./pages/partners/partners.component";
import {FaqComponent} from "./pages/faq/faq.component";
import {PageNewsComponent} from "./pages/page-news/page-news.component";
import {MaterialPresentationComponent} from "./material/material-presentation/material-presentation.component";
import {UserPresentationComponent} from "./user/user-presentation/user-presentation.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
    },
    {
        path: 'consommateur',
        component: ConsommateurComponent
    },
    {
        path: 'producer-engagement',
        component: ProducerEngagementComponent
    },
    {
        path: 'producer-list',
        component: ProducerListComponent
    },
    {
        path: 'reseller-engagement',
        component: ResellerEngagementComponent
    },
    {
        path: 'reseller-list',
        component: ResellerListComponent
    },
    {
        path: 'reemploi',
        component: ReemploiComponent
    },
    {
        path: 'presentation',
        component: PresentationComponent
    },
    {
        path: 'partners',
        component: PartnersComponent
    },
    {
        path: 'actu',
        component: PageNewsComponent
    },
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'user/:idUser/presentation',
        component: UserPresentationComponent
    },
    {
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {roles: [Role.ADMIN]}
    },
    {
        path: 'bottle',
        canActivate: [AuthGuard],
        loadChildren: () => import('./bottle/bottle.module').then(m => m.BottleModule),
        data: {roles: [Role.ADMIN]}
    },
    {
        path: 'material/:idMaterial/presentation',
        canActivate: [LoggedInGuardService],
        component: MaterialPresentationComponent
    },
    {
        path: 'material',
        canActivate: [AuthGuard],
        loadChildren: () => import('./material/material.module').then(m => m.MaterialModule),
        data: {roles: [Role.ADMIN]}
    },
    {
        path: 'order',
        canActivate: [AuthGuard],
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
        data: {roles: [Role.ADMIN]}
    },
    {
        path: 'question',
        canActivate: [AuthGuard],
        loadChildren: () => import('./question/question.module').then(m => m.QuestionModule),
        data: {roles: [Role.ADMIN]}
    },
    {
        path: 'news',
        canActivate: [AuthGuard],
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
        data: {roles: [Role.ADMIN]}
    },
    {
        path: 'me',
        canActivate: [LoggedInGuardService],
        component: ProfilComponent
    },
    {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapModule)
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: '**',
        redirectTo: '/not-found'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
