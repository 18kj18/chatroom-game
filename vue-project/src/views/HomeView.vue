<template>
  <div class="home">
    <img src="../assets/maomao.png">
    <FromOneToFour/>
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
