/*const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");    //used to log stuff. check functions menu to see logs
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getDatabase, ref, set } = require("firebase-admin/database"); // realtime database
initializeApp();

setGlobalOptions({ maxInstances: 10 });
const firestore = getFirestore();
const database = getDatabase();

exports.postcomment = onRequest(async (req, res) => {
  logger.info("Posting comments", { structuredData: true });

  const r = await firestore.collection("comments").add(req.body);

  //ID will be returned if succesful
  if (r.id) {
    console.log("Document added");
    res.send("Operation success");
  } else {
    console.log("failed to add document");
    res.send("Operation failed");
  }
});

//use fetch requests to get this from client side
exports.getAllComments = onRequest(async (req, res) => {
  logger.info("Retrieving all comments", { structuredData: true });

  const snapshot = await firestore.collection('comments').get();
  if (snapshot.empty) {
    console.log("No matching documents");
    res.send("No docs found in collection");
  }
  let myComments = [];
  snapshot.forEach(doc => {
    myComments.push(doc.data())
  });
  res.json(myComments);
});

//Send message to realtime database
exports.sendMessage = onRequest(
  { cors: true },
  (req, res) => {
  logger.info("Sending message to realtime database", { structuredData: true });

  set(ref(database, 'messages'), {
    message: req.body
  });
});
*/

import admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";

admin.initializeApp();

export const sendMessage = onCall(async (request) => {
  logger.log("Incoming data:", request.data);
  const { user, text, time } = request.data;

  if (!user || !text || !time) {
    throw new HttpsError("invalid-argument", "Missing user/text");
  }

  const db = admin.database();

  await db.ref(`messages/${user}`).set({
    text,
    time
  });

  return { success: true };
});

export const setDisplayName = onCall(async (request) => {
  logger.log("Incoming data:", request.data);
  const { user, uid } = request.data;

  if (!user || !uid) {
    throw new HttpsError("invalid-argument", "Missing user/uid");
  }

  const db = admin.database();

  await db.ref(`displayNames/${uid}`).set({
    user
  });

  return { success: true };
});

export const setPosition = onCall(async (request) => {
  logger.log("Incoming data:", request.data);
  const { uid, x, y } = request.data;

  if (!uid) {
    throw new HttpsError("invalid-argument", "Missing uid");
  }

  const db = admin.database();

  if (!x || !y) {
    await db.ref(`positions/${uid}`).set(null);
  } else {
    await db.ref(`positions/${uid}`).set({
      x,
      y
    });
  }

  return { success: true };
});