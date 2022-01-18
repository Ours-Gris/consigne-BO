import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewsListComponent} from "./news-list/news-list.component";
import {NewsAddComponent} from "./news-add/news-add.component";
import {NewsEditComponent} from "./news-edit/news-edit.component";

// @ts-ignore
const routes: Routes = [
    {
        path: '',
        component: NewsListComponent
    },
    {
        path: 'add',
        component: NewsAddComponent
    },
    {
        path: 'edit/:idNews',
        component: NewsEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsRoutingModule {
}
