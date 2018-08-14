import * as RecipeBook from "./recipes.actions";
import { RecipesState } from "./recipes.state";
import { RecipeActionBehavior } from "./recipes.behavior";
import { AppState } from "../../app.reducers";

export interface FeatureState extends AppState {
    recipesBook: RecipesState;
}

const initRecipeState: RecipesState = {
    recipes: []
}

export function recipesBookReducer(state = initRecipeState, action: RecipeBook.Actions) {
    switch (action.type) {
        case RecipeBook.SET_RECIPES:
            return RecipeActionBehavior.set(state, action);
        case RecipeBook.ADD_RECIPES:
            return RecipeActionBehavior.add(state, action);
        case RecipeBook.UPDATE_RECIPES:
            return RecipeActionBehavior.update(state, action);
        case RecipeBook.DELETE_RECIPES:
            return RecipeActionBehavior.delete(state, action);
        default:
            return state;
    }
}

