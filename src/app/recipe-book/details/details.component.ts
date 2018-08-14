import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from "../../shopping-list/store/shoppin-list.actions"
import * as RecipeActions from "../store/recipes.actions"
import { Observable } from 'rxjs';
import { RecipesState } from '../store/recipes.state';
import { take } from 'rxjs/operators';
import { FeatureState } from '../store/recipes.reducers';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public recipesState: Observable<RecipesState>;
  public recipeId: number;

  constructor(
    private router: ActivatedRoute,
    private nexRoute: Router,
    private store: Store<FeatureState>
  ) { }

  ngOnInit() {
    this.router.params.subscribe((
      params: Params
    ) => {
      this.recipeId = parseInt(params['id']);
      this.recipesState = this.store.select('recipesBook');
    });
  }

  deleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipes(this.recipeId));
    this.nexRoute.navigate(['/recipes']);
  }

  addToShoppingList() {
    this.store.select('recipesBook').pipe(take(1)).subscribe(
      (recipeState: RecipesState) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.recipeId].ingredients));
      }
    );
  }

}
