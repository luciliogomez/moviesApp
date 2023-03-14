<template>
  <div>
    <header-component />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
    export default{
      name:"App",
      components:{
          HeaderComponent
      },
      data(){
        return {

        }
      },
      methods:{

      }
    }

</script>

<style>

</style>
