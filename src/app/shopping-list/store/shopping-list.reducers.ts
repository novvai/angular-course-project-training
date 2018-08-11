import { Ingredient } from "../../common/ingredient.model";
import * as ShoppingListActions from "./shoppin-list.actions"


export interface IngredientState { 
    ingredients:Array<Ingredient>,
    editIngredient:Ingredient|null,
    editIngredientIndex: number
}

const initState:IngredientState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 4)
    ],
    editIngredient: null,
    editIngredientIndex: -1
};

export function shoppingListReducer(state = initState, action: ShoppingListActions.ShoppingListActions) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...(<Array<any>>action.payload)]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editIngredientIndex];
            const ingredients = [...state.ingredients];
            const updateIngredient = {
                ...ingredient,
                ...action.payload
            }
            ingredients[state.editIngredientIndex] = updateIngredient;
            return {
                ...state,
                ingredients: ingredients
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            state.ingredients.splice(state.editIngredientIndex, 1)

            return {
                ...state,
                ingredients: state.ingredients
            }
        case ShoppingListActions.START_EDIT:

        const editIng = state.ingredients[<number>action.payload],
            editIngId = action.payload;
        return {
            ...state,
            editIngredient : editIng,
            editIngredientIndex: editIngId
        }
        case ShoppingListActions.STOP_EDIT:

        return {
            ...state,
            editIngredient : null,
            editIngredientIndex: -1
        }
        default:
            return state;
    }

}