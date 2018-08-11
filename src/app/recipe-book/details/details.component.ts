import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public recipe: Recipe;
  private recipeId:number;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private router: ActivatedRoute,
    private nexRoute: Router
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
    this.shoppingListService.addListOfIngredients(this.recipe.ingredients);
  }

}
