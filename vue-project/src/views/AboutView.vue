<template>
  <div class="about">
    <router-link to="/about/us">About Us</router-link> |
    <router-link to="/about/info">Information</router-link>
    <router-view></router-view>
    <h1>This is an page for test video and something else, We can delete it later.</h1>
     <video :src="videoSrc" autoplay muted loop controls></video>
    <ul> 
      <h3>{{ message }}</h3>
      <li v-for="item in newsList"> 
        {{ item.title }} 
        <audio :src="item.music" controls loop></audio>
        <button @click="clickHandle">vote</button> <button @click="clickHandle">❤️</button>
      </li>
    </ul>
    <button v-on:click="collect +=1">⭐Click to add to playlist {{ collect }}</button>
  </div>
</template>

<script>

import myVideo from '@/assets/chuixiaohaodemao.mp4'
import myMusic1 from '@/assets/In a Persian Market (Ketelbey).mp3'
import myMusic2 from '@/assets/Sabre Dance (Khachaturian).mp3'
import myMusic3 from '@/assets/Danube Waves (Ivanovici).mp3'


 export default {
  name: 'AboutView',
  data() {
    return {

      videoSrc: myVideo,
    

      newsList:[
        {
          id:1001,
          title:"🎶Today's Hit Song 01: In a Persian Market (Ketelbey)",
          music: myMusic1
        },
        {
          id:1002,
          title:"🎷Today's Hit Song 02: Sabre Dance (Khachaturian)",
          music: myMusic2
        },
        {
          id:1003,
          title:"🎵Today's Hit Song 03: Danube Waves (Ivanovici)",
          music: myMusic3
        }
      ],
      //count:0,
       collect:0,
       message:"Vote 📪 and Give a ❤️ for your favorite song",

    }
  },
    methods: {
        clickHandle(event) {
         this.message="😽Thank you support!😽"
          console.log(event);
          event.target.innerHTML="You have already clicked this"
         },
        remind(data) {
          console.log(data)
        }
     }
 }
</script>

<style scoped>
video {
  max-width: 100%;
  height: auto;
}
</style>



