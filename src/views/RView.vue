<template>
    <div>
        <TagCloud @TagsApplied="ApplyingTags" />
        <Recipes :condition="Filter_Activation" :Criteria="Criteria"/>
        
    </div>
</template>
<script>
import Recipes from '@/components/Receipy.vue'
import TagCloud from '@/components/TagCloud.vue'
export default {
    name: 'RView',
    components: {
        Recipes,
        TagCloud
    },
    data() {
        return {
            Filter_Activation: false,
            Criteria: '',
        }
    },
    methods: {
        ApplyingTags(C){
      console.log(C);
      this.Filter_Activation = true;
      this.Criteria = C

      

        }, 
    },
}
</script>