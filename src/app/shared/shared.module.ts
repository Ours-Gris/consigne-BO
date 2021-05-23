import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NotFoundComponent} from './components/not-found/not-found.component';

@NgModule({
    declarations: [
        HeaderComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class SharedModule {
}
