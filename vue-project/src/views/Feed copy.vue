<template>
    <video autoplay muted loop class="background-video">
    <source :src="videoSrc" type="video/mp4">
     Your browser does not support the registration tag.
    </video>

    <div class="button-container">
      <div class="button-window left">
        <button class="btn" @click="goToChatroom">Chatroom</button>
      </div>

      <div class="button-window right">
        <button class="btn" @click="goToGame">Game</button>
      </div>
    </div>
</template>

<script setup>
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { onBeforeUnmount } from 'vue'

import videoSrc from '@/assets/xuanzedemao.mp4'

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

const goToChatroom = () => router.push('/Chatroom-First')
const goToGame = () => router.push('/game')
  
</script>

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