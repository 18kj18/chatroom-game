<template>
    <form @submit.prevent="handleSubmit">
        <input  v-model="message" type="text" placeholder="Type your message!">
        <button type="submit">Send</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth } from 'firebase/auth'
import { getFunctions, httpsCallable } from "firebase/functions";
import { getDatabase, ref as fbRef, get, child } from "firebase/database";
import { initializeApp } from "firebase/app";

import { inject } from 'vue';

const firebaseConfig = inject('apiKey');

const app = initializeApp(firebaseConfig);

const functions = getFunctions(app);

const sendMessagefn = httpsCallable(functions, "sendMessage");

const message = ref('')

const props = defineProps(['user', 'code'])

var displayName

if (props.user.displayName == null) {
    const dbref = fbRef(getDatabase());
    get(child(dbref, `displayNames/${getAuth().currentUser.uid}`)).then((snapshot) => {
        console.log("snapshot exists?: ",snapshot.exists()," | snapshot value: ",snapshot.val()," | uid: ",getAuth().currentUser.uid)
        if (snapshot.exists()) {
            displayName = snapshot.val().user
        }
    }).catch((error) => {
        console.error(error);
    })
} else {
    displayName = props.user.displayName
}

async function handleSubmit() {
    console.log("Message: ",message.value,"| DisplayName: ",displayName)
    if (!message.value || !displayName) return;

    try {
        const result = await sendMessagefn({
        //The username will be replaced with the user's auth token or something
        user: displayName,
        lobby: props.code().code,
        text: message.value,
        time: Date.now()
    });
        message.value = '';
    } catch (err) {
        console.log("Missing user: ", displayName)
        console.error("Error sending message:", err);
    }
};
</script>

<style scoped>

</style>