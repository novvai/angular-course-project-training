import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { ListComponent } from './list/list.component';
import { ItemComponent } from './list/item/item.component';
import { DetailsComponent } from './details/details.component';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutesModule } from "./recipes-routes.module";
import { SharedModule } from "../common/shared.module";
import { recipesBookReducer } from "./store/recipes.reducers";
import { RecipesEffects } from "./store/recipes.effects";
import { EffectsModule } from "@ngrx/effects";

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
        StoreModule.forFeature('recipesBook', recipesBookReducer),
        EffectsModule.forFeature([RecipesEffects])
    ]
})
export class RecipesModule {

}