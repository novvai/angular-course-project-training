import { NgModule } from "@angular/core";

import { ListComponent } from './list/list.component';
import { ItemComponent } from './list/item/item.component';
import { DetailsComponent } from './details/details.component';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutesModule } from "./recipes-routes.module";
import { SharedModule } from "../common/shared.module";

@NgModule({
    declarations: [
        ListComponent,
        ItemComponent,
        DetailsComponent,
        RecipeBookComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ], imports: [
        RecipesRoutesModule,
        SharedModule,
    ]
})
export class RecipesModule {

}