<template>
        <main class=" main w-full  " :style="'background-image: url('+movie.backdrop_img+')'" >
            <div 
                class="conteiner w-full " 
                style="min-height:inherit !important;background-color: rgba(0,0,0,0.9);"
                >

                <div class="content w-full px-6 md:px-2 py-6 md:flex md:justify-between md:items-start">
                    
                    <div class="poster w-64 md:w-1/4 m-auto md:m-0  mb-6" >
                        <figure class="w-full">
                            <img v-if="movie.img!='null'" :src="movie.img" alt="">
                            <img v-else src="../assets/poster.jpg" alt=""  style="height:400px !important;width: 100% !important;">
                        </figure>
                    </div>
                    
                    <div class="info  md:w-3/4 flex flex-col justify-start items-center md:items-start md:px-6">
                        
                        <h2 class="title text-white text-2xl font-bold mb-4">{{ movie.title }}</h2>
                        <div 
                            class="details w-full flex justify-center md:justify-start items-center 
                                    space-x-1 flex-wrap text-sm mb-4">
                            <span class="text-blue-600" v-if="movie">{{ ano }} </span>
                            <span class="separator bg-white p-1 rounded-full"></span>

                            <span class="text-white" v-for="(genre,index) in movie.genres" :key="genre.id">
                                <span><span v-if="index!=0">, </span>{{ genre.name }}</span>
                            </span>
                            <!-- <span class="separator bg-white p-1 rounded-full"></span>
                            <span class="text-white">2h30</span> -->
                            <span class="separator bg-white p-1 rounded-full"></span>
                            <span  class="text-blue-400 border flex items-center justify-center text-xs    rounded-full">
                                <span style="border-color: dodgerblue;" 
                                    class="text-white border flex items-center justify-center text-xs w-6 h-6   rounded-full">{{ movie.votes }}</span>
                            </span>
                        </div>
                        <div class="team mb-6">
                            <!-- <h5 class="text-white font-bold">Director: <span class="font-normal">Todd Philips</span></h5> -->
                            <!-- <h5 class="text-white font-bold">Writer: <span class="font-normal">Scott Silver</span></h5> -->
                        </div>

                        <p class="sinopse text-gray-300 text-center md:text-left text-md">
                            {{ movie.sinopse }}
                        </p>
                        <div class="cast mt-6 w-full" v-if="cast!=null">
                            <h4 class="text-white font-bold text-xl mb-4">TOP CAST</h4>
                            <div class="flex justify-start items-start w-full flex-wrap">
                                <div class="actor " v-for="actor in reducedCast" :key="actor.id">
                                    <figure class=" " v-if="actor.profile_path!=null">
                                        <img :src="getCastImage(actor.profile_path)" alt="" class="rounded-full">
                                    </figure>
                                    <div class="w-full flex justify-center icon" style="" v-else>
                                        <i class="fas fa-user text-white" style="margin: auto;font-size: 3em;"></i>
                                    </div>

                                    <h6 class="text-center">{{ actor.name }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
</template>

<script>
 import {api,API_KEY, getPosterImage, getBackdropImage,getProfileImage} from "@/api/api.js"


    export default{
        name: "MovieDetails",
        data(){
            return {
                movie:{ id:1, title:"Loading the movie...", img:"../assets/poster.jpg", category:"action", year:"2000" },
                cast:null,
                
            }
        },
        methods:{
            getMovie: async function(){
                const idMovie = this.$route.params.id;
                // let cast = null;
                try {
                  const response = await api.get('/movie/'+idMovie+'?api_key='+ API_KEY +'&page=1&language=pt-BR');
                  const data = response.data;
                    console.log(data.poster_path)
                    console.log(data.poster_path)
                    const movie = {
                      id:       data.id,
                      title:    data.title,
                      img:      data.poster_path?getPosterImage(data.poster_path):"null",
                      backdrop_img:      getBackdropImage(data.backdrop_path),
                      year:     data.release_date,
                      votes:    data.vote_average,
                      sinopse:  data.overview,
                      genres:   data.genres
                    }
                    this.movie = movie;
                }catch (error) 
                {
                  console.error(error);
                }

                // this.cast = cast;
                // console.log(this.cast);

            }
            ,
            getCast: async function(){
                
                const idMovie = this.$route.params.id;
                let cast = null
                try {
                    const response = await api.get("/movie/"+idMovie+"/credits?api_key="+ API_KEY);
                  
                    const data = response.data;
                    cast = data.cast;
                    this.cast = cast;
                    // console.log(this.cast);  
                }catch (error) 
                {
                  console.error(error);
                }

            },

            getCastImage(path){
                return getProfileImage(path)
            }

            

        },

        mounted(){

            this.getMovie();
            this.getCast();
            console.log(this.genres)
        }
        ,

        computed:{
            ano(){
                const tokens = this.movie.year.split("-");
                return tokens[0];
            },

            reducedCast(){
                return this.cast.slice(0,6)
            },

        },
        watch:{
            $route(){
                this.getMovie();
                this.getCast();
            }
        }
        
    }

</script>

<style scoped>

    .actor{
        width: 22%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
        /* flex-wrap: wrap; */

        margin-bottom: 20px;
    }
    .actor figure{
        /* padding: 5px; */
        /* background-color: white; */
        /* border-radius: 4px; */
        width: 100%;
    }
    .actor figure img{
        margin: auto;
        width: 50px !important;
        height: 50px !important;
    }
    .actor  h6{
        font-size: 0.8em;
        margin-top: 5px;
        color: white;
    }
    .separator{
        padding: 2px;
    }
    .main{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        min-height:calc(100vh - 70px) !important;
    }

    .poster figure img{
        width: 100%;
        height: 100%;
        
    }
    
    .icon i{
        font-size: 3em !important;
    }
    @media (min-width: 768px){
      .conteiner{
            padding: 5px 50px;
        }
      .main{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: left !important;
      }

      .actor{
        width: 16%;
        margin-right: 15px;
    }
    .actor figure{
        /* padding: 5px; */
        /* background-color: white; */
        /* border-radius: 4px; */
        width: 100%;
    }
    .actor figure img{
        margin: auto;
        width: 50px !important;
        height: 50px !important;
    }

    .icon{
        width: 50px;
        height:50px
    }
    .icon i{
        font-size: 3em !important;
    }

    }


    @media (min-width: 1024px){
      .main{
        background-size: cover !important;
        background-repeat: no-repeat;
        background-position: left  !important;
        min-height:calc(100vh - 80px) !important
      }
      .actor{
        /* background-color: red; */
        width: 16%;
        margin-right: 15px;
    }
    .actor figure img{
        margin: auto;
        width: 100px !important;
        height: 100px !important;
    }

    .icon{
        width: 100px;
        height:100px
    }
    .icon i{
        font-size: 3em !important;
    }

    }



    @media (min-width: 1440px)
    {

    }
</style>