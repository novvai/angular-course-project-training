import { Ingredient } from "../common/ingredient.model";

export class Recipe {
    /**
     * 
     * @param name 
     * @param description 
     * @param imageUrl 
     */
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public imageUrl: string,
        public ingredients: Array<Ingredient>) {
    }
}