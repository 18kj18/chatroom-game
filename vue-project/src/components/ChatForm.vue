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
    apiKey: "AIzaSyA2SPWXnCnvMlOzKLkNaJnQdfbmKUqmt9A",
    authDomain: "catroom-2a37a.firebaseapp.com",
    databaseURL: "https://catroom-2a37a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "catroom-2a37a",
    storageBucket: "catroom-2a37a.firebasestorage.app",
    messagingSenderId: "882770246929",
    appId: "1:882770246929:web:10703be03a24f0c26c20b0"
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