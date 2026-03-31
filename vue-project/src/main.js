import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
    //api key here.
};

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