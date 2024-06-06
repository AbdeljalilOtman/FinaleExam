<template>
  <div class="job-view">
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
    <router-link to="/recipes"><button class="return-button">Return</button></router-link>
  </div>
</template>

<script>
import importArticleID from '@/Composables/getPost.js'
import { projectFirestore } from '../Firebase/Config';

export default {
  name: 'SinglePost',
  props: ['desiredPostId'],
  data() {
    return {
      recipe: {},
      comments: [],
      newComment: '',
    };
  },
  async mounted() {
    this.recipe =  await importArticleID(this.desiredPostId);
    this.fetchComments();
  },
  methods: {
    async fetchComments() {
      if (!this.recipe.comments) {
        this.comments = [];
        return;
      }
      this.comments = this.recipe.comments;
    },
    async addComment() {
      if (!this.currentUser) {
        // Handle case when user is not logged in
        return;
      }
      const newComment = {
        username: this.currentUser.displayName, // Assuming username is stored in displayName
        content: this.newComment,
        timestamp: new Date()
      };
      if (!this.recipe.comments) {
        this.recipe.comments = [newComment];
      } else {
        this.recipe.comments.push(newComment);
      }
      await projectFirestore.collection('recipes').doc(this.desiredPostId).update({
        comments: this.recipe.comments
      });
      this.newComment = ''; // Clear textarea after adding comment
    }
  }
}
</script>


<style scoped>
.job-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 5px 5px 10px #888888;
  width: 500px;
  height: fit-content;
  border-radius: 20px;
  padding: 20px;
  margin: 20px auto;
}

.image-container {
  margin-bottom: 20px;
}

.recipe-image {
  max-width: 200px;
  border-radius: 8px;
}

.recipe-details {
  text-align: left;
  margin-bottom: 20px;
}

.recipe-info {
  margin-top: 20px;
}

.return-button {
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

.return-button:hover {
  background-color: #0056b3;
}

.comments-section {
  margin-top: 30px;
}

.comments-section h3 {
  color: #007bff;
}

.comment {
  margin-bottom: 10px;
}

textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
