import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoggedInGuardService} from './shared/services/logged-in-guard.service';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {DescriptionComponent} from "./pages/description/description.component";
import {ShopsListComponent} from "./pages/shops-list/shops-list.component";
import {NewsListComponent} from "./pages/news-list/news-list.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {ProducersListComponent} from "./pages/producers-list/producers-list.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {Role} from "./models/Role";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'description',
        component: DescriptionComponent
    },
    {
        path: 'shops-list',
        component: ShopsListComponent
    },
    {
        path: 'producers-list',
        component: ProducersListComponent
    },
    {
        path: 'news-list',
        component: NewsListComponent
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
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: { roles: [Role.ADMIN] }
    },
    {
        path: 'map',
        canActivate: [LoggedInGuardService],
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
