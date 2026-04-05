<template>
  <div class="feed-container">
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene"/>
    
    <div id="chat">
        <chatBox />
        <chatForm :user="user" />
    </div>
  </div>
</template>

<script setup>
import chatForm from '@/components/ChatForm.vue'
import chatBox from '@/components/ChatBox.vue'
//import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { onBeforeUnmount } from 'vue'
import { ref, toRaw } from 'vue';
import PhaserGame from './PhaserGame.vue'; 

import { inject } from 'vue';

const user = inject('user');

//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();
const router = useRouter()
/*
const authListener = onAuthStateChanged(getAuth(),function(user) {
    if (!user) { // not logged in
        alert('you must be logged in to view this. redirecting to the home page')
        router.push('/')
    }
});
*/

onBeforeUnmount(() => {
    // clear up listener
    //authListener()
})


const changeScene = () => {

    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
         
        scene.changeScene();
    }

}





</script>