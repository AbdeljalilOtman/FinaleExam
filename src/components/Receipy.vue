<!-- src/views/Recipes.vue -->
<template>
    <div>
        <h1>All Recipes</h1>
        <TagCloud/>
    <!-- Add search and filter functionality -->
    <input type="text" v-model="searchQuery" placeholder="Search for a recipe..." />
    <div v-if="!condition">
        <ul>
      <li v-for="recipe in filteredRecipes" :key="recipe.authorID">
        <img :src="recipe.image" :alt="recipe.nom" />
        <h2>{{ recipe.nom }}</h2>
        <p>{{ recipe.description }}</p>
        <router-link :to="'/PDView/' + recipe.id">View Recipe</router-link>
        <router-link :to="'/ArticleEdition/' + recipe.id">Edit Recipe</router-link>
      </li>
    </ul>
    </div>
    <div v-else>
        <ul>
      <li v-for="recipe in filteredRecipes" :key="recipe.authorID">
        <div v-if="recipe.regime == Criteria">
            <img :src="recipe.image" :alt="recipe.nom" />
        <h2>{{ recipe.nom }}</h2>
        <p>{{ recipe.description }}</p>
        <router-link :to="'/PDView/' + recipe.id">View Recipe</router-link>
        <router-link :to="'/ArticleEdition/' + recipe.id">Edit Recipe</router-link>
    </div>
      </li>
    </ul>
    </div>
    
      
    </div>
  </template>
  
  <script>
import importArticleID from '@/Composables/getPosts.js'

  
export default {
  name: 'Recipes',
  data() {
    return {
      recipes: [],
      searchQuery: ''
      
    };
  },
  props:{
    condition: false,
    Criteria: ''
  }
  ,
  computed: {
    filteredRecipes() {
      return this.recipes.filter(recipe => 
        recipe.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  async mounted() {
    this.recipes = await importArticleID();
    console.log(this.recipes);
  }
};
</script>
<style scoped>
/* Add your scoped styles here */
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

img {
  width: 100%; /* Make the image responsive */
  max-height: 200px; /* Limit the maximum height of the image */
  object-fit: cover; /* Ensure the image covers its entire container */
  border-radius: 8px; /* Add a border radius for rounded corners */
}

h2 {
  margin-top: 10px;
  margin-bottom: 5px;
}

p {
  margin-bottom: 10px;
}

.router-link {
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
}

.router-link:hover {
  background-color: #0056b3;
}
</style>
  