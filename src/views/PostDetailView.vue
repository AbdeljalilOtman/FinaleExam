<template>
  <SP :desiredPostId="id"/>
</template>

<script>
import SP from '@/components/SinglePost.vue'
export default {
  name: 'JobView',
  components:{
    SP
  },
  props: ['id'],
  data() {
    return {
      article: {}
    };
  },
}
</script>

<style scoped>
</style>
  