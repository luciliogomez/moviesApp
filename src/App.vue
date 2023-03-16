<template>
  <div>
    <header-component />
    <router-view></router-view>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
    export default{
      name:"App",
      components:{
          HeaderComponent, FooterComponent
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
