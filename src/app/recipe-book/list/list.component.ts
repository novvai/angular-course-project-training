import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../common/data-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    try{
      this.recipesUpdatingSub.unsubscribe();
    } catch(e){
      console.log(e)
    }
  }
  recipes: Array<Recipe> = [];
  recipesUpdatingSub: Subscription;

  constructor(private recipesService: RecipeService, private dbService: DataStorageService) { }

  ngOnInit() {
    // this.recipes = this.recipesService.getRecipes();
    this.dbService.fetchRecipes();
    this.recipesUpdatingSub = this.recipesService.recipeListUpdate.subscribe((items: Array<Recipe>) => {
      this.recipes = items;
    });
  }


}
