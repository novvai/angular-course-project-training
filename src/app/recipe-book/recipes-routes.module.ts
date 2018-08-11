import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeBookComponent } from "./recipe-book.component";
import { AuthGuard } from "../guards/auth-guard.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { DetailsComponent as RecipeDetailsComponent } from "./details/details.component";

const recipesRoutes: Routes = [
    {
        path: "", component: RecipeBookComponent, canActivate: [AuthGuard],
        children: [
            { path: "", component: RecipeStartComponent },
            { path: "new", component: RecipeEditComponent },
            { path: ":id", component: RecipeDetailsComponent },
            { path: ":id/edit", component: RecipeEditComponent },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [
        RouterModule
    ]

})
export class RecipesRoutesModule { }