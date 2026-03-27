<template>
  <div>
    <h1>Home page sample</h1>

   <!---- <div>
      <input type="text" v-model.trim="username" placeholder="Type your name">
      <p v-show="username">Welcome, {{ username }}!</p>
      <button @click="clickGetUsername">Save</button>
    </div>

    <p>{{ message }}</p>
    <div>{{ Flag ? '🐱YES!' : '🐈no..' }}</div>
    <p v-show="Flag">Q: Really?</p>
    <p v-if="Answer">😸Yeah, I am petty good (>^ω^<), click this play with me ↓</p>
    <p v-else>🐈I am evil, but I want to play ↓ just click this</p>
    <div v-html="rawHtml"></div>
    <div v-bind:id="dynamicId"></div>  -->
   
  </div>  
</template>

<script>
export default {
  name: 'Home',
  //data() {
    //return {
    //  message: "Q: Are you a good cat Today?",
    //  rawHtml: "<a href='https://catroom-2a37a.firebaseapp.com/'>Our CATROOM</a>",
    //  Flag:true,
    //  Answer:true,
    //  username:"",
   // }
  }
   // methods: {
     // clickGetUsername() {
       // console.log(this.username);
      //}
     //}
//}
</script>
