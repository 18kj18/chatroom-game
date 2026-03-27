<template>
    <div id="msg">
        <div v-for="message in messages">
            {{ message }}
            <!--Could put a separator here for messages-->
        </div>
    </div>
</template>



<script setup>
import { ref as refVue } from 'vue';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

import { inject } from 'vue';
const firebaseConfig = inject('apiKey');

const app = initializeApp(firebaseConfig);

const db = getDatabase();

const messages = refVue([]);

const props = defineProps(['code']);

var lastTimeStamp = 0;

var dbref = ref(db, 'lobbies/');
onValue(dbref, (snapshot) => {
    const data = snapshot.val();
    console.log("Code: ", props.code().code);
    console.log("data: ", data);
    
    //console.log("IMPORTANT: ", Object.entries(data[props.code().code].messages));
    //const [username, message] = Object.entries(data[props.code().code].messages)[0];
    //console.log("Update readed! -> Room:", props.code().code, "Username: ", username, " Message: ", message.text);

    //message.value = [];
    var newestTimeStamp = -1; 
    var newestTimeIndex;

    for (let i = 0; i < Object.entries(data[props.code().code].messages).length; i++) {
        var [username, messagedata] = Object.entries(data[props.code().code].messages)[i];
        //console.log("Checking: ", username, messagedata.text, messagedata.time);
        
        //console.log("Message time: ", messagedata.time, " Newest time: ", newestTimeStamp);
        if (messagedata.time > newestTimeStamp || newestTimeStamp < 0) {
            newestTimeStamp = messagedata.time;
            newestTimeIndex = i;
            //console.log("New newest time: ", newestTimeStamp);
        }
    }

    if (newestTimeStamp != lastTimeStamp) {
        [username, messagedata] = Object.entries(data[props.code().code].messages)[newestTimeIndex];
        messages.value.push(`${username}: ${messagedata.text}`);
        lastTimeStamp = newestTimeStamp;
    }
});

</script>



<style scoped>
#msg {
    min-height: 90%;
    max-height: 90%;
    overflow-y: scroll;
    word-wrap: break-word;
}

div > div {
    height: auto;
}
</style>