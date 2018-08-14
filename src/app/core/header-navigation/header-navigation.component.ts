import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../common/data-storage.service';
import { Observable } from 'rxjs';
import { AuthState } from '../../auth/auth.reducers';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as AuthActions from '../../auth/auth.actions';
import * as RecipesBook from "../../recipe-book/store/recipes.actions"

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.css']
})
export class HeaderNavigationComponent implements OnInit {
  authenticationState: Observable<AuthState>
  ngOnInit() {
    this.authenticationState = this.store.select('auth');
  }

  constructor(private dbService: DataStorageService,private store: Store<AppState>) {

  }

  onSaveRecipes() {
    this.store.dispatch(new RecipesBook.SaveRecipes());
  }
  onFetchRecipes() {
    this.store.dispatch(new RecipesBook.FetchRecipes());
  } 

  onLogout() {
    this.store.dispatch(new AuthActions.SignOut());
  }
}
