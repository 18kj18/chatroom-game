import Phaser from 'phaser';
import { ref, toRaw } from 'vue';

<template>
  <nav class="fancy-nav">
    <a class="emoji">=^.^=     </a>
   <router-link to = "/"> Home</router-link> |
     <span> 
        <router-link to="/Feed">Feed</router-link> |
      </span>
      <span v-if="isLoggedIn"> 
        <button id="logout" @click="handleSignOut">Logout</button> 
      </span>
      <span v-else>
        <router-link to="/register"> Register </router-link> |
        <router-link to="/login"> Login </router-link> 
      </span>
      <a class="emoji">     =^.^=</a>
   </nav>
   <router-view/>
</template>

<script setup>
import { ref, watchEffect } from 'vue' // used for conditional rendering
import { getAuth,onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoggedIn = ref(true)

// runs after firebase is initialized
onAuthStateChanged(getAuth(),function(user) {
    if (user) {
      isLoggedIn.value = true // if we have a user
    } else {
      isLoggedIn.value = false // if we do not
    }
})

const handleSignOut = () => {
  signOut(getAuth())
  router.push('/')
}


</script>


<style>
body {
  margin: 0px 0px 0px 0px;
  background-color: #F7F7FF;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #E0AC9D;
  font-size: 20px;  
  border-bottom: #222 solid 2px;
  border-left: #2c3e50 solid 2px;
  border-right: #2c3e50 solid 2px;
  padding-bottom: 10px;
  width: 40vw;
  margin: auto;
  margin-bottom: 10px;
}

nav a {
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #F7F7FF;
}

.emoji {
  color: #F7F7FF;
}
</style>
