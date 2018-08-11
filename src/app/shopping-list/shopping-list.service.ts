import { Ingredient } from "../common/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  changedIngredientsList = new Subject<Array<Ingredient>>();

  edit = new Subject<number>();

  private ingredients: Array<Ingredient> = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 4)
  ];

  constructor() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number) {
    return this.ingredients[i];
  }

  deleteAt(i: number) {
    this.ingredients.splice(i, 1);

    this.changedIngredientsList.next(this.getIngredients());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.changedIngredientsList.next(this.getIngredients());
  }

  addListOfIngredients(list: Array<Ingredient>) {
    this.ingredients = this.ingredients.concat(list);
    this.changedIngredientsList.next(this.getIngredients());
  };

  editIngredient(i) {
    this.edit.next(i)
  }
}
