<template>
  <div class="Jobview">
    <div class="image-container">
      <img :src="recipe.image" :alt="recipe.nom" class="recipe-image">
    </div>
    <div class="recipe-details">
      <h2>{{ recipe.nom }}</h2>
      <div class="recipe-info">
        <p><strong>Description:</strong> {{ recipe.description }}</p>
        <p><strong>Instructions:</strong> {{ recipe.instructions }}</p>
        <p><strong>Preparation Time:</strong> {{ recipe.temps_preparation }} minutes</p>
        <p><strong>Cooking Time:</strong> {{ recipe.temps_cuisson }} minutes</p>
        <p><strong>Portions:</strong> Serves {{ recipe.portions }}</p>
        <p><strong>Tags:</strong> {{ recipe.tags }}</p>
      </div>
    </div>
    <router-link to="/recipes"><button>Return</button></router-link>
  </div>
</template>

<script>
import importArticleID from '@/Composables/getPost.js'

export default {
  name: 'SinglePost',
  props: ['desiredPostId'],
  data() {
    return {
      recipe: {}
    };
  },
  async mounted() {
    this.recipe =  await importArticleID(this.desiredPostId);
  }
}
</script>

<style scoped>
.Jobview {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 5px 5px 10px #888888;
  width: 500px;
  height: fit-content;
  border-radius: 50px;
  padding: 20px;
  position: relative;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
}

.image-container {
  margin-bottom: 20px;
}

.recipe-image {
  max-width: 200px; /* Adjust the maximum width of the image */
}

.recipe-details {
  text-align: left;
}

.recipe-info {
  margin-top: 20px;
}

button {
  margin-top: 20px;
}
</style>
