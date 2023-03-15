<template>
    <div class="main w-full  " style=";background-image: url('../assets/poster2.jpeg')" >
        <div class="wrapper w-100 flex justify-center md:justify-between  items-end md:items-start" style="min-height:inherit !important">
          <div class="bg-gradient-to-t from-black via-black md:bg-gradient-to-r md:from-black md:via-black cover w-full rounded-md flex flex-col justify-center items-end" style="min-height: 350px;"> 
            <div class=" p-4 info flex flex-col justify-end items-end " style="min-height:inherit">
                <div class="text flex flex-col items-center ">
                    <h3 class="text-white text-xl  md:text-left" style="font-size: 1.5em;">Elemental</h3>
                    <p class="text-gray-300 text-sm text-justify mt-2">Lorem ipsum dolorr adipisicing elit. Tempora delectus dolorem libero quae odit nostrum harum. Deserunt, rerum iste? Molestiae ipsa rem adipisci optio doloribus in porro accusamus voluptas ratione.. 
                    </p>
                    <a href="#" class="mt-2 hover:bg-blue-800 inline-block text-white text-center text-sm py-2 px-4 rounded-md  bg-blue-500 " >Details</a>
                </div>
            </div>
          </div>
      </div>
    </div>

    <section class="conteiner movie-list bg-gray-900 px-12 py-4 ">
        <div class="flex flex-col justify-center  md:flex-row md:justify-between items-center ">
          <h3 class="subtile text-white text-xl  my-4 font-bold">Tendencias</h3>
          <div class="">
            <div class="" >
              <form class=" ">
                <div class="">
                  <label for="" class="mr-2 text-white text-md ">Filter: </label>
                  <select name="" id="" class="w-full  py-1 px-1 rounded-md bg-transparent border text-white">
                    <option value="" selected disabled>Choose Category</option>
                    <option value="action" class="text-black ">Action</option>
                    <option value="drama"  class="text-black">Drama</option>
                    <option value="Comedy" class="text-black">Comedy</option>
                    <option value="terror" class="text-black">Terror</option>
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
            <button class="btn">Load More</button>
        </div>
    </section>
  </template>
  
  <script>
  import MovieComponent from '@/components/MovieComponent.vue';
    import {api,API_KEY} from "@/api/api.js"
      export default{
        name:"HomePage",
        data(){
          return {
            popularMovies: [
             
            ],
            actualPopularPage:1
          }
        },
        components:{
          MovieComponent
        },
        methods:{
            getPopular:async function() {
                
                try {
                  const response = await api.get('/popular?api_key='+ API_KEY +'&page=1');
                  
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


            }
          },

          mounted(){
            this.getPopular()
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
        font-size: 1.1em !important;
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
  