<!-- src/components/Navbar.vue -->
<template>
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/recipes" class="nav-link">Recipes</router-link>
      <router-link to="/CreatePost" class="nav-link">Add Recipe</router-link>
      <router-link to="/profile" class="nav-link">Profile</router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    gap: 1rem;
    background-color: #007bff; /* Main blue color */
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  .nav-link {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    transition: color 0.3s, background-color 0.3s;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
  
  .nav-link:hover {
    background-color: #0056b3; /* Darker shade of blue */
    color: #f1f1f1;
  }
  
  .nav-link:active {
    background-color: #004494; /* Even darker shade for active state */
    color: #e1e1e1;
  }
  
  .nav-link.router-link-active {
    background-color: #0056b3; /* Highlight active link */
    color: #f1f1f1;
  }
  </style>
  