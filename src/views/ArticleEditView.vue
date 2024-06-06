<template>
  <div class="kll">
    <div class="form-container">
      <h2>Edit Recipe</h2>
      <form id="recipeForm" @submit.prevent="modifyRecipe">
        <div class="form-group">
          <label for="title">Title:</label>
          <input v-model="title" type="text" id="title" name="title" required>
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="description" id="description" name="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="ingredients">Ingredients:</label>
          <textarea v-model="ingredients" id="ingredients" name="ingredients" required></textarea>
        </div>
        <div class="form-group">
          <label for="instructions">Instructions:</label>
          <textarea v-model="instructions" id="instructions" name="instructions" required></textarea>
        </div>
        <div class="form-group">
          <label for="temps_preparation">Preparation Time (minutes):</label>
          <input v-model.number="temps_preparation" type="number" id="temps_preparation" name="temps_preparation" required>
        </div>
        <div class="form-group">
          <label for="temps_cuisson">Cooking Time (minutes):</label>
          <input v-model.number="temps_cuisson" type="number" id="temps_cuisson" name="temps_cuisson" required>
        </div>
        <div class="form-group">
          <label for="regime">Regime:</label>
          <input v-model="regime" type="text" id="regime" name="regime" required>
        </div>
        <div class="form-group">
          <label for="portions">Portions:</label>
          <input v-model.number="portions" type="number" id="portions" name="portions" required>
        </div>
        <div class="form-group">
          <label for="tags">Tags (Separate with ','):</label>
          <input v-model="tags" type="text" id="tags" name="tags" required>
        </div>
        <div class="op">
          <button type="submit" class="btn-submit">Modify</button>
          <router-link to="/"><button>Return</button></router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { projectFirestore } from '../Firebase/Config';
import importRecipeID from '@/Composables/getPosts.js'; // Assuming you have a function to fetch a recipe by ID

export default {
  name: 'RecipeEdit',
  props: ['id'],
  data() {
    return {
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      temps_preparation: null,
      temps_cuisson: null,
      regime: '',
      portions: null,
      tags: ''
    };
  },
  async mounted() {
    try {
      // Fetch the recipe details based on the provided ID
      const recipe = await importRecipeID(this.id);
      this.title = recipe.title;
      this.description = recipe.description;
      this.ingredients = recipe.ingredients.join(', '); // Convert array to string
      this.instructions = recipe.instructions.join('\n'); // Convert array to string
      this.temps_preparation = recipe.temps_preparation;
      this.temps_cuisson = recipe.temps_cuisson;
      this.regime = recipe.regime;
      this.portions = recipe.portions;
      this.tags = recipe.tags.join(', '); // Convert array to string
    } catch (error) {
      console.error('Error:', error);
    }
  },
  methods: {
    async modifyRecipe() {
      // Splitting ingredients and tags strings into arrays
      const ingredientList = this.ingredients.trim().split(/\s*,\s*/);
      const tagList = this.tags.trim().split(/\s*,\s*/);

      const modifiedRecipe = {
        "title": this.title,
        "description": this.description,
        "ingredients": ingredientList,
        "instructions": this.instructions.split('\n'),
        "temps_preparation": this.temps_preparation,
        "temps_cuisson": this.temps_cuisson,
        "regime": this.regime,
        "portions": this.portions,
        "tags": tagList,
      };

      try {
        // Update the recipe document in Firestore
        await projectFirestore.collection('recipes').doc(this.id).update(modifiedRecipe);
        console.log('Recipe successfully updated!');
      } catch (error) {
        console.error('Error updating recipe:', error);
        alert('Failed to update recipe: ' + error.message);
      }
    }
  }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
