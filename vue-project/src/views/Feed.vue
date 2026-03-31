<script setup>
import chatForm from '@/components/ChatForm.vue'
import chatBox from '@/components/ChatBox.vue'
import lobbySelect from '@/components/LobbySelect.vue'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { onBeforeUnmount } from 'vue'
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import PhaserGame from './PhaserGame.vue'; 

import { inject } from 'vue';
let lobby = "home";

const user = inject('user');

const setLobby = (code) => {
    lobby = code;
};

const getLobby = () => {
    return {
        code: lobby
    };
};

  
//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();
const router = useRouter()
const authListener = onAuthStateChanged(getAuth(),function(user) {
    if (!user) { // not logged in
        alert('you must be logged in to view this. redirecting to the home page')
        router.push('/')
    }
});

onBeforeUnmount(() => {
    // clear up listener
    authListener()
})


const changeScene = () => {

    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
         
        scene.changeScene();
    }

}





</script>

<template>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
    
    <div style="display: flex; flex-direction: column;">
        <chatBox :code="getLobby" />
        <chatForm :code="getLobby" :user="user" />
        <lobbySelect @lobby-code="setLobby" />
    </div>

</template>


<style scoped>
/* ===== 全局重置 ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ===== 页面容器 ===== */
.Feed {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}

/* ===== 背景视频 ===== */
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* cover 填满屏幕 */
}

/* ===== 按钮容器 ===== */
.button-container {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  z-index: 10;
}

/* ===== 按钮窗口位置 ===== */
.button-window.left {
  position: absolute;
  left: -490px;
  top: -260px;
}

.button-window.right {
  position: absolute;
  right: -490px;
  top: -260px;
}

/* ===== 按钮样式 ===== */
.btn {
  width: 230px;
  height: 230px;
  background-color: rgba(91, 211, 163, 0.8);
  border: none;
  border-radius: 50%;
  font-size: 28px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: rgb(213, 219, 217);
}
</style>