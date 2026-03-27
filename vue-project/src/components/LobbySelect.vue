<template>
    <form @submit.prevent="handleSubmit">
        <input  v-model="lobbyInput" type="text" placeholder="Enter Lobby Code!">
        <button type="submit">Enter</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const lobbyInput = ref('');

var lobby = "home";

//Sends data to parent node
const emit = defineEmits(['lobby-code']);

async function handleSubmit() {
    //TODO This doesnt actually set the lobby. ChatForm isnt reading the new value
    if (!lobbyInput.value) return;

    lobby = lobbyInput.value;
    emit('lobby-code', lobby); //Send to parent
    lobbyInput.value = '';
};
</script>



<style scoped>

</style>