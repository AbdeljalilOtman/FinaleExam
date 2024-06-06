<template>
    <div class="recipes-container">
      <h1>All Recipes</h1>
      <TagCloud />
      <!-- Add search and filter functionality -->
      <input type="text" v-model="searchQuery" placeholder="Search for a recipe..." class="search-input" />
      <div v-if="!condition">
        <ul class="recipes-list">
          <li v-for="recipe in filteredRecipes" :key="recipe.authorID" class="recipe-item">
            <img :src="recipe.image" :alt="recipe.nom" class="recipe-image" />
            <h2>{{ recipe.nom }}</h2>
            <p>{{ recipe.description }}</p>
            <router-link :to="'/PDView/' + recipe.id" class="router-link">View Recipe</router-link>
            <router-link :to="'/ArticleEdition/' + recipe.id" class="router-link">Edit Recipe</router-link>
            <router-link to="/recipes" @click="deleteArticle(recipe.id)" class="router-link">Delete</router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="recipes-list">
          <li v-for="recipe in filteredRecipes" :key="recipe.authorID" class="recipe-item">
            <div v-if="recipe.regime == Criteria">
              <img :src="recipe.image" :alt="recipe.nom" class="recipe-image" />
              <h2>{{ recipe.nom }}</h2>
              <p>{{ recipe.description }}</p>
              <router-link :to="'/PDView/' + recipe.id" class="router-link">View Recipe</router-link>
              <router-link :to="'/ArticleEdition/' + recipe.id" class="router-link">Edit Recipe</router-link>
              <button @click="deleteArticle(recipe.id)">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import importArticleID from '@/Composables/getPosts.js';
  import { projectFirestore } from '../Firebase/Config';
import firebase from 'firebase/app';
  
  export default {
    name: 'Recipes',
    data() {
      return {
        recipes: [],
        searchQuery: '',
      };
    },
    props: {
      condition: false,
      Criteria: ''
    },
    computed: {
      filteredRecipes() {
        const filtered = this.recipes.filter(recipe =>
          recipe.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        console.log('Filtered Recipes:', filtered); // Debugging step
        return filtered;
      }
    },
    methods: {
        deleteArticle(id){
                let docRef = projectFirestore.collection("recipes").doc(id);
                this.$router.push('/recipes');

                    docRef.delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error deleting document:", error);
            });
            this.$router.push('/recipes')
        }
  },
    async mounted() {
      try {
        this.recipes = await importArticleID();
        console.log('Fetched Recipes:', this.recipes); // Debugging step
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  .recipes-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  h1 {
    text-align: center;
    color: #007bff;
    margin-bottom: 20px;
  }
  
  .search-input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #007bff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
  }
  
  .search-input:focus {
    outline: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .recipes-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .recipe-item {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
  }
  
  .recipe-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .recipe-image {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  h2 {
    margin-top: 10px;
    margin-bottom: 5px;
    color: #007bff;
  }
  
  p {
    margin-bottom: 10px;
  }
  
  .router-link {
    display: inline-block;
    padding: 10px 15px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s, transform 0.3s;
    margin-right: 10px;
  }
  
  .router-link:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  </style>
  