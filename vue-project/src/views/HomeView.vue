<template>
  <div class="home">
    <h1>Welcome to the Catroom!</h1>
    <img src="../assets/maomao.png">
    <p>To start chatting, login or register!</p>
  </div>
</template>

<script>
// @ is an alias to /src
import FromOneToFour from '@/components/FromOneToFour.vue';

export default {

  name: 'HomeView',
  components: {
    FromOneToFour
  },
}
</script>
