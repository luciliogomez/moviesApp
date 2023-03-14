<template>
    <router-link :to="{name:'movie', params:{id:movie.id}}" class="mb-12 " >
        <div class="mov">
            <div class="poster">
            <figure>
                <img :src="'../../assets/'+movie.img" alt="" style="width: 100%;">
            </figure>
            </div>
            <div class="info w-full my-1 px-1  flex flex-col justify-center lg:justify-start items-center lg:items-start">
                <h3 style="font-weight: bolder;" class="text-white ">{{ movie.title }}</h3>
                <div class="details w-full flex justify-center lg:justify-start items-center space-x-1 flex-wrap">
                    <span class="text-blue-600">2023 </span>
                    <span class="separator bg-white p-1 rounded-full"></span>
                    <span class="text-white">Drama</span>
                    <span class="separator bg-white p-1 rounded-full"></span>
                    <span  class="text-blue-400 border flex items-center justify-center text-xs    rounded-full">
                        <span style="border-color: dodgerblue;" class="text-white border flex items-center justify-center text-xs w-6 h-6   rounded-full">83</span>
                    </span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>

export default{

    name:"MovieComponent",

    props:["movie"],

    methods:{

    }
}
</script>

<style scoped>
    .mov{

    }
    .poster{
        width: 100%;
    }
    figure{
        width: 100%;
    }
    img{
        transition: 0.1s ease-in;
    }
    a:hover img{
        transform: scale(1.1);
        transition: 0.1s ease-out;
    }
    @media (min-width: 768px){
        a{
            width: 30%;
            margin-right: 3.33%;
        }
        .mov{
            width: 100%;
        }
        img{
            height: 300px;
        }
    }
    @media (min-width: 1024px){
        a{
            width: 18%;
            margin-right: 2%;
        }
        .mov{
            width: 100%;
        }

        .details span {
            font-size: 0.9em;
        }
        .info h3{
            font-size: 1em;
        }

        .details span{
            font-size: 0.9em;
        }
        img{
            height: 255px;
        }

    }

</style>

