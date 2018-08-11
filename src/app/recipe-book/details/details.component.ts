import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from "../../shopping-list/store/shoppin-list.actions"
import { AppState } from '../../app.reducers';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public recipe: Recipe;
  private recipeId:number;

  constructor(
    private recipeService: RecipeService,
    private router: ActivatedRoute,
    private nexRoute: Router,
    private store:Store<AppState>
  ) { }

  ngOnInit() {
    this.router.params.subscribe((
      params: Params
    ) => {
      this.recipeId = parseInt(params['id']);
      this.recipe = this.recipeService.getRecipe(this.recipeId);
    });
  }

  deleteRecipe(){
    this.recipeService.delete(this.recipeId).then(
      ()=>{
        this.nexRoute.navigate(['/recipes']);
      }
    );

  }

  addToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

}
