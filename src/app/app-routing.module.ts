import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoggedInGuardService} from './shared/services/logged-in-guard.service';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'user',
        canActivate: [LoggedInGuardService],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
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
