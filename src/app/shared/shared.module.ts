import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {FooterComponent} from './components/footer/footer.component';
import {GalleryComponent} from "./components/gallery/gallery.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NgxMasonryModule} from "ngx-masonry";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    declarations: [
        HeaderComponent,
        NotFoundComponent,
        FooterComponent,
        GalleryComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        InfiniteScrollModule,
        NgxMasonryModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        GalleryComponent
    ]
})
export class SharedModule {
}
