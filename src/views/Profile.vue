<template>
    <div class="profile-container">
      <h2>Profile</h2>
      <div v-if="user">
        <p><strong>First Name:</strong> {{ user.firstName }}</p>
        <p><strong>Last Name:</strong> {{ user.lastName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Favorite Foods:</strong> {{ user.favoriteFoods }}</p>
        <p><strong>Regime:</strong> {{ user.regime }}</p>
        <button @click="signOut()">Sign Out</button>
      </div>
      <div v-else>
        <p>Please sign in to view your profile.</p>
        <router-link to="/signin">Sign In</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import 'firebase/firestore';
  
  export default {
    name: 'ProfileView',
    data() {
      return {
        user: null,
      };
    },
    created() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        try {
          const currentUser = firebase.auth().currentUser;
          if (currentUser) {
            const doc = await firebase.firestore().collection('users').doc(currentUser.uid).get();
            if (doc.exists) {
              this.user = doc.data();
            } else {
              console.error('User document does not exist');
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      signOut() {
      firebase.auth().signOut()
        .then(() => {
          // User is signed out
          console.log('User signed out');
          this.$router.push('/');
        })
        .catch((error) => {
          // Handle signout error
          console.error('Signout error:', error);
        });
    },

    },
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .profile-container h2 {
    margin-top: 0;
  }
  
  .profile-container p {
    margin-bottom: 10px;
  }
  
  .profile-container button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .profile-container button:hover {
    background-color: #0056b3;
  }
  </style>
  