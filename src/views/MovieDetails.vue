<template>
        <main class=" main w-full  " :style="'background-image: url('+movie.backdrop_img+')'" >
            <div 
                class="conteiner w-full " 
                style="min-height:inherit !important;background-color: rgba(0,0,0,0.8);"
                >

                <div class="content w-full px-6 md:px-2 py-6 md:flex md:justify-between md:items-start">
                    
                    <div class="poster w-64 md:w-1/4 m-auto md:m-0  mb-6" >
                        <figure class="w-full">
                            <img :src="movie.img" alt="">
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
                            <span class="separator bg-white p-1 rounded-full"></span>
                            <span class="text-white">2h30</span>
                            <!-- <span class="separator bg-white p-1 rounded-full"></span> -->
                            <!-- <span  class="text-blue-400 border flex items-center justify-center text-xs    rounded-full">
                                <span style="border-color: dodgerblue;" 
                                    class="text-white border flex items-center justify-center text-xs w-6 h-6   rounded-full">83</span>
                            </span> -->
                        </div>
                        <div class="team mb-6">
                            <!-- <h5 class="text-white font-bold">Director: <span class="font-normal">Todd Philips</span></h5> -->
                            <!-- <h5 class="text-white font-bold">Writer: <span class="font-normal">Scott Silver</span></h5> -->
                        </div>

                        <p class="sinopse text-gray-300 text-center md:text-left text-md">
                            {{ movie.sinopse }}
                        </p>
                        <div class="cast mt-6 w-full">
                            <h4 class="text-white font-bold text-xl mb-4">TOP CAST</h4>
                            <div class="flex justify-start items-start w-full flex-wrap">
                                <div class="actor ">
                                    <figure class=" ">
                                        <img :src="'../assets/'+movie.img" alt="" class="rounded-full">
                                    </figure>
                                    <h6 class="text-center">Oscar Isaac</h6>
                                </div>
                                <div class="actor">
                                    <figure class=" ">
                                        <img :src="'../assets/'+movie.img" alt="" class="rounded-full">
                                    </figure>
                                    <h6 class="text-center">Rebeca Fergunson</h6>
                                </div>
                                <div class="actor">
                                    <figure class="">
                                        <img :src="'../assets/'+movie.img" alt="" class="rounded-full">
                                    </figure>
                                    <h6 class="text-center">Zendaya</h6>
                                </div>
                                <div class="actor">
                                    <figure class="">
                                        <img :src="'../assets/'+movie.img" alt="" class="rounded-full">
                                    </figure>
                                    <h6 class="text-center">Zendaya</h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
</template>

<script>
 import {api,API_KEY,getPosterImage,getBackdropImage} from "@/api/api.js"


    export default{
        name: "MovieDetails",
        data(){
            return {
                movie:{ id:1, title:"Quantummania: AntMan and Wasp", img:"../assets/poster3.jpeg", category:"action",year:"2000" }
            }
        },
        methods:{
            getMovie: async function(){

                console.log(this.$route.params.id)
                const idMovie = this.$route.params.id;
                try {
                  const response = await api.get('/'+idMovie+'?api_key='+ API_KEY +'&page=1');
                  
                  const data = response.data;
                  console.log(data);

                    const movie = {
                      id:       data.id,
                      title:    data.title,
                      img:      getPosterImage(data.poster_path),
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

            }
        },

        mounted(){

            this.getMovie();
        
        }
        ,

        computed:{
            ano(){
                const tokens = this.movie.year.split("-");
                return tokens[0];
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
        background-position: left;
        min-height:calc(100vh - 70px) !important;
    }

    .poster figure img{
        width: 100%;
        height: 100%;
        
    }
    @media (min-width: 768px){
      .conteiner{
            padding: 5px 50px;
        }
      .main{
        background-size: 100% !important;
        background-repeat: no-repeat;
        background-position: left !important;
      }

      .actor{
        width: 16%;
        margin-right: 5px;
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


    }


    @media (min-width: 1024px){
      .main{
        background-size: 100% !important;
        background-repeat: no-repeat;
        background-position: center  !important;
        min-height:calc(100vh - 80px) !important
      }
      .actor{
        width: 12%;
        margin-right: 5px;
    }
    }



    @media (min-width: 1440px)
    {

    }
</style>