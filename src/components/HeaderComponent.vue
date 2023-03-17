<template>
    <div class="header conteiner shadow-xs w-100  bg-black h-25 flex  items-center justify-between" style="">
        <div class="logo">
            <RouterLink :to="{name:'home'}"> 
                <h3 class="text-white text-md"><span class="text-red-700 text-xl" style="font-size: 2em;">M</span>ovies</h3>
            </RouterLink>
        </div>
        <div class="searchBar  flex items-center justify-between  rounded-lg  py-1 md:py-2 px-2 bg-red-400" style="background-color: rgba(255, 255, 255, 0.22);">
            <input v-model="searchText" v-on:keyup.enter="searchMovie" placeholder="Search" class=" border-0 mr-2 bg-transparent text-gray-400 text-sm w-full" type="text" name="" id="">
            <div>
                <i class="text-gray-400 fas fa-search"></i>
            </div>
        </div>
        <!-- <div></div> -->
    </div>
  </template>
  
  <script>
      export default{
        name:"HeaderComponent",
        
        data(){
          return {
            searchText:''
          }
        },
        methods:{
            searchMovie:function(){
                this.$router.push({ name: 'search', query: { query: this.searchText } })
            }
        }
      }
  
  </script>
  
  <style scoped>

    .header{
        min-height: 70px !important;
    }
    .searchBar{
            width:60% !important;
        }
  .conteiner{
    padding: 5px 30px;
  }
    .searchBar input{
        border: none;
        outline: none;
    }
    @media (min-width: 425px){
        .searchBar{
            width: 50% !important;
        }
        
    }
    @media (min-width: 768px){
        .searchBar{
            width: 30% !important;
        }
        .conteiner{
            padding: 5px 50px;
        }
    }
    @media (min-width: 1024px){
        .searchBar{
            width: 25% !important;
        }
        .conteiner{
            padding: 5px 100px;
        }
        .logo h3{
            font-size: 1.5em !important;
        }
        .header{
            min-height: 80px !important;
        }
    }
    @media (min-width: 1440px){
        .searchBar{
            width: 20% !important;
            padding: 10px 10px;
        }
        .searchBar input{
            font-size: 1.1em;
        }
        .conteiner{
            padding: 5px 100px;
        }
        .logo h3{
            font-size: 1.5em !important;
        }
        .header{
            min-height: 100px !important;
        }
    }
  </style>
  