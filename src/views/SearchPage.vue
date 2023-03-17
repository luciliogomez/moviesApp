<template>

    <section class="conteiner movie-list bg-gray-900 px-12 py-4 ">
        <div class="flex flex-col justify-center items-center  ">
            <h4 class="text-white text-lg">Resultados da pesquisa</h4>
            <h5 class="text-white text-md">{{totalResults}} resultados encontrados</h5>
        </div>
        
        <div>
            
          <div 
              class="list mt-8 flex flex-col justify-start items-center w-full flex-wrap 
                    md:flex-row md:justify-start md:items-start "
            >
              <MovieComponent v-for="(movie) in movies" :key="movie.id" :movie="movie" />
            </div>

        </div>
        
        
        <div class="flex justify-center items-center mb-8">
            <button class="btn" @click="loadMoreMovies">Load More</button>
        </div>

    </section>

</template>

<script>
import {api,API_KEY} from "@/api/api.js"
import MovieComponent from "@/components/MovieComponent.vue"
export default{
    name:"SearchPage",
    components:{MovieComponent},
    data(){
        return  {
            totalResults:0,
            actualSearchPage:1,
            movies:[],
            genre:""
        }
    },
    methods:{
        searchMovies:async function() {
          this.clearMovieList()
            const query = this.$route.query.query;
                try {
                  const response = await api.get('/search/movie?query='+query+'&api_key='+ API_KEY +'&page=1&language=pt-BR&with_genres='+this.genre);
                  
                  const data = response.data;
                  const results = data.results;
                  this.totalResults = data.total_results;

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

                    this.movies.push(movie);

                  }

                }catch (error) 
                
                {
                  console.error(error);
                }


            },

            loadMoreMovies:async function() {
                const query = this.$route.query.query;
                try {
                  const response = await api.get('/search/movie?query='+query+'&api_key='+ API_KEY +'&language=pt-BR&page='+(this.actualSearchPage + 1)+'&with_genres='+this.genre);
                  
                  const data = response.data;
                  const results = data.results;
                  console.log("PAGE:" + data.page);
                  console.log(results);

                  this.actualSearchPage = data.page;
                  var i = 0;
                  for(i=0;i<results.length;i++){
                    
                    const movie = {
                      id:     results[i].id,
                      title:  results[i].title,
                      img:    results[i].poster_path,
                      year:    results[i].release_date,
                      votes:  results[i].vote_average
                    }

                    this.movies.push(movie);
                  }

                }catch (error) 
                
                {
                  console.error(error);
                }
            },

            clearMovieList(){
              this.movies = []
            }
    },

    
    mounted(){
        console.log("SEARCHING")
        this.searchMovies();
    },

    watch:{
      $route(){
        this.searchMovies()
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
</style>