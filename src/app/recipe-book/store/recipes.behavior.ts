export class RecipeActionBehavior {
    static delete(state, action) {
        const recipes = state.recipes;
        recipes.splice(action.payload, 1);

        return {
            ...state,
            recipes: recipes
        }
    }
    static set(state, action) {
        return {
            ...state,
            recipes: [...action.payload]
        }
    }
    static add(state, action) {
        return {
            ...state,
            recipes: [...state.recipes, action.payload]
        }
    }
    static update(state, action) {
        const recipes = [...state.recipes];
        const recipe = recipes[action.payload.id];
        const updatedRecipe = {
            ...recipe,
            ...action.payload.recipe
        };
        recipes[action.payload.id] = updatedRecipe;
        return {
            ...state,
            recipes: recipes
        }
    }
}