/**
 * Portions of this code are based on examples from the official Firebase documentation:
 * https://firebase.google.com/docs
 * Provider: Google Firebase
 */

<template>
  <div class="login-page">
    <div class="background"></div>
    <h1> Login to Your Account </h1>
    <p>Email/Passpord</p>
    <p> <input type='text' placeholder="Email" v-model='email'/> </p>
    <p> <input type='password' placeholder="Password" v-model='password'/> </p>
    <p v-if="errMsg"> {{ errMsg }} </p>
    <p> <button  @click="signIn">Submit</button></p>
    <p>
      <button @click="resetPassword">Forgot Password?</button>
    </p>
    <h1> Or </h1>
    <div class="ascii-container">
      <pre class="ascii-cat">{{ currentAscii }}</pre>
    </div>
    <p> <button  @click="signInBtn">Google account login </button></p>
  </div>
</template>


<script setup>
import { ref, onUnmounted, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  getAuth, 

  setPersistence, 
  signInWithEmailAndPassword, 

  browserSessionPersistence,
  inMemoryPersistence,

  GoogleAuthProvider,
  signInWithPopup,

  sendPasswordResetEmail
} from 'firebase/auth'

const email = ref('')
const password = ref('')
const errMsg = ref('')

const router = useRouter()
const auth = getAuth()
const provider = new GoogleAuthProvider()

// email login
const signIn = () => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email.value, password.value)
    })
    .then(() => {
      router.push('/')
    })
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        errMsg.value = 'Invalid email'
      } else if (error.code === 'auth/user-not-found') {
        errMsg.value = 'No account found'
      } else if (error.code === 'auth/wrong-password') {
        errMsg.value = 'Incorrect password'
      } else {
        errMsg.value = 'Email or password incorrect'
      }
    })
}

// Google 
const signInBtn = () => {
  setPersistence(auth, inMemoryPersistence)
    .then(() => {
      return signInWithPopup(auth, provider)
    })
    .then(() => {
      router.push('/')
      try {
        const result = setDisplayNamefn({
            user: getAuth().currentUser.displayName,
            uid: getAuth().currentUser.uid
        });
      } catch (err) {
        console.error("Error setting display name:", err);
      }
    })
    .catch(error => {
      console.error(error)
      errMsg.value = 'Google login failed'
    })
}

const resetPassword = () => {
  if (!email.value) {
    errMsg.value = "Please enter your email first";
    return;
  }

  const auth = getAuth();
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      errMsg.value = "Password reset email sent!";
    })
    .catch(error => {
      if (error.code === "invalid-email") {
        errMsg.value = "Invalid email";
      } else if (error.code === "user-not-found") {
        errMsg.value = "No account found with this email";
      } else {
        errMsg.value = "Failed to send reset email";
      }
    });
};

const frames = [
` __..--''\`\`---....___   _..._    __
 _.-'    .-/";  \`        \`<._  \`.''_ \`.
 _.-' _..--.' _    \\                    \`( ❤ )
(_..-'    (< _     ;_..__               ; \`'
       \`-._,_)'      \`--...____..-'`,

` __..--''\`\`---....___   _..._    __
 _.-'    .-/";  \`        \`<._  \`.''_ \`.
 _.-' _..--.'_    \\                    \`(---)
(_..-'    (< _     ;_..__               ; \`'
       \`-._,_)'      \`--...____..-'`,

` __..--''\`\`---....___   _..._    __
 _.-'    .-/";  \`        \`<._  \`.''_ \`.
 _.-' _..--.'_    \\                    \`( - )
(_..-'    (< _     ;_..__               ; \`'
       \`-._,_)'      \`--...____..-'`,
]

const currentAscii = ref(frames[0])
let timer

onMounted(() => {
  let i = 0
  timer = setInterval(() => {
    currentAscii.value = frames[i % frames.length]
    i++
  }, 500)
})

onUnmounted(() => clearInterval(timer))

</script>


</script>
