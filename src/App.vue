<template>
  <div id="app">
    <NB/>
    <!-- <button @click="signInWithGoogle">Sign in with Google</button> -->
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import NB from '@/components/NavBar.vue'

export default {
  components: {
    NB
  },
  methods: {
    reloadHome() {
      this.$router.push('/')
        .then(() => {
          window.location.reload();
        });
    },
    signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then((result) => {
            // User is signed in
            const user = result.user;
            console.log('User signed in:', user);
          })
          .catch((error) => {
            // Handle signin error
            console.error('Signin error:', error);
          });
    },
  }
};
</script>

<style>
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom, #007bff, #ffffff); /* Adjust the shades of blue as needed */
  background-size: cover; /* Make the background cover the entire viewport */
  background-repeat: no-repeat; /* Prevent the background from repeating */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
