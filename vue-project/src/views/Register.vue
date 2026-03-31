/**
 * Portions of this code are based on examples from the official Firebase documentation:
 * https://firebase.google.com/docs
 * Provider: Google Firebase
 */

<template>
    <h1> Create an Account </h1>
    <p> <input type='text' placeholder="Display Name" v-model='displayName'/> </p>
    <p> <input type='text' placeholder="Email" v-model='email'/> </p>
    <p> <input type='password' placeholder="Password" v-model='password'/> </p>
    <p> <button @click="register"> Submit </button> </p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFunctions, httpsCallable } from "firebase/functions";
import { useRouter } from 'vue-router' // import router
import { initializeApp } from "firebase/app";

import { inject } from 'vue';
const firebaseConfig = inject('apiKey');

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

const setDisplayNamefn = httpsCallable(functions, "setDisplayName");


const email = ref('')
const displayName = ref('')
const password = ref('')

const router = useRouter() // get a reference to our vue router
const register = () => {
    //Verify dispay name
    if (displayName.value == null) {
      alert("No display name!")
      return;
    }

    createUserWithEmailAndPassword(getAuth(),email.value, password.value) // need .value because ref()
    .then((data) => {
      console.log('Successfully registered!');


      try {
        const result = setDisplayNamefn({
            user: displayName.value,
            uid: getAuth().currentUser.uid
        });
      } catch (err) {
        console.error("Error setting display name:", err);
      }

      router.push('/feed') // redirect to the feed
    })
    .catch(error => {
      console.log(error.code)
      alert(error.message);
    });
}

</script>
