import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {NewPasswordComponent} from "./components/new-password/new-password.component";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'new-password',
        component: NewPasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
