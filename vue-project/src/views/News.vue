<template>
    <div class="News">
        <h3>Cat News</h3>
        <p>{{ $route.params.name }}</p>
    </div>
</template>

<script>
   export default {
     name:"News",
   }
</script>