import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../common/ingredient.model';
import * as ShoppingListActions from "./store/shoppin-list.actions";
import { AppState } from '../app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingList: Observable<{ ingredients: Array<Ingredient> }>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.shoppingList = this.store.select('shoppingList');
  }

  editItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
