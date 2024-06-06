<template>
    <div class="tag-container">
      <div class="tag-label">
      </div>
      <div class="body_TagList">
        <span class="h"><strong>Tags:</strong></span>
        <div v-for="item in Tags" :key="item.id">
          <button class="tag" @click.stop="$emit('TagsApplied', item)">{{ item }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { projectFirestore } from '../Firebase/Config';
  
  export default {
    name: 'TagCloud',
    data() {
      return {
        Tags: [],
      };
    },
    async mounted() {
      let res = await projectFirestore.collection('recipes').get();
      res.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      }).forEach(element => {
        let regime = element.regime;
        if (!this.Tags.includes(regime)) {
          this.Tags.push(regime);
        }
      });
    },
  };
  </script>
  
  <style scoped>
  .tag-container {
    position: relative;
  }
  
  .tag-label {
    background-color: transparent;
    color: #007bff;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    transition: all 0.3s ease-in-out;
  }
  
  .body_TagList {
    display: flex;
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border-radius: 20px;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
    background-color: transparent;
    transition: all 0.3s ease-in-out;
  }
  
  .h {
    width: 100%;
    margin-bottom: 10px;
    color: #0056b3;
    font-size: 18px;
  }
  
  .tag {
    background-color: transparent;
    color: #007bff;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;
    outline: none;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
  }
  
  .tag:hover {
    background-color: #007bff;
    color: #fff;
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 123, 255, 0.4);
  }
  </style>
  