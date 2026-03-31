import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCpdiJHoWE_L8s1nU962nHdb82-S3xcxUI",
  authDomain: "catroom-2a37a.firebaseapp.com",
  databaseURL: "https://catroom-2a37a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "catroom-2a37a",
  storageBucket: "catroom-2a37a.firebasestorage.app",
  messagingSenderId: "882770246929",
  appId: "1:882770246929:web:e247c1d30be1ac096c20b0"
}

import { reactive } from 'vue'

initializeApp(firebaseConfig)

const currentUser = reactive({ user: {
  uid: null,
  email: null,
  displayName: null
} })

const app = createApp(App)
app.use(router)
app.use(ElementPlus)

app.provide( 'apiKey', firebaseConfig);

let isAppMounted = false;
const auth = getAuth()
onAuthStateChanged(auth, (user) => {

  if (user) {
    currentUser.user = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }
  } else {
    currentUser.user = null
  }
  app.provide('user', currentUser.user)
  if (!isAppMounted) {
    app.mount('#app')
    isAppMounted = true
  }
})