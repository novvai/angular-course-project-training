import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../common/ingredient.model";
import { Subject } from "rxjs";
import { DataStorageService } from "../common/data-storage.service";

@Injectable()
export class RecipeService {
  currentRecipe = new EventEmitter<Recipe>();

  private recipes: Array<Recipe> = [
    new Recipe(1,
      'Steak with Fried Veggies',
      'Big tasty Steak with deep fried Veggies',
      'https://atmedia.imgix.net/2816f86937ebc7019a513d858cec8e0c55d38890?auto=format&q=45&w=1033.0&fit=max&cs=strip',
      [
        new Ingredient("Meat", 2),
        new Ingredient('Veggies', 5)
      ]),
    new Recipe(2,
      'Fish and Fries',
      'Big old salmon with french fries',
      'https://www.onceuponachef.com/images/2018/02/pan-seared-salmon--1024x843.jpg',
      [new Ingredient('Salmon', 2),
      new Ingredient('French fries', 20)])
  ];

  recipeListUpdate = new Subject<Array<Recipe>>();

  constructor() {
  }


  emitUpdate() {
    this.recipeListUpdate.next(this.getRecipes());
  }

  /**
   * @return Array<Recipe> 
   */
  getRecipes(): Array<Recipe> {
    return this.recipes.slice();
  }

  changeRecipe(recipe: Recipe) {
    this.currentRecipe.emit(recipe);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
  delete(index: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.recipes.splice(index, 1);
      this.emitUpdate()
      resolve(true);
    })
  }
  add(recipe: Recipe): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.recipes.push(recipe);
      console.log(this.recipes);
      this.emitUpdate()
      resolve(true);
    })
  }
  update(index, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.emitUpdate();
  }

  recipesOverride(recipes: Array<Recipe>) {
    this.recipes = recipes;
  }
}
