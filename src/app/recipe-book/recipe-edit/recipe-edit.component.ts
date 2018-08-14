import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../common/ingredient.model';
import { Store } from '@ngrx/store';
import { RecipesState } from '../store/recipes.state';
import { take } from 'rxjs/operators';

import * as RecipesBook from '../store/recipes.actions';
import { FeatureState } from '../store/recipes.reducers';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;

  private id: number;
  private editMode: boolean = false;
  private recipe: Recipe;

  constructor(
    private aRoute: ActivatedRoute,
    private store: Store<FeatureState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.aRoute.params.subscribe((params: Params) => {
      this.store.select('recipesBook').pipe(take(1)).subscribe((recipesState: RecipesState) => {
        this.id = parseInt(params['id']);
        this.editMode = params['id'] != null;
        this.recipe = recipesState.recipes[this.id];
        this.renderForm();
      })
    });
  }

  addIngredient(name?: string, amount?: number) {
    this.getCastedIngredients().push(new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onRecipeSubmit() {
    const ingredientsList = this.handleIngredients(),
      id = (this.editMode) ? this.recipe.id : Math.floor(Math.random() * 100000),
      index = this.id;

    const recipe: Recipe = new Recipe(
      id,
      this.getFrom('title'),
      this.getFrom('description'),
      this.getFrom('imageUrl'),
      ingredientsList
    );

    if (this.editMode) {
      this.store.dispatch(new RecipesBook.UpdateRecipes({
        id: this.id,
        recipe: recipe
      }));
      // this.recipeService.update(index, recipe);
    } else {
      this.store.dispatch(new RecipesBook.AddRecipes(recipe));
    }
    this.router.navigate(['/recipes'])
  }

  deleteIngredientAt(formArrayIndex: number) {
    this.getCastedIngredients().removeAt(formArrayIndex);
  }

  cancelEditing() {
    this.reRenderForm();
  }

  private getCastedIngredients(): FormArray {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  private renderForm() {
    const [recipe, ingredients] = this.handleRecipeData();

    console.log(recipe, ingredients);

    this.recipeForm = new FormGroup({
      title: new FormControl(
        (recipe) ? recipe.name : null
        , [Validators.required]),
      imageUrl: new FormControl((recipe) ? recipe.imageUrl : null, [Validators.required]),
      description: new FormControl((recipe) ? recipe.description : null, [Validators.required]),
      ingredients: new FormArray(ingredients)
    });
  };

  private reRenderForm() {
    try {
      const [recipe] = this.handleRecipeData();

      this.recipeForm.patchValue({
        title: (recipe) ? recipe.name : null,
        imageUrl: (recipe) ? recipe.imageUrl : null,
        description: (recipe) ? recipe.description : null
      });
      this.resetIngredientsForm();
      (<Recipe>recipe).ingredients.map((ingredient: Ingredient) => {
        this.addIngredient(ingredient.name, ingredient.amount);
      })
    } catch (e) {
      console.log(e);
    }
  };

  private handleRecipeData(): Array<any> {
    const recipe = this.recipe,
      ingredients: Array<FormGroup> = (recipe && recipe.hasOwnProperty('ingredients')) ? this.manageIngredients(recipe.ingredients.slice()) : [];

    return [recipe, ingredients]
  }

  private manageIngredients(ingredients: Array<Ingredient>): Array<FormGroup> {
    let result = [];

    ingredients.map((ingredient: Ingredient) => {
      result.push(new FormGroup({
        name: new FormControl(ingredient.name, [Validators.required]),
        amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }))
    });

    return result;
  }

  private handleIngredients(): Array<Ingredient> {
    let ingredientList = [];

    (<Array<{ name: string, amount: number }>>this.getCastedIngredients().value).map((item) => {
      if (item.name && item.amount > 0) {
        ingredientList.push(new Ingredient(item.name, item.amount));
      }
    });

    return ingredientList;
  }

  private getFrom(type: string): any {
    return this.recipeForm.get(type).value;
  }

  private clearForm() {
    this.recipe = undefined;
    this.id = undefined;
    this.resetIngredientsForm();
    this.recipeForm.reset();
    this.editMode = false;
  }

  private resetIngredientsForm(): void {
    while (this.getCastedIngredients().length) {
      this.getCastedIngredients().removeAt(0);
    }
  }
} 
