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
          this.$router.push('/recipes');
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

          this.$router.push('/recipes');
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
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f0f7ff; /* Light blue background */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #007bff; /* Blue heading color */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #007bff; /* Blue label color */
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #007bff; /* Blue border color */
  border-radius: 4px;
  box-sizing: border-box;
}

.auth-button {
  display: inline-block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff; /* Blue button color */
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.auth-button:hover {
  background-color: #0056b3; /* Darker blue on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.auth-button:active {
  background-color: #004494; /* Even darker blue on click */
}

.sign-out-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #dc3545; /* Red sign-out button color */
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.sign-out-button:hover {
  background-color: #c82333; /* Darker red on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.sign-out-button:active {
  background-color: #b21f2d; /* Even darker red on click */
}

</style>