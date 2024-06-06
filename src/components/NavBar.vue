<!-- src/components/Navbar.vue -->
<template>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/recipes">Recipes</router-link>
      <router-link to="/CreatePost">Add Recipe</router-link>
      <router-link to="/profile">Profile</router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style scoped>
  nav {
    display: flex;
    gap: 1rem;
  }
  </style>
  