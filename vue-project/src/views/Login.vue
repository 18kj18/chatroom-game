<template>
    <h1> Login to Your Account </h1>
    <p>Email/Password</p>
    <p> <input type='text' placeholder="Email" v-model='email'/> </p>
    <p> <input type='password' placeholder="Password" v-model='password'/> </p>
    <p v-if="errMsg"> {{ errMsg }} </p>
    <p> <button @click="signIn"> Submit </button> </p>
    <h1> Or </h1>
    <p> <button @click="signInBtn">Google account login </button></p>

</template>

<script setup>
import { ref } from 'vue'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup 
} from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errMsg = ref('')

const router = useRouter()
const auth = getAuth()
const provider = new GoogleAuthProvider()

const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Successfully logged in!')
      router.push('/Feed')
    })
    .catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'No account found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break
        default:
          errMsg.value = 'Email or password incorrect'
      }
    })
}

const signInBtn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('User signed in succesfully: ',result)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

