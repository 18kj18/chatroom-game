<template>
    <form @submit.prevent="handleSubmit">
        <input  v-model="message" type="text" placeholder="Type your message!">
        <button type="submit">Send</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    //Insert config here (from test app)
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

const sendMessagefn = httpsCallable(functions, "sendMessage");

const message = ref('')

async function handleSubmit() {
    if (!message.value) return;

    try {
        const result = await sendMessagefn({
            //The username will be replaced with the user's auth token or something
            user: "test-user",
            text: message.value
        });
        console.log("Message sent");
        message.value = '';
    } catch (err) {
        console.error("Error sending message:", err);
    }
};
</script>