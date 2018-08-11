import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {

  currentRecipe: Recipe;

  constructor(private recipeService: RecipeService) {
    
    this.recipeService.currentRecipe.subscribe((event) => {
      this.setCurrentRecipe(event)
    });
  }

  ngOnInit() {
  }

  setCurrentRecipe(recipe: Recipe) {
    this.currentRecipe = recipe;
  }
}
