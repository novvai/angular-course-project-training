import { RecipeService } from "../recipe-book/recipe.service";
import { Api } from "../api/api.service";
import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "../recipe-book/recipe.model";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable()
export class DataStorageService {
    constructor(
        private api: Api, private recipeService: RecipeService, private auth: AuthService
    ) {

    }

    saveRecipes() {
        const token = this.auth.getToken();

        const recipes = this.recipeService.getRecipes();
        const subscribtion = this.api.put('recipe-list', recipes, token).subscribe((response) => {
            subscribtion.unsubscribe();
        });
    }

    fetchRecipes() {
        const token = this.auth.getToken();
        const sub = this.api.get('recipe-list', token).pipe(map((response: Array<Recipe>) => {
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