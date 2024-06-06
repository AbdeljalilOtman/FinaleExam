<template>
  <div class="home">

    <!-- <TagCloud @TagsApplied="ApplyingTags" />

    <body class="body_jobs">
      <div v-if="Filter_Activation">
        <div v-for="item in Articledetails" class="jobCard">
          <span> title : </span>{{ item.title }}
          <br>
          <span>description : </span>{{ item.article.substring(0,50) }}...
          <br>
          <span style=""> tags : </span>
            <div v-for="i in item.tags" class="t">
              <li style="font-size: small; font-weight: 300; color: black;">{{ i }}</li>
            </div>
          <div class="buttons">
            <router-link :to="'/PDView/' + item.id"><button class="JobCardButton">More</button></router-link>
            <router-link :to="'/ArticleEdition/' + item.id"><button class="JobCardButton" >Edit</button></router-link>
            <button class="JobCardButton" @click="deleteArticle(item.id)">Delete</button>
          </div>

        </div>
      </div>
      <div v-else>
        <div v-for="item in Articledetails" >
          <div v-if="item.tags.includes(Criteria)" class="jobCard">
            <span> title : </span>{{ item.title }}
          <br>
          <span>description : </span>{{ item.article.substring(0,50) }}...
          <br>   
          <span> tags : </span>
          <div v-for="i in item.tags" class="t">
            <li style="font-size: small; font-weight: 300; color: black;">{{ i }}</li>
          </div>
          <div class="buttons">
            <router-link :to="'/PDView/' + item.id"><button class="JobCardButton">More</button></router-link>
            <router-link :to="'/ArticleEdition/' + item.id"><button class="JobCardButton" >Edit</button></router-link>
            <button class="JobCardButton" @click="deleteArticle(item.id)">Delete</button>
          </div>
          
      </div>

    </div>
      </div>
      
    <button @click="signOut">Sign out</button>
    </body> -->
    
    
    <div>
      
    <header>
      <h1>Restaurant App</h1>
    </header>
    <section>
      <h2>Welcome to our Recipe App</h2>
      <p>Discover and share recipes based on your dietary preferences.</p>
    </section>
    <section>
      <h2>Popular Recipes</h2>
    </section>
    <footer>
      <p>Contact | Legal | Social Media Links</p>
    </footer>
  </div>

  
  
  </div>
  
</template>

<script>
// @ is an alias to /src
import TagCloud from '@/components/TagCloud.vue'
import importArticleID from '@/Composables/getPosts.js'
import { projectFirestore } from '../Firebase/Config';
import firebase from 'firebase/app';
import 'firebase/auth';





export default {
  name: 'HomeView',
  components: {
    TagCloud
  },
  data() {
    return {
      Articledetails :{},
      Filter_Activation:true,
      Criteria:'',
      Clicked_detail_job:0
      }
},
  methods: {
    ApplyingTags(C){
      console.log(C);
      this.Filter_Activation = false;
      this.Criteria = C

      

    },
    async deleteArticle(id){
      let docRef = projectFirestore.collection("Articles").doc(id);

        docRef.delete()
  .then(() => {
    console.log("Document successfully deleted!");
  })
  .catch((error) => {
    console.error("Error deleting document:", error);
  });
  this.$router.push('/')
  .then(() => {
    this.$router.go(0);
  });
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
    }
},
  async mounted() {
    this.Articledetails = await importArticleID();
    
   },
   
    
}

</script>

<style>
.home{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 1000px;
}
.body_jobs{
  width: 500px;
  height: fit-content;
  border: solid #2c3e50 5px ;
  border-radius: 5px;
}

.jobCard{
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  border: 3px solid #2c3e50;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;

}
.jobCardButton{
  background-color: #77bbff;
  border: 2px solid #2c3e50;
  padding: 20px;
}
.buttons{
  display: flex;
  gap: 5px;
  justify-content: center;
}
button{
  background-color: #007bff;
  color: #fff;
    border: none;
    border-radius: 5px;
    padding: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}
.t{
  display: flex;
  justify-content: flex-start;
  text-decoration: underline;
}
/* Existing styles */
.router-link {
  display: inline-block;
  padding: 6px 12px;
  margin-right: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.router-link:hover {
  background-color: #0056b3;
}

.buttons {
  display: flex;
  gap: 5px;
  justify-content: center;
}

button.router-link {
  padding: 6px 12px;
}
</style>