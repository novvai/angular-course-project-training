import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";


export const SET_RECIPES = "SET_RECIPES";
export const ADD_RECIPES = "ADD_RECIPES";
export const UPDATE_RECIPES = "UPDATE_RECIPES";
export const DELETE_RECIPES = "DELETE_RECIPES";
export const FETCH_RECIPES = "FETCH_RECIPES";
export const SAVE_RECIPES = "SAVE_RECIPES";

export class SetRecipes implements Action {
    readonly type: string = SET_RECIPES;
    constructor(public payload: Array<Recipe>) { }
}

export class AddRecipes implements Action {
    readonly type: string = ADD_RECIPES;
    constructor(public payload: Recipe) { }
}

export class UpdateRecipes implements Action {
    readonly type: string = UPDATE_RECIPES;
    constructor(public payload: {id:number, recipe:Recipe}) { }
}

export class DeleteRecipes implements Action {
    readonly type: string = DELETE_RECIPES;
    constructor(public payload: number) { }
}

export class FetchRecipes implements Action {
    readonly type: string = FETCH_RECIPES;
}

export class SaveRecipes implements Action {
    readonly type: string = SAVE_RECIPES;
}

export type Actions = SetRecipes | AddRecipes | UpdateRecipes | DeleteRecipes ;