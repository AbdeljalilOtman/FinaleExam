<template>
  <div class="auth-container">
    <h2>Authenticate User</h2>
    <form id="authForm" @submit.prevent="signInWithEmailAndPassword" v-if="!isSignUp">
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" name="password" required>
      </div>
      <div class="form-group">
        <button type="submit">Sign In</button>
        <button type="button" @click="toggleSignUp">Sign Up</button>
        <button type="button" @click="signOut">Sign Out</button>
      </div>
    </form>

    <form id="signUpForm" @submit.prevent="signUpWithEmailAndPassword" v-else>
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input v-model="firstName" type="text" id="firstName" name="firstName" required>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input v-model="lastName" type="text" id="lastName" name="lastName" required>
      </div>
      <div class="form-group">
        <label for="favoriteFoods">Favorite Foods:</label>
        <input v-model="favoriteFoods" type="text" id="favoriteFoods" name="favoriteFoods" required>
      </div>
      <div class="form-group">
        <label for="regime">Regime:</label>
        <input v-model="regime" type="text" id="regime" name="regime" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" name="password" required>
      </div>
      <div class="form-group">
        <button type="submit">Sign Up</button>
        <button type="button" @click="toggleSignUp">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; // Import firestore to use Firebase Firestore

export default {
  name: 'AuthenticateUser',
  data() {
    return {
      isSignUp: false,
      firstName: '',
      lastName: '',
      favoriteFoods: '',
      regime: '',
      email: '',
      password: '',
    };
  },
  methods: {
    signInWithEmailAndPassword() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // User is signed in
          const user = userCredential.user;
          console.log('User signed in:', user);
          this.$router.push('/home');
        })
        .catch((error) => {
          // Handle signin error
          console.error('Signin error:', error);
        });
    },
    signUpWithEmailAndPassword() {
      // Create user with email and password
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // User is signed up
          const user = userCredential.user;
          console.log('User signed up:', user);

          // Add user details to Firestore
          firebase.firestore().collection('users').doc(user.uid).set({
            "firstName": this.firstName,
            "lastName": this.lastName,
            "favoriteFoods": this.favoriteFoods,
            "regime": this.regime,
            "email": this.email,
          }).then(() => {
            console.log('User details added to Firestore');
          }).catch((error) => {
            console.error('Error adding user details to Firestore:', error);
          });

          this.$router.push('/home');
        })
        .catch((error) => {
          // Handle signup error
          console.error('Signup error:', error);
        });
    },
    signOut() {
      firebase.auth().signOut()
        .then(() => {
          // User is signed out
          console.log('User signed out');
        })
        .catch((error) => {
          // Handle signout error
          console.error('Signout error:', error);
        });
    },
    toggleSignUp() {
      this.isSignUp = !this.isSignUp;
    },
  }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
