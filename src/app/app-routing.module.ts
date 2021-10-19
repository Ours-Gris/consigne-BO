import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoggedInGuardService} from './shared/services/logged-in-guard.service';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {ContactComponent} from "./pages/contact/contact.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {Role} from "./user/data/Role";
import {ProfilComponent} from "./user/profil/profil.component";
import {PassageComponent} from "./pages/passage/passage.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
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
        path: 'bottle',
        canActivate: [AuthGuard],
        loadChildren: () => import('./bottle/bottle.module').then(m => m.BottleModule),
        data: { roles: [Role.ADMIN] }
    },
    {
        path: 'material',
        canActivate: [AuthGuard],
        loadChildren: () => import('./material/material.module').then(m => m.MaterialModule),
        data: { roles: [Role.ADMIN] }
    },
    {
        path: 'me',
        canActivate: [LoggedInGuardService],
        component: ProfilComponent
    },
    {
        path: 'map',
        canActivate: [LoggedInGuardService],
        loadChildren: () => import('./map/map.module').then(m => m.MapModule)
    },
    {
        path: 'passage',
        canActivate: [LoggedInGuardService],
        component: PassageComponent
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
