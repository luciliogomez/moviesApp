<template>
    <div class="main w-full  " :style="'background-image: url('+topMovie.backdrop_img+')'" >
        <div class="wrapper w-100 flex justify-center md:justify-between  items-end md:items-start" style="min-height:inherit !important">
          <div class="bg-gradient-to-t from-black via-black md:bg-gradient-to-r md:from-black md:via-black cover w-full rounded-md flex flex-col justify-center items-end" style="min-height: 350px;"> 
            <div class=" p-4 info flex flex-col justify-end items-end " style="min-height:inherit" v-if="topRatedMovies[0]">
                <div class="text flex flex-col items-center ">
                    <h3 class="text-white text-xl  md:text-left" style="font-size: 1.5em;line-height: normal;" >{{topMovie.title}}</h3>
                    <p class="text-gray-300 text-md text-justify mt-2">
                      {{topMovie.sinopse}}
                    </p>
                    <router-link :to="{name:'movie', params:{id:topMovie.id}}" 
                                  class="mt-2 hover:bg-blue-800 inline-block 
                                  text-white text-center text-md py-2 px-6 rounded-md  bg-blue-500 " >Detalhes
                    </router-link>
                </div>
            </div>
          </div>
      </div>
    </div>

    <section class="conteiner movie-list bg-gray-900 px-12 py-4 ">
        <div class="flex flex-col justify-center  md:flex-row md:justify-between items-center ">
          <h3 class="subtile text-white text-2xl  my-4 font-bold">Mais Populares</h3>
          <div class="">
            <div class="" >
              <form class=" ">
                <div class="">
                  <label for="" class="mr-2 text-white text-md ">Filtro: </label>
                  <select name="" id="" v-model="genre" class="w-full  py-2 px-2 rounded-md bg-transparent border text-white">
                    <option value="" selected disabled>Escolhe o género</option>
                    <option value=""   class="text-black">Todos</option>
                    <option :value="genre.id" class="text-black " v-for="genre in genres" :key="genre.id">{{genre.name}}</option>
                    
                  </select>
                </div>  
              </form>
            </div>
          </div>
        </div>
        
        <div 
            class="list mt-8 flex flex-col justify-start items-center w-full flex-wrap 
                    md:flex-row md:justify-start md:items-start "
          >
            <MovieComponent v-for="(movie) in popularMovies" :key="movie.id" :movie="movie" />
        </div>
        <div class="flex justify-center items-center mb-8">
            <button class="btn" @click="loadMoreMovies">Load More</button>
        </div>
    </section>
  </template>
  
  <script>
  import MovieComponent from '@/components/MovieComponent.vue';
    import {api,API_KEY,getBackdropImage} from "@/api/api.js"
      export default{
        name:"HomePage",
        data(){
          return {
            popularMovies: [],
            topRatedMovies:[],
            actualPopularPage:1,
            genres:null,
            genre:""
          }
        },
        components:{
          MovieComponent
        },
        methods:{
            getPopular:async function() {
                
                try {
                  const response = await api.get('/movie/popular?api_key='+ API_KEY +'&page=1&language=pt-BR&with_genres='+this.genre);
                  
                  const data = response.data;
                  const results = data.results;
                  console.log("PAGE:" + data.page);
                  console.log(results);

                  this.actualPopularPage = data.page;
                  var i = 0;
                  for(i=0;i<results.length;i++){
                    
                    const movie = {
                      id:     results[i].id,
                      title:  results[i].title,
                      img:    results[i].poster_path,
                      year:    results[i].release_date,
                      votes:  results[i].vote_average
                    }

                    this.popularMovies.push(movie);

                  }

                }catch (error) 
                
                {
                  console.error(error);
                }


            },

            loadMoreMovies:async function() {
                
                try {
                  const response = await api.get('/movie/popular?api_key='+ API_KEY +'&language=pt-BR&page='+(this.actualPopularPage + 1)+'&with_genres='+this.genre);
                  
                  const data = response.data;
                  const results = data.results;
                  console.log("PAGE:" + data.page);
                  console.log(results);

                  this.actualPopularPage = data.page;
                  var i = 0;
                  for(i=0;i<results.length;i++){
                    
                    const movie = {
                      id:     results[i].id,
                      title:  results[i].title,
                      img:    results[i].poster_path,
                      year:    results[i].release_date,
                      votes:  results[i].vote_average
                    }

                    this.popularMovies.push(movie);
                  }

                }catch (error) 
                
                {
                  console.error(error);
                }
            },

            getTopRated:async function() {
                
                try {
                  const response = await api.get('/movie/now_playing?api_key='+ API_KEY +'&page=1&language=pt-BR');
                  
                  const data = response.data;
                  const results = data.results;
                  console.log(results);

                  this.actualTopRatedPage = data.page;
                  var i = 0;
                  for(i=0;i<results.length;i++){
                    
                    const movie = {
                      id:     results[i].id,
                      title:  results[i].title,
                      img:    results[i].poster_path,
                      backdrop_img:    getBackdropImage(results[i].backdrop_path),
                      year:    results[i].release_date,
                      votes:  results[i].vote_average,
                      sinopse:results[i].overview
                    }

                    this.topRatedMovies.push(movie);
                  }

                }catch (error) 
                {
                  console.error(error);
                }


            },
            getGenres: async function(){
                try {
                    const response = await api.get("/genre/movie/list?api_key="+ API_KEY+'&language=pt-BR');
                  
                    const data = response.data;
                    this.genres = data.genres;
                    console.log(this.genres);  
                }catch (error) 
                {
                  console.error(error);
                }

            }
          },

          mounted(){
            this.getPopular();
            this.getTopRated();
            this.getGenres();
            console.log(this.topRatedMovies)
          },

          computed: {
            topMovie()
            {
              return this.topRatedMovies[0]?this.topRatedMovies[0]:{};
            }
          },

          watch:{
            genre(){
              console.log(this.genre)
              this.popularMovies = [];
              this.getPopular()
            }
          }


      }
  
  </script>
  
  <style scoped>

  .btn{
    width: fit-content;
    padding: 5px 10px;
    background-color: dodgerblue;
    border-radius: 5px;
    color: white;
  }
  .btn:hover{
    opacity: 0.9;
    /* background-color: red; */
  }
  .btn:active{
    opacity: 0.3;
  }
 .conteiner{
    padding: 5px 50px;
  }


.main{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        min-height:calc(100vh - 70px) !important;
    }
    .cover{
      /* background-color: rgba(0,0,0,0.95); */
      /* background: linear-gradient(transparent,black,black,black); */
    }

    @media (min-width: 768px){
      .cover{
        min-height: inherit !important;
        width: 80% !important;
        /* background: none; */
        /* background-color: rgba(0,0,0,0.95) !important; */
        border-radius: 0;
        padding-left: 50px;
        align-items: flex-start;
      } 
      .cover >div{
        width: 50%;
      }
      .cover > div > div{
        align-items: start;
      }
      .cover > div{
        align-items: center !important;
        flex-direction: row !important;
      
      }
      .conteiner{
            padding: 5px 50px;
        }
      .main{
        background-size: 100% !important;
        background-repeat: no-repeat;
        background-position: left !important;
      }
    }
    @media (min-width: 1024px){
      .cover{
        min-height: inherit !important;
        width: 80% !important;
        /* background: none; */
        /* background-color: rgba(0,0,0,0.95) !important; */
        border-radius: 0;
        padding-left: 100px;
      } 
      .cover > div > div{
        align-items: start;
      }
      .cover > div > div h3{
        font-size: 2.4em !important;
        font-weight: bolder;
        margin-bottom: 10px;
      }
      .cover > div > div p{
        font-size: 1.2em !important;
        margin-bottom: 20px;
      }
      .cover > div{
        align-items: center !important;
        flex-direction: row !important;
      
      }
      .conteiner{
            padding: 5px 100px;
        }
      .main{
        background-size: 100% !important;
        background-repeat: no-repeat;
        background-position: left !important;
        min-height:calc(100vh - 80px) !important
      }
    }

    @media (min-width: 1440px)
    {
      .cover > div > div h3{
        font-size: 2.7em !important;
      }
      .cover > div > div p{
        font-size: 1.4em !important;
      }
      .cover > div > div a{
        font-size: 1.4em !important;
        padding: 10px 15px;
      }

    }
  </style>
  