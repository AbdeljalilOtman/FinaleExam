<template>
  <div class="kll">
    <div class="form-container">
      <h2>Add Recipe</h2>
      <form id="recipeForm" @submit.prevent="addRecipe">
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
          <button type="submit" class="btn-submit">Add</button>
          <router-link to="/"><button>Return</button></router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { projectFirestore } from '../Firebase/Config';

export default {
  name: 'RecipeEdition',
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
  methods: {
    async addRecipe() {
      // Splitting ingredients and tags strings into arrays
      const ingredientList = this.ingredients.trim().split(/\s*,\s*/);
      const tagList = this.tags.trim().split(/\s*,\s*/);
      const l = ingredientList.map(item => {
          const [nom, quantité, unité] = item.split(/\s+/);
          return { nom, quantité, unité };
        });

      // Checking if any required fields are empty
      if (!this.title || !this.description || !this.ingredients || !this.instructions || 
          !this.temps_preparation || !this.temps_cuisson || !this.regime || !this.portions || !this.tags) {
        alert("Please fill in all required fields.");
        return;
      }

      const newRecipe = {
        "nom": this.title,
        "description": this.description,
        "ingredients": l,
        "instructions": this.instructions.split('\n'),
        "temps_preparation": this.temps_preparation,
        "temps_cuisson": this.temps_cuisson,
        "regime": this.regime,
        "portions": this.portions,
        "tags": tagList,
        "authorID": "userID_1" // You may adjust this value accordingly
      };
      try {
  console.log("New Recipe Object:", newRecipe); // Log the newRecipe object
  const docRef = await projectFirestore.collection('recipes').add(newRecipe);
  console.log("Recipe added with ID: ", docRef.id);
} catch (error) {
  console.error("Error adding recipe: ", error);
  alert("Failed to add recipe: " + error.message);
}

    }
  }
};
</script>

<style scoped>

.op{
    display: flex;
    justify-content: space-between;
}

.kll{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1000px;
}

.form-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px; /* Reduce padding to make the form smaller */
    width: 300px;
    height: auto; /* Remove fixed height to allow the form to expand vertically */
}

.form-container h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}

.form-group {
    margin-bottom: 15px; /* Reduce margin between form groups */
}

.form-group label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
    color: #555;
}

.form-group input, .form-group textarea {
    width: 100%;
    padding: 8px; /* Reduce padding to make input fields smaller */
    font-size: 14px; /* Reduce font size to make text smaller */
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
}

.form-group textarea {
    resize: vertical;
    min-height: 80px; /* Reduce min-height of textarea */
}

.btn-submit {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 15px; /* Reduce padding to make button smaller */
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.bnt{
    background-color: red;
}

.btn-submit:hover {
    background-color: #0056b3;
}

</style>
