<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { EventBus } from './game/EventBus';
import StartGame from './game/main';

import { getAuth } from 'firebase/auth'
import { getFunctions, httpsCallable } from "firebase/functions";
import { getDatabase, ref as fbRef, get, child, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

// Save the current scene instance
const scene = ref();
const game = ref();

const emit = defineEmits(['current-active-scene', 'username', 'newpos', 'user']);

import { inject } from 'vue';

const user = inject('user');
var displayName;

const props = defineProps(["code"])

//Firebase
const firebaseConfig = inject('apiKey');

const app = initializeApp(firebaseConfig);

const functions = getFunctions(app);
const setPositionfn = httpsCallable(functions, "setPosition");

onMounted(() => {
    //potential solution: add while user undefined loop here, so it waits for user to be defined before continuing (stupid, but might work)

    console.log("User is defined now! :", user)
    window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        const result = setPositionfn({
            uid: user.uid,
        })
    })

    try {
        const result = setPositionfn({
        uid: user.uid,
        x: 200,
        y: 350
    });
    } catch (err) {
        console.error("Error setting status:", err);
    }

    EventBus.on('listener-ready', (value) => {
        const db = getDatabase();

        var dbref = fbRef(db, 'positions/');
        onValue(dbref, (snapshot) => {
            const data = snapshot.val();
            EventBus.emit('newpos', data);
        });
        
        
        dbref = fbRef(db, 'displayNames/');
        if (user.displayName == null) {
            get(child(dbref, `${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    //console.log("username from db is emitted")
                    displayName = snapshot.val().user
                    console.log(snapshot.val().user," from db")
                    EventBus.emit('user', [user, snapshot.val().user])
                }
            }).catch((error) => {
                console.error(error);
            })
        } else {
            //console.log("username from google is emitted: ", user.displayName)
            //EventBus.emit('user', user);
            displayName = user.displayName
            console.log(user.displayName, " from google")
            EventBus.emit('user', [user, user.displayName])
        }
        
    })
    console.log(displayName)

    game.value = StartGame('game-container');        

    EventBus.on('current-scene-ready', (currentScene) => {
        emit('current-active-scene', currentScene);     
        scene.value = currentScene;

    });

    EventBus.on('position', (pos) => {
        const result = setPositionfn({
            uid: user.uid,
            x: pos[0],
            y: pos[1]
        })
    })

    EventBus.on('getusername', (user) => {
        const dbref = fbRef(getDatabase());
        get(child(dbref, `displayNames/${user}`)).then((snapshot) => {
            if (snapshot.exists()) {
                EventBus.emit('sendusername', [user, snapshot.val().user])
            }
        }).catch((error) => {
            console.error(error);
        })
    })

});
 

onUnmounted(() => {

    if (game.value)
    {
        game.value.destroy(true);
        game.value = null;
    }
    
});

defineExpose({ scene, game});
</script>

<template>
    <div id="game-container"></div>
</template>