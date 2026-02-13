<script setup>
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import PhaserGame from './PhaserGame.vue';




//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();


const changeScene = () => {

    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
        //  Call the changeScene method defined in the `MainMenu`, `Game` 
        scene.changeScene();
    }

}





</script>

<template>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
    <div>
        <div>
            <button class="button" @click="changeScene">Start</button>
        </div>
        
    </div>
</template>
