import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RecipesState } from '../store/recipes.state';
import * as RecipesBook from "../store/recipes.actions"
import { FeatureState } from '../store/recipes.reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  recipesState: Observable<RecipesState>;

  constructor(
    private store: Store<FeatureState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new RecipesBook.FetchRecipes());

    this.recipesState = this.store.select('recipesBook');
  }
}
