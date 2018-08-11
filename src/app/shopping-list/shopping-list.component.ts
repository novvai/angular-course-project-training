import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../common/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private shoppingListSub: Subscription;

  ingredients: Array<Ingredient> = [];


  constructor(private shoppinListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppinListService.getIngredients();
    this.shoppingListSub = this.shoppinListService.changedIngredientsList.subscribe((ingredientList: Array<Ingredient>) => {
      this.ingredients = ingredientList;
    });
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  ngOnDestroy(): void {
    this.shoppingListSub.unsubscribe();
  }

  editItem(index: number) {
    this.shoppinListService.editIngredient(index);
  }

}
