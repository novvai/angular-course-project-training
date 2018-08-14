import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as fromRecipes from "./recipes.actions"
import { map, switchMap, mergeMap, withLatestFrom } from "rxjs/operators";
import { Api } from "../../api/api.service";
import { from } from "rxjs";
import { Store } from "@ngrx/store";
import { FeatureState } from "./recipes.reducers";
import { RecipesState } from "./recipes.state";


@Injectable()
export class RecipesEffects {
    @Effect()
    fetchRecipes = this.actions$
        .ofType(fromRecipes.FETCH_RECIPES)
        .pipe(
            switchMap((res) => {
                return from(this.api.get('recipe-list'));
            }),
            mergeMap((response) => {
                return [
                    {
                        type: fromRecipes.SET_RECIPES,
                        payload: response || []
                    }
                ]
            })
        );

    @Effect({ dispatch: false })
    saveRecipes = this.actions$
        .ofType(fromRecipes.SAVE_RECIPES)
        .pipe(
            withLatestFrom(this.store.select('recipesBook')),
            switchMap(([action, state]) => {
                return from(this.api.put('recipe-list', state.recipes));
            })
        );


    constructor(
        protected actions$: Actions,
        protected store: Store<FeatureState>,
        protected api: Api
    ) { }
}