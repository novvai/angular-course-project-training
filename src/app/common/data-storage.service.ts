import { RecipeService } from "../recipe-book/recipe.service";
import { Api } from "../api/api.service";
import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "../recipe-book/recipe.model";
import { map } from "rxjs/operators";

@Injectable()
export class DataStorageService {
    constructor(
        private api: Api, private recipeService: RecipeService
    ) {

    }

    saveRecipes() {

        const recipes = this.recipeService.getRecipes();
        const subscribtion = this.api.put('recipe-list', recipes).subscribe((response) => {
            subscribtion.unsubscribe();
        });
    }

    fetchRecipes() {
        const sub = this.api.get('recipe-list').pipe(map((response: Array<Recipe>) => {
            response.forEach((recipe: Recipe) => {
                if (!recipe.hasOwnProperty('ingredients')) {
                    recipe.ingredients = [];
                }
            });
            return response;
        })).subscribe((response: Array<Recipe>) => {
            sub.unsubscribe();
            console.log(response);
            this.recipeService.recipesOverride(response);
            this.recipeService.emitUpdate();
        })
    }
} 